---
type: "manual"
description: "Editing i18n translation files that contain non-Latin scripts"
---

# i18n File Editing — Non-Latin Script Safety

## Project Structure

Translation files live in **`src/i18n/locales/`** as standard JSON files:

- `en.json` — source of truth (English, edit freely)
- `ru.json`, `uk.json`, `be.json`, `bg.json`, `kk.json`, `rue.json`, `tg.json` — Cyrillic-based
- `hy.json` — Armenian (high Unicode-corruption risk)
- `ka.json` — Georgian (high Unicode-corruption risk)
- `he.json` — Hebrew (high Unicode-corruption risk)
- `el.json` — Greek (high Unicode-corruption risk)
- `lt.json` — Lithuanian (Latin, safe)

The JSON files have arbitrary nesting depth and contain arrays of strings (e.g. pricing feature lists).

## Problem

The `str-replace-editor` tool **can corrupt non-Latin Unicode characters** (Armenian, Georgian, Hebrew, Greek, etc.) when performing string replacements on translation files. Do NOT use it to directly edit `hy.json`, `ka.json`, `he.json`, or `el.json`.

## Safe Editing Approaches

| File(s)                          | Safe method                                      |
|----------------------------------|--------------------------------------------------|
| `en.json`                        | `str-replace-editor` (Latin only, always safe)   |
| `ru.json`, `uk.json`, `be.json`, `bg.json`, `kk.json`, `rue.json`, `tg.json` | `str-replace-editor` (Cyrillic is generally safe in JSON) |
| `hy.json`, `ka.json`, `he.json`, `el.json` | `i18n-sync.mjs` (re-sync from en.json) or a small Node.js script |
| All languages at once            | `i18n-sync.mjs` ← **always start here**         |

## Automated Full-Project Sync (`i18n-sync.mjs`) ← **Always start here**

`scripts/i18n-sync.mjs` treats `en.json` as the **source of truth** and automatically propagates every addition or change to all 12 language files in one command using Gemini.

### How it works

1. Parses `src/i18n/locales/en.json` using `JSON.parse` (handles any nesting depth and arrays of strings).
2. Compares against `scripts/i18n-sync-baseline.json` (the last-known English values, flat dot-notation).
3. For each non-English `.json` file:
   - **Missing string key** → translates via Gemini and sets it in the output.
   - **Missing or changed array** (e.g. a pricing feature list) → retranslated item-by-item.
   - **Changed string** (value ≠ baseline) → re-translates and updates.
   - **Unchanged key** → preserved as-is (safe to re-run).
   - **Orphaned key** (in language file but absent from `en.json`) → preserved with a console warning.
4. Writes each language file back with `JSON.stringify(…, null, 2)` — UTF-8 safe, no corruption risk.
5. Updates `i18n-sync-baseline.json` to the current state of `en.json`.

### API key

The script picks up `GEMINI_API_KEY` (or `VITE_GEMINI_API_KEY`) from `.env.dev`, `.env.staging.local`, `.env.local`, or `.env` — first match wins. No manual env-var setup needed if the key is in `.env.dev`.

### Usage

```powershell
node scripts/i18n-sync.mjs
```

For long runs, launch as a background process and tail the log:

```powershell
Start-Process node -ArgumentList "scripts/i18n-sync.mjs" -RedirectStandardOutput scripts/i18n-sync-run.log -NoNewWindow
Get-Content scripts/i18n-sync-run.log -Wait -Tail 10
```

### Typical workflows

**Example 1 — adding a new key (including nested or array):**
1. Add the key to `en.json` only.
2. Run `node scripts/i18n-sync.mjs`.
3. Done. The key is translated and inserted in every language file.

**Example 2 — changing existing English text:**
1. Update the value in `en.json`.
2. Run `node scripts/i18n-sync.mjs`.
3. Done. The script detects the baseline mismatch and re-translates all files.

**Example 3 — removing a key:**
- Delete the key from `en.json` and from each language file directly (use `str-replace-editor` for Latin files; for `hy.json`/`ka.json`/`he.json`/`el.json`, write a small Node.js delete snippet).
- The sync script will warn about "orphaned" keys — use those warnings as your checklist.

### When to use each tool

| Task                                                    | Tool                                                    |
|---------------------------------------------------------|---------------------------------------------------------|
| Add / update key(s) across **all** 12 language files    | `i18n-sync.mjs` ← start here                           |
| Small fix to a single **Latin** file                    | `str-replace-editor` (ru, uk, be, bg, kk, rue, tg, lt) |
| Small fix to a **non-Latin** file (hy, ka, he, el)      | Re-sync via `i18n-sync.mjs`, or a tiny Node.js snippet |
| Remove a key from all files                             | Manual deletion per file, then verify with a dry sync   |

## Do NOT

- Do NOT use `str-replace-editor` on `hy.json`, `ka.json`, `he.json`, or `el.json` — Unicode corruption risk.
- Do NOT use PowerShell string manipulation for these files (encoding issues).
- Do NOT use `sed` or similar CLI tools (Unicode handling varies by platform).
- Do NOT attempt to generate Armenian/Georgian/Hebrew/Greek text manually — use `i18n-sync.mjs`.

