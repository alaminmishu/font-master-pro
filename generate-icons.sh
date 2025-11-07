#!/bin/bash

###############################################################################
# Icon Generator Script
# Generates PNG icons from SVG source using ImageMagick
###############################################################################

echo "Generating icons from SVG..."

if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed."
    echo "Please install it:"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    exit 1
fi

# Generate PNG icons at different sizes
convert icons/icon.svg -resize 16x16 icons/icon16.png
convert icons/icon.svg -resize 48x48 icons/icon48.png
convert icons/icon.svg -resize 128x128 icons/icon128.png

echo "✓ Icons generated successfully:"
echo "  • icons/icon16.png (16x16)"
echo "  • icons/icon48.png (48x48)"
echo "  • icons/icon128.png (128x128)"
