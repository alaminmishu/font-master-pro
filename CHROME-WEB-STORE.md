# Chrome Web Store Submission Guide

## 📦 Package Ready

The Chrome Web Store package has been created:
```
dist/font-master-pro-chrome-v1.0.0.zip
```

This ZIP contains only the essential files needed for the extension.

---

## 🚀 Upload to Chrome Web Store

### Prerequisites

1. **Google Account**: You need a Google account
2. **Developer Account**: Register at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - **One-time fee**: $5 USD to register as a developer
3. **Payment Method**: Credit/Debit card for the registration fee

### Step-by-Step Upload Process

#### 1. Register as Chrome Web Store Developer

1. Go to: https://chrome.google.com/webstore/devconsole
2. Sign in with your Google account
3. Accept the developer agreement
4. Pay the one-time $5 registration fee
5. Wait for confirmation (usually instant)

#### 2. Upload Your Extension

1. In the Developer Dashboard, click **"New Item"**
2. Click **"Choose file"** and select: `dist/font-master-pro-chrome-v1.0.0.zip`
3. Click **"Upload"**
4. Wait for the upload to complete (should take seconds)

#### 3. Fill Out Store Listing

Use the information below to complete your store listing.

---

## 📝 Store Listing Information

### Product Details

**Extension Name:**
```
Font Master Pro
```

**Summary** (132 characters max):
```
Advanced font customization with Google Fonts, text effects, and per-site settings. Better typography for the web!
```

**Category:**
```
Productivity
```

**Language:**
```
English (United States)
```

---

### Description

**Detailed Description:**

```
Transform your web browsing experience with Font Master Pro - the ultimate font customization tool for Chrome.

🎨 KEY FEATURES

Google Fonts Integration
• Access 15+ popular Google Fonts plus system fonts
• Dynamic font loading for instant previews
• Beautiful typography at your fingertips

Text Shadow Effects
• Customizable X/Y offset, blur, and color
• Live preview before applying
• Professional text enhancement

Font Controls
• Font size: 8-32px range
• Line height: 1.0-3.0 spacing for better readability
• Letter spacing: -2px to 10px for perfect tracking

Quick Preset Themes
• Modern: Clean, contemporary design (Inter font)
• Classic: Traditional serif style (Merriweather)
• Dyslexic-Friendly: High clarity with generous spacing (Open Sans)
• Professional: Business-ready appearance (Roboto with subtle shadow)

Smart Settings Management
• Per-Site Settings: Different preferences for each website
• Global Settings: Apply the same style everywhere
• Master Toggle: Quick enable/disable
• Auto-sync across devices

🎯 PERFECT FOR

✓ Better reading experience
✓ Accessibility improvements
✓ Dyslexia-friendly reading
✓ Professional appearance
✓ Personalized web browsing
✓ Eye strain reduction

💡 HOW IT WORKS

1. Click the extension icon
2. Choose a preset or customize fonts manually
3. Click "Save"
4. Watch your web transform instantly!

🔒 PRIVACY FIRST

• No data collection
• No tracking
• No external servers
• All settings stored locally in your browser
• Open source code available

🚀 FEATURES

• Modern glassmorphism UI (320px popup)
• Live preview for text shadows
• Automatic styling of dynamic content
• Smart element exclusion (preserves buttons, inputs, navigation)
• Cross-device sync (Chrome Sync)
• Lightweight and fast
• No internet required (except for Google Fonts)

📱 COMPATIBILITY

Works perfectly on:
• Google Chrome
• Microsoft Edge
• Brave Browser
• Any Chromium-based browser

⚡ EASY TO USE

No technical knowledge required! Just click, customize, and save.

Perfect for anyone who wants better typography while browsing the web.

---

Font Master Pro - Make the web beautiful, one font at a time.
```

---

### Screenshots

You need to create **at least 1 screenshot** (recommended: 3-5 screenshots).

**Required specifications:**
- **Size**: 1280x800 or 640x400 pixels
- **Format**: PNG or JPEG
- **Max file size**: 2MB each

**Recommended Screenshots:**

1. **Main Interface** - Show the popup with Font Changer tab
2. **Presets** - Show the 4 preset cards
3. **Text Effects** - Show text shadow controls with live preview
4. **Before/After** - Show a website before and after applying fonts
5. **Settings** - Show the settings and scope toggle

