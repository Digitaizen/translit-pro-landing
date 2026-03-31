#!/usr/bin/env node
/**
 * scripts/i18n-sync.mjs — Automated i18n synchronisation tool
 *
 * Treats src/i18n/locales/en.json as the source of truth and keeps all other
 * language JSON files in sync automatically using Gemini for translation.
 *
 * Usage:
 *   node scripts/i18n-sync.mjs
 *
 * Behaviour:
 *   • NEW key in en.json     → translated via Gemini → inserted in every language file
 *   • CHANGED key in en.json → re-translated → updated in every language file
 *   • UNCHANGED key          → skipped (existing translations are preserved)
 *   • REMOVED key in en.json → logged as a warning (no auto-deletion)
 *
 * Arrays of strings (e.g. feature lists in pricing) are translated item by item.
 * They are retranslated as a unit when the English array changes length or content.
 *
 * A "sync baseline" (scripts/i18n-sync-baseline.json) records the last English
 * value each key was synced from.  On first run (no baseline), only MISSING keys
 * are translated — existing translations are preserved as-is.
 *
 * API key:  Reads GEMINI_API_KEY or VITE_GEMINI_API_KEY from the environment,
 *           or from .env.dev / .env.staging.local / .env.local / .env (first match wins).
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';

// ─── Paths ────────────────────────────────────────────────────────────────────
const LANG_DIR      = 'src/i18n/locales';
const EN_FILE       = `${LANG_DIR}/en.json`;
const BASELINE_FILE = 'scripts/i18n-sync-baseline.json';
const LOG_FILE      = 'scripts/i18n-sync-run.log';

// ─── Language name map (ISO 639-1/3 → human name for Gemini prompt) ──────────
const LANGUAGE_NAMES = {
  af: 'Afrikaans',   ar: 'Arabic',       az: 'Azerbaijani',  be: 'Belarusian',
  bg: 'Bulgarian',   bn: 'Bengali',      cs: 'Czech',        da: 'Danish',
  de: 'German',      el: 'Greek',        es: 'Spanish',      et: 'Estonian',
  fa: 'Persian',     fi: 'Finnish',      fr: 'French',       gu: 'Gujarati',
  he: 'Hebrew',      hi: 'Hindi',        hr: 'Croatian',     hu: 'Hungarian',
  hy: 'Armenian',    id: 'Indonesian',   it: 'Italian',      ja: 'Japanese',
  ka: 'Georgian',    kk: 'Kazakh',       km: 'Khmer',        kn: 'Kannada',
  ko: 'Korean',      lt: 'Lithuanian',   lv: 'Latvian',      mk: 'Macedonian',
  ml: 'Malayalam',   mn: 'Mongolian',    mr: 'Marathi',      ms: 'Malay',
  my: 'Burmese',     ne: 'Nepali',       nl: 'Dutch',        no: 'Norwegian',
  pa: 'Punjabi',     pl: 'Polish',       pt: 'Portuguese',   ro: 'Romanian',
  ru: 'Russian',     rue: 'Rusyn',       sk: 'Slovak',       sl: 'Slovenian',
  sq: 'Albanian',    sr: 'Serbian',      sv: 'Swedish',      sw: 'Swahili',
  ta: 'Tamil',       te: 'Telugu',       tg: 'Tajik',        th: 'Thai',
  tr: 'Turkish',     uk: 'Ukrainian',    ur: 'Urdu',         uz: 'Uzbek',
  vi: 'Vietnamese',  zh: 'Chinese',      zu: 'Zulu',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Load Gemini API key from env vars, then from .env files. */
function loadGeminiKey() {
  if (process.env.GEMINI_API_KEY)      return process.env.GEMINI_API_KEY;
  if (process.env.VITE_GEMINI_API_KEY) return process.env.VITE_GEMINI_API_KEY;
  for (const f of ['.env.dev', '.env.staging.local', '.env.local', '.env']) {
    if (!existsSync(f)) continue;
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      const m = line.match(/^(?:GEMINI_API_KEY|VITE_GEMINI_API_KEY)=(.+)/);
      if (m) return m[1].trim();
    }
  }
  return null;
}

