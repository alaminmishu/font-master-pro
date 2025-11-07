# GitHub Repository Setup Guide

## 🎯 Quick Setup

Your Font Master Pro extension is now ready to push to GitHub!

---

## 📋 Current Git Status

✅ Git repository initialized
✅ All files committed
✅ Git configured with your credentials:
- Username: `alaminmishu`
- Email: `aaamishucse@gmail.com`

**Current commit:**
```
commit 0249a25
Initial commit: Font Master Pro v1.0.0
```

---

## 🚀 Push to GitHub

### Option 1: Create Repository via GitHub Website (Easiest)

#### Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. **Repository name**: `font-master-pro`
3. **Description**:
   ```
   Advanced Chrome extension for font customization with Google Fonts, text effects, and per-site preferences
   ```
4. **Visibility**:
   - ✅ **Public** (recommended - for open source)
   - ⬜ Private (if you prefer)
5. **DO NOT** initialize with:
   - ❌ README (we already have one)
   - ❌ .gitignore (we already have one)
   - ❌ License (we already have one)
6. Click **"Create repository"**

#### Step 2: Push Your Code

GitHub will show you commands. Use these:

```bash
# Add GitHub as remote
git remote add origin https://github.com/alaminmishu/font-master-pro.git

# Rename branch to main (optional, modern convention)
git branch -M main

# Push to GitHub
git push -u origin main
```

Or if you prefer to keep the branch as "master":

```bash
git remote add origin https://github.com/alaminmishu/font-master-pro.git
git push -u origin master
```

---

### Option 2: Create Repository via GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create font-master-pro --public --source=. --remote=origin --push
```

---

## 🔐 Authentication

When you push, GitHub will ask for authentication:

### Method 1: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Font Master Pro Upload`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
7. When prompted for password, paste the token

### Method 2: SSH Key

If you have SSH keys set up, use:

```bash
git remote add origin git@github.com:alaminmishu/font-master-pro.git
git push -u origin main
```

---

## 📝 Repository Setup Best Practices

### Add Topics/Tags

After creating the repository, add topics:

1. Go to your repository on GitHub
2. Click the ⚙️ gear icon next to "About"
3. Add topics:
   ```
   chrome-extension
   font-customization
   google-fonts
   typography
   text-effects
   accessibility
   dyslexic-friendly
   browser-extension
   manifest-v3
   ```

### Add a Repository Description

```
Advanced Chrome extension for font customization with Google Fonts, text effects, and per-site preferences. Features include 4 preset themes, text shadows, and smart per-site settings.
```

### Update package.json

The repository URL in `package.json` should be updated:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/alaminmishu/font-master-pro.git"
}
```

---

## 🏷️ Create a Release (Optional)

To create v1.0.0 release:

### Via GitHub Website:

1. Go to your repository
2. Click **"Releases"** → **"Create a new release"**
3. **Tag version**: `v1.0.0`
4. **Release title**: `Font Master Pro v1.0.0`
5. **Description**:
   ```markdown
   ## Font Master Pro v1.0.0

   Initial release of Font Master Pro - Advanced font customization for Chrome.

   ### Features
   - Google Fonts integration (15+ fonts)
   - Text shadow effects with live preview
   - Font size, line height, letter spacing controls
   - 4 preset themes
   - Per-site settings
   - Cross-browser support

   ### Installation
   Download from Chrome Web Store: [Link coming soon]

   Or install manually:
   1. Download `font-master-pro-chrome-v1.0.0.zip`
   2. Extract and load in Chrome via `chrome://extensions`
   ```
6. **Attach files**: Upload `dist/font-master-pro-chrome-v1.0.0.zip`
7. Click **"Publish release"**

### Via Command Line:

```bash
git tag -a v1.0.0 -m "Font Master Pro v1.0.0 - Initial Release"
git push origin v1.0.0
```

---

## 📄 Add Badges to README (Optional)

Add these to the top of `README.md`:

```markdown
# Font Master Pro

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/YOUR_EXTENSION_ID.svg)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/alaminmishu/font-master-pro.svg)](https://github.com/alaminmishu/font-master-pro/releases)
```

(Replace `YOUR_EXTENSION_ID` with actual Chrome Web Store ID after publishing)

---

## 🔄 Future Updates Workflow

When you make changes:

```bash
# 1. Make your changes to files

# 2. Check what changed
git status

# 3. Add changes
git add .

# 4. Commit with descriptive message
git commit -m "Add feature: Custom font upload support"

# 5. Push to GitHub
git push

# 6. For Chrome Web Store updates:
# - Update version in manifest.json
# - Create new ZIP
# - Upload to Chrome Web Store
```

---

## 🌟 Enable GitHub Pages (Optional)

You can host the test page on GitHub Pages:

1. Go to repository **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main` → `/` (root)
4. Click **Save**

Your test page will be available at:
```
https://alaminmishu.github.io/font-master-pro/test-page.html
```

---

## 🔒 Security

### Protect Sensitive Files

The `.gitignore` is already configured to exclude:
- Build directories
- Node modules
- Temporary files
- Private keys (`.pem` files)

### Never commit:
- Private keys
- API tokens
- Passwords
- User data

---

## 📊 GitHub Repository Stats

After setup, you'll have:
- ✅ Version control
- ✅ Issue tracking
- ✅ Pull request workflow
- ✅ Release management
- ✅ Collaboration features
- ✅ Code backup

---

## 🎉 Repository Ready!

After pushing to GitHub, your repository will be live at:
```
https://github.com/alaminmishu/font-master-pro
```

Share this link with:
- Contributors
- Users wanting to report issues
- Users wanting the source code

---

## 📞 Next Steps

1. ✅ Push code to GitHub
2. ✅ Add repository topics/tags
3. ✅ Create v1.0.0 release
4. ✅ Upload to Chrome Web Store
5. ✅ Update README with Chrome Web Store link
6. ✅ Share with the world!

Happy coding! 🚀
