# Image Setup Instructions

## Required Images

You need to save the following images to the `public/` folder:

### 1. **Logo Icon** (`public/logo.png`)
- **Source**: The keyboard icon with circular arrows (green/purple keyboards with red arrows)
- **Recommended size**: 64x64px or 128x128px
- **Usage**: Displayed next to the title in Header and Footer
- **Save as**: `public/logo.png`

### 2. **Title Image** (`public/title.png`)
- **Source**: The "TranslitPro" text logo (green "Translit" + blue "Pro" with red dot on 'i')
- **Recommended size**: Height ~64px, width auto (maintain aspect ratio)
- **Usage**: Main branding text in Header and Footer
- **Save as**: `public/title.png`
- **Note**: Should have transparent background

### 3. **Favicon** (`public/favicon.png`)
- **Source**: The simplified keyboard icon (green/purple rectangles with arrows)
- **Recommended sizes**: 
  - 32x32px (standard favicon)
  - 180x180px (for apple-touch-icon)
- **Usage**: Browser tab icon
- **Save as**: `public/favicon.png`

## How to Save the Images

### Option 1: Download from URLs (if you have them)
```bash
# From the project root
curl -o public/logo.png [URL_TO_LOGO]
curl -o public/title.png [URL_TO_TITLE]
curl -o public/favicon.png [URL_TO_FAVICON]
```

### Option 2: Manual Save
1. Right-click on each image
2. Select "Save Image As..."
3. Navigate to the `public/` folder in your project
4. Save with the exact filenames:
   - `logo.png`
   - `title.png`
   - `favicon.png`

### Option 3: Copy Files
If you already have the files:
```bash
# Copy to public folder
cp /path/to/your/logo.png public/logo.png
cp /path/to/your/title.png public/title.png
cp /path/to/your/favicon.png public/favicon.png
```

## Verification

After saving the images, verify they're in the correct location:

```bash
ls -la public/
```

You should see:
- `public/logo.png`
- `public/title.png`
- `public/favicon.png`
- `public/favicon.svg` (old, can be deleted)
- `public/robots.txt`

## Testing

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:4321

3. Check that:
   - Logo icon appears in the header (top-left)
   - Title image appears next to the logo
   - Favicon appears in the browser tab
   - Footer shows the same logo + title

## Image Optimization Tips

For best results:
- Use PNG format with transparency for logo and title
- Optimize images with tools like TinyPNG or ImageOptim
- Ensure images are crisp at 2x resolution for retina displays
- Keep file sizes small (< 50KB each)

## Cleanup

After confirming the new images work, you can remove the old favicon:
```bash
rm public/favicon.svg
```

