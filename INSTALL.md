# Installation Guide - Font Master Pro

## Quick Start (Chrome/Edge/Brave)

### Method 1: Load Unpacked (Recommended for Development)

1. **Generate Icons** (optional, if you have ImageMagick):
   ```bash
   cd font-master-pro
   ./generate-icons.sh
   ```

2. **Open Extensions Page**:
   - **Chrome**: Navigate to `chrome://extensions/`
   - **Edge**: Navigate to `edge://extensions/`
   - **Brave**: Navigate to `brave://extensions/`

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load Extension**:
   - Click "Load unpacked"
   - Navigate to and select the `font-master-pro` folder
   - The extension icon should appear in your toolbar

5. **Start Using**:
   - Click the Font Master Pro icon
   - Choose "Current Site" or "All Sites"
   - Customize fonts or apply a preset
   - Click "Save"

### Method 2: Pack Extension (For Distribution)

1. In `chrome://extensions/`, click "Pack extension"
2. Select the `font-master-pro` directory
3. Click "Pack Extension"
4. Share the generated `.crx` file

## Firefox Installation

### Option A: Temporary Installation (For Testing)

1. **Build for Firefox**:
   ```bash
   cd font-master-pro
   ./build-firefox.sh
   ```

2. **Load Temporary Add-on**:
   - Open Firefox
   - Navigate to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Navigate to `build-firefox` folder
   - Select `manifest.json`

   **Note**: This installation is temporary and will be removed when Firefox restarts.

### Option B: Permanent Installation (Self-Hosted)

1. **Build for Firefox**:
   ```bash
   cd font-master-pro
   ./build-firefox.sh
   ```

2. **Install XPI**:
   - Open Firefox
   - Navigate to `about:addons`
   - Click the gear icon (⚙️)
   - Select "Install Add-on From File..."
   - Navigate to `dist/` folder
   - Select `font-master-pro-firefox.xpi`

   **Note**: Firefox may show a warning about unsigned extensions. This is normal for self-hosted extensions.

### Option C: Sign for Firefox (For Public Distribution)

1. Create a Firefox Developer account at https://addons.mozilla.org/developers/
2. Submit your extension for review
3. Once approved, users can install from Firefox Add-ons store

## Verification

After installation, verify the extension is working:

1. **Check Extension Icon**: You should see the Font Master Pro icon in your toolbar
2. **Open Popup**: Click the icon - the popup should open
3. **Test Functionality**:
   - Try applying a preset
   - Check if fonts change on a test page
   - Open browser console (F12) and look for "Font Master Pro" messages

## Troubleshooting

### Extension Not Appearing

- **Chrome/Edge/Brave**: Make sure Developer Mode is enabled
- **Firefox**: Check `about:addons` to see if the extension is listed
- Reload the extension by clicking the reload icon

### Icons Not Loading

If you see broken icon images:

1. Run the icon generator:
   ```bash
   ./generate-icons.sh
   ```

2. Or manually create icons:
   - Install ImageMagick: `sudo apt-get install imagemagick` (Ubuntu)
   - Run: `convert icons/icon.svg -resize 16x16 icons/icon16.png`
   - Repeat for sizes 48 and 128

3. Reload the extension

### Permission Errors

If you see permission errors:
- Check that `manifest.json` has the correct permissions
- Reload the extension after making changes
- Some sites (like `chrome://` pages) block all extensions

### Firefox Compatibility Issues

If the extension doesn't work in Firefox:
- Make sure you built using `./build-firefox.sh`
- Check Firefox version (requires 109.0+)
- Look at Browser Console (`Ctrl+Shift+J`) for errors

## Updating the Extension

### Chrome/Edge/Brave

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the reload icon (🔄) on the Font Master Pro card

### Firefox (Temporary)

1. Make your changes
2. Rebuild: `./build-firefox.sh`
3. Go to `about:debugging#/runtime/this-firefox`
4. Click "Reload" on the Font Master Pro card

### Firefox (Permanent)

1. Make your changes
2. Increment version in `manifest.json`
3. Rebuild: `./build-firefox.sh`
4. Remove old version from `about:addons`
5. Install new XPI from `dist/`

## Uninstallation

### Chrome/Edge/Brave

1. Go to `chrome://extensions/`
2. Find Font Master Pro
3. Click "Remove"

### Firefox

1. Go to `about:addons`
2. Find Font Master Pro
3. Click the three dots menu
4. Select "Remove"

## Developer Tips

### Live Reload Setup

For faster development, use the built-in reload feature:
- Chrome: Reload button on extension card
- Firefox: Reload button in about:debugging

### Debugging

- **Popup**: Right-click popup → Inspect
- **Background**: Click "Inspect" on extension card
- **Content Script**: Regular page DevTools console

### Building for Production

Before distributing:

1. Test in all target browsers
2. Generate proper icons: `./generate-icons.sh`
3. Update version in `manifest.json`
4. Build Firefox version: `./build-firefox.sh`
5. Create ZIP for Chrome Web Store
6. Create XPI for Firefox Add-ons

---

Need help? Check the [README.md](README.md) or open an issue on GitHub.
