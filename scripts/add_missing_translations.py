import sys, json, os
sys.stdout.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
LOCALES_DIR = os.path.join(SCRIPT_DIR, '..', 'src', 'i18n', 'locales')
DATA_FILE = os.path.join(SCRIPT_DIR, 'translations_data.json')


def try_load(path):
    for enc in ['utf-8', 'utf-8-sig']:
        try:
            with open(path, encoding=enc) as f:
                return json.load(f)
        except Exception:
            pass
    raise RuntimeError(f'Could not load {path}')


def save(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def apply(locale_code, data, t):
    changed = []

    # featureSpotlights
    if 'featureSpotlights' not in data:
        data['featureSpotlights'] = {}
    for section, fields in t.get('featureSpotlights', {}).items():
        if section not in data['featureSpotlights']:
            data['featureSpotlights'][section] = {}
        for key, val in fields.items():
            if key not in data['featureSpotlights'][section]:
                data['featureSpotlights'][section][key] = val
                changed.append(f'featureSpotlights.{section}.{key}')

    # testimonials
    if 'testimonials' not in data:
        data['testimonials'] = {}
    for key, val in t.get('testimonials', {}).items():
        if key not in data['testimonials']:
            data['testimonials'][key] = val
            changed.append(f'testimonials.{key}')

    # cta
    if 'cta' not in data:
        data['cta'] = {}
    for key, val in t.get('cta', {}).items():
        if key not in data['cta']:
            data['cta'][key] = val
            changed.append(f'cta.{key}')

    # nav.underConstruction (hy only)
    if 'nav_underConstruction' in t:
        if 'nav' not in data:
            data['nav'] = {}
        if 'underConstruction' not in data['nav']:
            data['nav']['underConstruction'] = t['nav_underConstruction']
            changed.append('nav.underConstruction')

    # Pricing feature arrays
    pt = t.get('pricing', {})
    p = data.get('pricing', {})

    def add_if_missing(lst, val):
        if val and val not in lst:
            lst.append(val)
            return True
        return False

    if pt.get('free_anon') and 'free' in p and 'anonymous' in p['free']:
        if add_if_missing(p['free']['anonymous'].setdefault('features', []), pt['free_anon']):
            changed.append('pricing.free.anonymous: image item')

    if pt.get('free_reg') and 'free' in p and 'registered' in p['free']:
        if add_if_missing(p['free']['registered'].setdefault('features', []), pt['free_reg']):
            changed.append('pricing.free.registered: image item')

    if pt.get('basic') and 'basic' in p:
        if add_if_missing(p['basic'].setdefault('features', []), pt['basic']):
            changed.append('pricing.basic: image item')

    if pt.get('pro') and 'pro' in p:
        if add_if_missing(p['pro'].setdefault('features', []), pt['pro']):
            changed.append('pricing.pro: image item')

    return changed


def main():
    translations = try_load(DATA_FILE)

    for locale_code, t in translations.items():
        path = os.path.join(LOCALES_DIR, f'{locale_code}.json')
        if not os.path.exists(path):
            print(f'SKIP {locale_code}.json — not found')
            continue

        data = try_load(path)
        changed = apply(locale_code, data, t)

        if changed:
            save(path, data)
            preview = ', '.join(changed[:3]) + ('...' if len(changed) > 3 else '')
            print(f'{locale_code}.json: +{len(changed)} items ({preview})')
        else:
            print(f'{locale_code}.json: nothing to add')


if __name__ == '__main__':
    main()
