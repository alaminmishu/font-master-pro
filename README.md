# Font Master Pro

A comprehensive browser extension for advanced font customization with Google Fonts integration, text effects, and per-site preferences.

## Features

### Core Functionality
- **Google Fonts Integration**: Access 15+ popular Google Fonts plus system fonts
- **Text Shadow Effects**: Apply customizable text shadows with live preview
- **Font Size Control**: Adjust font size from 8px to 32px
- **Line Height**: Control spacing between lines (1.0 to 3.0)
- **Letter Spacing**: Fine-tune character spacing (-2px to 10px)

### Advanced Features
- **Preset Themes**: Quick-apply themes (Modern, Classic, Dyslexic-Friendly, Professional)
- **Per-Site Settings**: Remember different preferences for each website
- **Global/Local Toggle**: Apply settings to all sites or just the current one
- **Smart Element Exclusion**: Automatically skips buttons, inputs, navigation, and code blocks
- **Live Preview**: See changes in real-time before applying
- **MutationObserver**: Automatically applies styles to dynamically loaded content

### User Experience
- **Modern Glassmorphism UI**: Beautiful gradient design (320px width)
- **Tabbed Interface**: Organized into Font Changer, Text Effects, Presets, and Settings
- **Master On/Off Toggle**: Quickly enable/disable all customizations
- **Storage Management**: View and clear saved settings
- **Cross-Browser Support**: Chrome, Edge, Firefox, and Brave

## Installation

### Chrome/Edge/Brave

1. Download or clone this repository
2. Open your browser and navigate to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `font-master-pro` directory

### Firefox

1. Run the build script:
   ```bash
   cd font-master-pro
   ./build-firefox.sh
   ```

2. Install temporarily (for testing):
   - Open Firefox
   - Go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select `manifest.json` from the `build-firefox` directory

3. Or install the XPI permanently:
   - Open Firefox
   - Go to `about:addons`
   - Click the gear icon → "Install Add-on From File"
   - Select `dist/font-master-pro-firefox.xpi`

## Usage

### Quick Start

1. Click the Font Master Pro icon in your browser toolbar
2. Make sure the extension is enabled (toggle in header)
3. Choose between "Current Site" or "All Sites" mode
4. Select a preset theme or customize manually
5. Click "Save" to apply changes

### Applying Preset Themes

1. Navigate to the "Presets" tab
2. Click on any preset card:
   - **Modern**: Clean, contemporary design (Inter font)
   - **Classic**: Traditional serif style (Merriweather font)
   - **Dyslexic-Friendly**: High clarity, generous spacing (Open Sans)
   - **Professional**: Business-ready appearance (Roboto)
3. Click "Save" to apply

### Custom Font Settings

1. Go to the "Font Changer" tab
2. Select a font from the dropdown (system or Google Fonts)
3. Adjust sliders for:
   - Font size
   - Line height
   - Letter spacing
4. Click "Save" when satisfied

### Text Shadow Effects

1. Navigate to the "Text Effects" tab
2. Enable "Text Shadow" checkbox
3. Adjust shadow properties:
   - Horizontal/Vertical offset
   - Blur radius
   - Shadow color (color picker or hex input)
4. Preview your changes in the live preview box
5. Click "Save" to apply

### Managing Settings

- **Per-Site Settings**: Use "Current Site" mode to save unique settings for specific domains
- **Global Settings**: Use "All Sites" mode to apply the same settings everywhere
- **Reset**: Click "Reset" to restore defaults for current scope
- **Clear All**: Go to Settings tab and click "Clear All Settings" to wipe all saved data

## Project Structure

```
font-master-pro/
├── manifest.json           # Chrome extension manifest (Manifest V3)
├── popup.html              # Extension popup UI
├── popup.js                # Popup logic and event handlers
├── content.js              # Content script for page injection
├── background.js           # Background service worker
├── presets.js              # Predefined theme definitions
├── styles/
│   └── popup.css           # Glassmorphism UI styling
├── icons/
│   ├── icon.svg            # Source icon
│   ├── icon16.png          # 16x16 toolbar icon
│   ├── icon48.png          # 48x48 management icon
│   └── icon128.png         # 128x128 store icon
├── build-firefox.sh        # Firefox compatibility build script
└── README.md               # This file
```

## Technical Details

### Permissions

- `activeTab`: Access current tab for font injection
- `storage`: Save user preferences
- `tabs`: Query tabs for cross-tab synchronization
- `<all_urls>`: Apply fonts to all websites

### Storage

Settings are stored in `chrome.storage.sync`:
- **Global settings**: `globalSettings` key
- **Per-site settings**: `site_${domain}` keys
- **Enabled sites**: `enabledSites` object

### Excluded Elements

The following elements are excluded from font changes:
- Buttons (`button`)
- Input fields (`input`, `textarea`, `select`)
- Navigation menus (`nav`, `.navigation`)
- Code blocks (`code`, `pre`, `kbd`, `samp`, `var`)
- Elements with "code" in class name
- Contenteditable elements

### Browser API Compatibility

- Uses Chrome Extension Manifest V3
- Firefox build script converts to Manifest V2 for compatibility
- Service worker for Chrome, background scripts for Firefox

## Development

### Building for Firefox

Run the build script to create a Firefox-compatible version:

```bash
./build-firefox.sh
```

This will:
1. Create a `build-firefox` directory with Manifest V2
2. Generate icons (if ImageMagick is installed)
3. Create `.zip` and `.xpi` packages in `dist/`

### Generating Icons

If you have ImageMagick installed, the build script automatically generates PNG icons from the SVG source:

```bash
# Install ImageMagick (Ubuntu/Debian)
sudo apt-get install imagemagick

# Or macOS
brew install imagemagick

# Then run the build script
./build-firefox.sh
```

## Troubleshooting

### Extension Not Working

1. **Check if enabled**: Make sure the master toggle is ON
2. **Check scope**: Verify you're in the right mode (Current Site vs All Sites)
3. **Refresh page**: Reload the page after saving settings
4. **Check console**: Open DevTools Console (F12) and look for "Font Master Pro" messages

### Fonts Not Loading

1. **Google Fonts**: Ensure you have an internet connection
2. **System Fonts**: Try a different system font first
3. **Clear cache**: Try clearing browser cache and reloading

### Settings Not Saving

1. **Storage quota**: Chrome Sync has a quota limit (check Settings tab)
2. **Sync enabled**: Make sure Chrome Sync is enabled in browser settings
3. **Permissions**: Verify the extension has storage permission

### Styles Not Applied

1. **Check excluded elements**: Buttons, inputs, nav, and code blocks are excluded by design
2. **Page compatibility**: Some sites use aggressive CSS that may override styles
3. **Content Security Policy**: Some sites block external font loading

## Contributing

This is an educational project. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Create your own themes

## License

MIT License - Feel free to use, modify, and distribute.

## Version History

### v1.0.0 (2025)
- Initial release
- Google Fonts integration
- Text shadow effects
- 4 preset themes
- Per-site settings
- Glassmorphism UI
- Cross-browser support

## Credits

- **Google Fonts**: Font delivery and selection
- **Design**: Modern glassmorphism UI
- **Icons**: Custom SVG design

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Open DevTools Console for error messages
3. Verify permissions in browser's extension settings

---

Made with ❤️ for better web typography