/** Translate a single UI string using Gemini 2.5 Flash. */
async function translateWithGemini(text, targetLang, apiKey) {
  const langName = LANGUAGE_NAMES[targetLang] ?? targetLang;
  const prompt = [
    `Translate the following UI string into ${langName}.`,
    'Preserve any {placeholder} and {{placeholder}} variables exactly — do not translate them.',
    'Return ONLY the translated string, with no quotes and no explanation.',
    '',
    text,
  ].join('\n');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const res  = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1 } }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data   = await res.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!result) throw new Error('Gemini returned an empty response');
  return result;
}

/**
 * Flatten a nested JSON object into a { 'dot.path': value } map for baseline tracking.
 * String values are stored as-is; arrays are stored as JSON strings.
 */
function flattenObject(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      result[path] = value;
    } else if (Array.isArray(value)) {
      result[path] = JSON.stringify(value);
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenObject(value, path));
    }
  }
  return result;
}

/**
 * Recursively sync a language object against the English source object.
 * Returns a new object with all translations applied in English key order.
 *
 * - String leaf: translated if missing or if the English value changed since baseline.
 * - Array:       retranslated item by item if length or content changed.
 * - Object:      recursed into.
 * - Orphaned keys (in lang but absent from en) are preserved with a warning.
 */
