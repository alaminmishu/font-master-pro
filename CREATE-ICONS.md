# Creating Icons for Font Master Pro

The extension requires 3 PNG icon sizes: 16x16, 48x48, and 128x128 pixels.

## Method 1: Automatic (Recommended)

If you have ImageMagick installed, run:

```bash
./generate-icons.sh
```

This will generate all required icons from `icons/icon.svg`.

### Installing ImageMagick

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install imagemagick
```

**macOS:**
```bash
brew install imagemagick
```

**Windows:**
Download from: https://imagemagick.org/script/download.php

## Method 2: Online Converter

1. Open https://www.aconvert.com/image/svg-to-png/ or similar
2. Upload `icons/icon.svg`
3. Convert to PNG at these sizes:
   - 16x16 → save as `icons/icon16.png`
   - 48x48 → save as `icons/icon48.png`
   - 128x128 → save as `icons/icon128.png`

## Method 3: Manual (Design Software)

Use any graphics editor (Photoshop, GIMP, Figma, etc.):

1. Open `icons/icon.svg`
2. Export as PNG at:
   - 16x16 pixels → `icons/icon16.png`
   - 48x48 pixels → `icons/icon48.png`
   - 128x128 pixels → `icons/icon128.png`

## Method 4: Simple Placeholder

For quick testing, you can use simple colored squares:

```bash
# Create solid blue placeholders
convert -size 16x16 xc:#2563eb icons/icon16.png
convert -size 48x48 xc:#2563eb icons/icon48.png
convert -size 128x128 xc:#2563eb icons/icon128.png
```

Or manually create any 16x16, 48x48, and 128x128 PNG images.

## Icon Design Guidelines

For best results:
- Use a simple, recognizable symbol
- Ensure good contrast
- Test at 16x16 size (smallest, hardest to read)
- Avoid fine details that won't be visible at small sizes
- Use the brand colors: #2563eb (blue) and #1e40af (dark blue)

## Current Icon Design

The default SVG icon features:
- Blue gradient background (#2563eb to #1e40af)
- Large white "A" representing typography
- Small "f" in corner representing "font"
- Rounded corners for modern look

Feel free to customize `icons/icon.svg` and regenerate!
