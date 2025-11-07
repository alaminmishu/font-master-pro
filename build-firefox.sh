#!/bin/bash

###############################################################################
# Font Master Pro - Firefox Build Script
# Converts Chrome extension to Firefox-compatible format
###############################################################################

echo "Font Master Pro - Building Firefox version..."
echo "================================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create build directory
BUILD_DIR="build-firefox"
DIST_DIR="dist"

echo -e "${YELLOW}Step 1: Cleaning previous builds...${NC}"
rm -rf "$BUILD_DIR"
rm -rf "$DIST_DIR"
mkdir -p "$BUILD_DIR"
mkdir -p "$DIST_DIR"

# Copy all files to build directory
echo -e "${YELLOW}Step 2: Copying files...${NC}"
cp -r *.js "$BUILD_DIR/" 2>/dev/null || true
cp -r *.html "$BUILD_DIR/" 2>/dev/null || true
cp -r styles "$BUILD_DIR/"
cp -r icons "$BUILD_DIR/"

# Create Firefox-specific manifest
echo -e "${YELLOW}Step 3: Creating Firefox manifest...${NC}"
cat > "$BUILD_DIR/manifest.json" << 'EOF'
{
  "manifest_version": 2,
  "name": "Font Master Pro",
  "version": "1.0.0",
  "description": "Advanced font customization tool with Google Fonts, text effects, and per-site preferences",
  "permissions": [
    "activeTab",
    "storage",
    "tabs",
    "<all_urls>"
  ],
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "background": {
    "scripts": ["background.js"]
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle",
      "all_frames": false
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "web_accessible_resources": ["presets.js"],
  "browser_specific_settings": {
    "gecko": {
      "id": "font-master-pro@example.com",
      "strict_min_version": "109.0"
    }
  }
}
EOF

# Patch background.js for Firefox compatibility
echo -e "${YELLOW}Step 4: Patching for Firefox compatibility...${NC}"

# Replace chrome API calls with browser API for better Firefox support
# This is already compatible, but we'll add a compatibility shim
cat > "$BUILD_DIR/browser-polyfill-mini.js" << 'EOF'
// Minimal browser/chrome compatibility
if (typeof browser === 'undefined') {
  window.browser = chrome;
}
if (typeof chrome === 'undefined') {
  window.chrome = browser;
}
EOF

# Generate icons from SVG if ImageMagick is available
echo -e "${YELLOW}Step 5: Generating icons...${NC}"
if command -v convert &> /dev/null; then
  convert icons/icon.svg -resize 16x16 "$BUILD_DIR/icons/icon16.png"
  convert icons/icon.svg -resize 48x48 "$BUILD_DIR/icons/icon48.png"
  convert icons/icon.svg -resize 128x128 "$BUILD_DIR/icons/icon128.png"
  echo -e "${GREEN}✓ Icons generated${NC}"
else
  echo -e "${YELLOW}⚠ ImageMagick not found. Using placeholder icons.${NC}"
  echo -e "${YELLOW}  Install with: sudo apt-get install imagemagick${NC}"

  # Create simple colored placeholder PNGs using base64
  # This is a fallback if ImageMagick isn't available
  mkdir -p "$BUILD_DIR/icons"
  echo "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABNSURBVDiNY2AYBaNgFFA=" | base64 -d > "$BUILD_DIR/icons/icon16.png" 2>/dev/null || touch "$BUILD_DIR/icons/icon16.png"
  cp "$BUILD_DIR/icons/icon16.png" "$BUILD_DIR/icons/icon48.png"
  cp "$BUILD_DIR/icons/icon16.png" "$BUILD_DIR/icons/icon128.png"
fi

# Create ZIP file for Firefox
echo -e "${YELLOW}Step 6: Creating Firefox package...${NC}"
cd "$BUILD_DIR"
zip -r "../$DIST_DIR/font-master-pro-firefox.zip" . -x "*.DS_Store" -x "__MACOSX/*"
cd ..

# Create XPI file (Firefox extension format)
cp "$DIST_DIR/font-master-pro-firefox.zip" "$DIST_DIR/font-master-pro-firefox.xpi"

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✓ Build complete!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "Output files:"
echo "  • $DIST_DIR/font-master-pro-firefox.zip (for AMO)"
echo "  • $DIST_DIR/font-master-pro-firefox.xpi (for self-hosting)"
echo ""
echo "To install in Firefox:"
echo "  1. Open Firefox"
echo "  2. Go to about:debugging#/runtime/this-firefox"
echo "  3. Click 'Load Temporary Add-on'"
echo "  4. Select the manifest.json from $BUILD_DIR/"
echo ""
echo "For Chrome/Edge/Brave:"
echo "  Use the root directory (not the build directory)"
echo ""
