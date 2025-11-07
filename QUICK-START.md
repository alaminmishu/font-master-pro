# Font Master Pro - Quick Start Guide

## 🚀 Installation (30 seconds)

### Chrome/Edge/Brave

1. Open `chrome://extensions/` (or `edge://extensions/` or `brave://extensions/`)
2. Toggle "Developer mode" ON (top-right)
3. Click "Load unpacked"
4. Select the `font-master-pro` folder
5. Done! Look for the icon in your toolbar

### Firefox

```bash
./build-firefox.sh
```
Then: `about:debugging` → "Load Temporary Add-on" → select `build-firefox/manifest.json`

---

## 🎨 First Steps

1. **Click the extension icon** in your toolbar
2. **Select a preset** (go to Presets tab):
   - Modern, Classic, Dyslexic-Friendly, or Professional
3. **Click Save**
4. Watch your page transform!

---

## 📝 Common Tasks

### Change Font
1. Go to "Font Changer" tab
2. Select a font from dropdown
3. Adjust size, line height, spacing
4. Click "Save"

### Add Text Shadow
1. Go to "Text Effects" tab
2. Enable "Text Shadow" checkbox
3. Adjust offset, blur, color
4. Watch live preview
5. Click "Save"

### Apply to All Sites
1. Click "All Sites" button at top
2. Make changes
3. Click "Save"
4. Settings apply everywhere!

### Apply to Just This Site
1. Click "Current Site" button at top
2. Make changes
3. Click "Save"
4. Settings apply only here!

---

## 🔧 Generate Icons (Required for Chrome)

**Method 1: Browser-based (Easiest)**
1. Open `generate-icons.html` in any browser
2. Right-click each icon
3. "Save image as..." to `icons/` folder
4. Name them: `icon16.png`, `icon48.png`, `icon128.png`

**Method 2: Script (if you have ImageMagick)**
```bash
./generate-icons.sh
```

---

## 🧪 Test It

1. Open `test-page.html` in your browser
2. Open Font Master Pro extension
3. Try different settings
4. Watch the test page change!

---

## 🐛 Troubleshooting

**Not working?**
- ✓ Check master toggle is ON (header)
- ✓ Check you clicked "Save"
- ✓ Refresh the page

**Icons missing?**
- ✓ Run `generate-icons.html`
- ✓ Save icons to `icons/` folder

**Fonts not loading?**
- ✓ Check internet connection (for Google Fonts)
- ✓ Try a system font first

---

## 📚 Documentation

- **README.md** - Full feature list and usage
- **INSTALL.md** - Detailed installation guide
- **CREATE-ICONS.md** - Icon generation methods
- **PROJECT-SUMMARY.md** - Technical overview

---

## ⌨️ Quick Tips

- Use **presets** for instant styling
- **Current Site** mode for site-specific settings
- **All Sites** mode for consistent experience
- Master toggle to quickly disable/enable
- Reset button restores defaults
- Settings sync across devices (Chrome)

---

## 🎯 Keyboard-Free Usage

Everything works with clicks only:
- Click extension icon
- Click preset or adjust sliders
- Click save
- Done!

---

## 💡 Pro Tips

1. Start with a preset, then customize
2. Use "Dyslexic-Friendly" for better readability
3. Adjust line height for easier reading
4. Letter spacing improves clarity
5. Save site-specific settings for frequently visited sites

---

## 📊 At a Glance

| Feature | Tab | Default |
|---------|-----|---------|
| Font Family | Font Changer | System default |
| Font Size | Font Changer | 16px |
| Line Height | Font Changer | 1.5 |
| Letter Spacing | Font Changer | 0px |
| Text Shadow | Text Effects | Disabled |
| Presets | Presets | 4 available |
| Settings | Settings | Storage info |

---

## 🎨 Preset Summary

- **Modern**: Inter, clean, 16px, no shadow
- **Classic**: Merriweather, serif, 17px, subtle shadow
- **Dyslexic-Friendly**: Open Sans, 18px, generous spacing
- **Professional**: Roboto, 15px, business shadow (1px 0 1px #777)

---

## ⚡ Speed Run (10 seconds)

1. Click icon
2. Click "Modern" preset
3. Click "Save"
4. Enjoy!

---

**Need help?** Check README.md or open an issue!