**Screenshot Instructions:**

1. Open the extension popup (1280x800 resolution recommended)
2. Take screenshots of each tab
3. Optionally add annotations or borders
4. Save as PNG files

**Tools for creating screenshots:**
- **Windows**: Snipping Tool, Snip & Sketch
- **macOS**: Screenshot (Cmd+Shift+4)
- **Linux**: GNOME Screenshot, Flameshot
- **Online**: Canva, Figma (for adding annotations)

---

### Small Promo Tile (Optional but Recommended)

**Size**: 440x280 pixels
**Format**: PNG or JPEG

Create a promotional image featuring:
- Extension name "Font Master Pro"
- Icon
- Tagline: "Advanced Font Customization"
- Blue gradient background (#2563eb to #1e40af)

---

### Icon

The extension already has proper icons:
- 128x128: `icons/icon128.png` (Store listing icon)
- 48x48: `icons/icon48.png`
- 16x16: `icons/icon16.png`

These are automatically included in the ZIP package.

---

### Privacy Policy

**You don't need a separate privacy policy URL** because:
- The extension doesn't collect data
- No external servers are contacted
- No user tracking

**Privacy Practices** (to fill in the form):

**Single Purpose:**
```
Font customization tool that allows users to change fonts, apply text effects, and save preferences per website.
```

**Data Usage:**
```
This extension does not collect, transmit, or share any user data. All settings are stored locally in the browser using Chrome's storage API.
```

**Permissions Justification:**

- **activeTab**: Required to apply font changes to the current webpage
- **storage**: Required to save user preferences and settings
- **tabs**: Required to identify the current domain for per-site settings
- **host permissions (<all_urls>)**: Required to inject font changes on any website user visits

---

### Support & Contact

**Website:**
```
https://github.com/alaminmishu/font-master-pro
```

**Support Email:**
```
aaamishucse@gmail.com
```

---

## 🔍 Review Process

After submission:

1. **Automated Review**:
   - Checks for malware, violations
   - Usually takes a few minutes

2. **Manual Review** (if needed):
   - Can take 1-7 days
   - Check your email for updates

3. **Publication**:
   - Once approved, extension goes live immediately
   - Users can find it in Chrome Web Store

---

## ✅ Pre-Submission Checklist

Before clicking "Submit for Review":

- [ ] ZIP file uploaded successfully
- [ ] Extension name filled in
- [ ] Summary written (under 132 characters)
- [ ] Detailed description filled in
- [ ] Category selected (Productivity)
- [ ] Language set (English)
- [ ] At least 1 screenshot uploaded
- [ ] Icon displays correctly (128x128)
- [ ] Privacy practices completed
- [ ] Support email provided
- [ ] Permissions justified
- [ ] Tested extension one final time

---

## 📊 After Publication

### Monitoring

1. **Dashboard**: Monitor installs, ratings, reviews
2. **Analytics**: Track user growth
3. **Reviews**: Respond to user feedback

### Updates

To update the extension:

1. Increment version in `manifest.json`
2. Create new ZIP file
3. Upload to Developer Dashboard
4. Click "Submit for Review"
5. Wait for approval (usually faster for updates)

---

## 💰 Pricing

**Recommended**: Keep it **FREE**

Chrome Web Store allows:
- Free extensions
- Paid extensions (one-time purchase)
- Extensions with in-app purchases

For maximum reach, keep Font Master Pro free.

---

## 🔗 Useful Links

- **Developer Dashboard**: https://chrome.google.com/webstore/devconsole
- **Developer Program Policies**: https://developer.chrome.com/docs/webstore/program-policies/
- **Best Practices**: https://developer.chrome.com/docs/webstore/best_practices/
- **Review Status**: Check in your Developer Dashboard

---

## 🎉 Success!

Once published, your extension will be available at:
```
https://chrome.google.com/webstore/detail/[extension-id]
```

Share this link with users to promote your extension!

---

## 📞 Need Help?

- **Chrome Web Store Support**: https://support.google.com/chrome_webstore/
- **Developer Forum**: https://groups.google.com/a/chromium.org/g/chromium-extensions

Good luck with your submission! 🚀