async function syncObject(enObj, langObj, baselineFlat, path, lang, geminiKey, isFirstRun, stats) {
  const result = {};

  for (const [key, enValue] of Object.entries(enObj)) {
    const fullPath    = path ? `${path}.${key}` : key;
    const langValue   = langObj?.[key];
    const baselineVal = baselineFlat[fullPath];

    if (typeof enValue === 'string') {
      // ── Leaf string ────────────────────────────────────────────────────────
      const missing   = langValue === undefined;
      const enChanged = !isFirstRun && baselineVal !== undefined && baselineVal !== enValue;

      if (missing || enChanged) {
        const tag = missing ? 'ADD   ' : 'UPDATE';
        process.stdout.write(`   ${tag} ${fullPath}... `);
        try {
          const translation = await translateWithGemini(enValue, lang, geminiKey);
          result[key] = translation;
          console.log(`✓  ${translation}`);
          missing ? stats.added++ : stats.updated++;
        } catch (err) {
          console.error(`\n   ERROR: ${err.message}`);
          result[key] = langValue ?? enValue; // fallback to existing or English
        }
      } else {
        result[key] = langValue ?? enValue;
      }

    } else if (Array.isArray(enValue)) {
      // ── Array of strings ──────────────────────────────────────────────────
      const baselineArr = baselineVal ? JSON.parse(baselineVal) : null;
      const arrMissing  = !Array.isArray(langValue) || langValue.length !== enValue.length;
      const arrChanged  = !isFirstRun && baselineArr !== null && JSON.stringify(baselineArr) !== JSON.stringify(enValue);

      if (arrMissing || arrChanged) {
        const tag = arrMissing ? 'ADD   ' : 'UPDATE';
        process.stdout.write(`   ${tag} ${fullPath}[] (${enValue.length} items)... `);
        try {
          const translated = [];
          for (const item of enValue) {
            translated.push(typeof item === 'string'
              ? await translateWithGemini(item, lang, geminiKey)
              : item
            );
          }
          result[key] = translated;
          console.log(`✓  [${translated.length} items]`);
          arrMissing ? stats.added++ : stats.updated++;
        } catch (err) {
          console.error(`\n   ERROR: ${err.message}`);
          result[key] = Array.isArray(langValue) ? langValue : enValue;
        }
      } else {
        result[key] = Array.isArray(langValue) ? langValue : enValue;
      }

    } else if (enValue && typeof enValue === 'object') {
      // ── Nested object — recurse ────────────────────────────────────────────
      result[key] = await syncObject(
        enValue, langValue ?? {}, baselineFlat, fullPath, lang, geminiKey, isFirstRun, stats
      );
    } else {
      result[key] = langValue ?? enValue;
    }
  }

  // Preserve orphaned keys and emit warnings
  for (const key of Object.keys(langObj ?? {})) {
    if (!(key in enObj)) {
      const fullPath = path ? `${path}.${key}` : key;
      console.log(`   WARN:  ${fullPath} not in en.json (orphaned — review manually)`);
      stats.warned++;
      stats.orphans.push(fullPath);
      result[key] = langObj[key];
    }
  }

  return result;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Gemini API key
  const geminiKey = loadGeminiKey();
  if (!geminiKey) {
    console.error('ERROR: Gemini API key not found.');
    console.error('Add GEMINI_API_KEY or VITE_GEMINI_API_KEY to the environment,');
    console.error('or to .env.dev, .env.staging.local, .env.local, or .env');
    process.exit(1);
  }
  console.log('✓ Gemini API key loaded');

  // 2. Parse en.json
  const enObj  = JSON.parse(readFileSync(EN_FILE, 'utf8'));
  const enFlat = flattenObject(enObj);
  console.log(`✓ Parsed en.json — ${Object.keys(enFlat).length} translatable values`);

  // 3. Load (or create) baseline
  const baseline   = existsSync(BASELINE_FILE)
    ? JSON.parse(readFileSync(BASELINE_FILE, 'utf8')) : {};
  const isFirstRun = Object.keys(baseline).length === 0;
  if (isFirstRun) {
    console.log('ℹ  No baseline found — first-run mode: only MISSING keys will be translated.');
    console.log('   Existing translations are preserved. Future runs detect changed English text.\n');
  }

  // 4. Discover language files
  const langFiles = readdirSync(LANG_DIR)
    .filter(f => f.endsWith('.json') && f !== 'en.json')
    .sort()
    .map(f => ({ lang: f.replace('.json', ''), path: `${LANG_DIR}/${f}` }));
  console.log(`✓ Found ${langFiles.length} language files\n`);

  let totalAdded = 0, totalUpdated = 0, totalWarned = 0;
  const logLines = [`i18n-sync run — ${new Date().toISOString()}`, ''];

  // 5. Process each language file
  for (const { lang, path: filePath } of langFiles) {
    console.log(`── ${lang}.json`);
    const langObj = JSON.parse(readFileSync(filePath, 'utf8'));
    const stats   = { added: 0, updated: 0, warned: 0, orphans: [] };

    const synced = await syncObject(enObj, langObj, baseline, '', lang, geminiKey, isFirstRun, stats);

    if (stats.orphans.length) {
      logLines.push(`[${lang}.json] ${stats.orphans.length} orphaned key(s):`);
      for (const k of stats.orphans) logLines.push(`  - ${k}`);
      logLines.push('');
    }

    if (stats.added + stats.updated > 0) {
      writeFileSync(filePath, JSON.stringify(synced, null, 2) + '\n', 'utf8');
      console.log(`   ✓ Saved — ${stats.added} added, ${stats.updated} updated\n`);
    } else {
      console.log(`   ✓ No changes needed\n`);
    }
    totalAdded   += stats.added;
    totalUpdated += stats.updated;
    totalWarned  += stats.warned;
  }

  // 6. Update baseline to current en.json values
  writeFileSync(BASELINE_FILE, JSON.stringify(enFlat, null, 2) + '\n', 'utf8');

  console.log('✓ Sync complete');
  console.log(`  Keys added:   ${totalAdded}`);
  console.log(`  Keys updated: ${totalUpdated}`);
  if (totalWarned) console.log(`  Warnings:     ${totalWarned} orphaned key(s)`);
  console.log(`  Baseline:     ${BASELINE_FILE} updated`);

  logLines.push('── Summary ──');
  logLines.push(`Keys added:   ${totalAdded}`);
  logLines.push(`Keys updated: ${totalUpdated}`);
  logLines.push(`Warnings:     ${totalWarned} orphaned key(s)`);
  logLines.push('');
  writeFileSync(LOG_FILE, logLines.join('\n') + '\n', 'utf8');
  if (totalWarned) console.log(`  Log written:  ${LOG_FILE}`);
}

main().catch(err => { console.error('\nFATAL:', err.message); process.exit(1); });
