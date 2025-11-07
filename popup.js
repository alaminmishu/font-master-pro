/**
 * Font Master Pro - Popup UI Controller
 * Handles all user interactions and settings management in the popup interface
 */

// Current state
let currentDomain = '';
let currentScope = 'local'; // 'local' or 'global'
let isEnabled = true;

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  fontFamily: '',
  fontSize: 16,
  lineHeight: 1.5,
  letterSpacing: 0,
  textShadow: {
    enabled: false,
    x: 1,
    y: 0,
    blur: 1,
    color: '#777777'
  }
};

/**
 * Initialize popup on load
 */
document.addEventListener('DOMContentLoaded', async () => {
  await initializeUI();
  attachEventListeners();
  await loadSettings();
});

/**
 * Initialize UI elements and get current tab domain
 */
async function initializeUI() {
  try {
    // Get current tab domain
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.url) {
      const url = new URL(tab.url);
      currentDomain = url.hostname;
      document.getElementById('domainName').textContent = currentDomain;
    }
  } catch (error) {
    console.error('Error initializing UI:', error);
    document.getElementById('domainName').textContent = 'Unknown domain';
  }

  // Update shadow controls visibility
  updateShadowControlsState();
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Master toggle
  document.getElementById('masterToggle').addEventListener('change', (e) => {
    isEnabled = e.target.checked;
    document.querySelector('.toggle-label').textContent = isEnabled ? 'Enabled' : 'Disabled';
  });

  // Scope toggle
  document.getElementById('localScope').addEventListener('click', () => {
    currentScope = 'local';
    updateScopeButtons();
  });

  document.getElementById('globalScope').addEventListener('click', () => {
    currentScope = 'global';
    updateScopeButtons();
  });

  // Font controls
  document.getElementById('fontFamily').addEventListener('change', updateFontPreview);

  // Sliders with live value updates
  setupSlider('fontSize', 'fontSizeValue', 'px');
  setupSlider('lineHeight', 'lineHeightValue', '');
  setupSlider('letterSpacing', 'letterSpacingValue', 'px');
  setupSlider('shadowX', 'shadowXValue', 'px', updateShadowPreview);
  setupSlider('shadowY', 'shadowYValue', 'px', updateShadowPreview);
  setupSlider('shadowBlur', 'shadowBlurValue', 'px', updateShadowPreview);

  // Text shadow controls
  document.getElementById('textShadowEnable').addEventListener('change', (e) => {
    updateShadowControlsState();
    updateShadowPreview();
  });

  document.getElementById('shadowColor').addEventListener('input', (e) => {
    document.getElementById('shadowColorText').value = e.target.value;
    updateShadowPreview();
  });

  document.getElementById('shadowColorText').addEventListener('input', (e) => {
    const color = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      document.getElementById('shadowColor').value = color;
      updateShadowPreview();
    }
  });

  // Preset cards
  document.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => applyPreset(card.dataset.preset));
  });

  // Action buttons
  document.getElementById('saveBtn').addEventListener('click', saveSettings);
  document.getElementById('resetBtn').addEventListener('click', resetSettings);
  document.getElementById('clearAllSettings').addEventListener('click', clearAllSettings);
}

/**
 * Setup slider with live value display
 */
function setupSlider(sliderId, valueId, unit, callback) {
  const slider = document.getElementById(sliderId);
  const valueDisplay = document.getElementById(valueId);

  slider.addEventListener('input', (e) => {
    valueDisplay.textContent = e.target.value + unit;
    if (callback) callback();
  });
}

/**
 * Switch between tabs
 */
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === tabName);
  });
}

/**
 * Update scope button states
 */
function updateScopeButtons() {
  document.getElementById('localScope').classList.toggle('active', currentScope === 'local');
  document.getElementById('globalScope').classList.toggle('active', currentScope === 'global');
}

/**
 * Update shadow controls enabled/disabled state
 */
function updateShadowControlsState() {
  const enabled = document.getElementById('textShadowEnable').checked;
  document.querySelectorAll('.shadow-controls').forEach(control => {
    control.classList.toggle('enabled', enabled);
  });
}

/**
 * Update font preview in real-time
 */
function updateFontPreview() {
  const fontFamily = document.getElementById('fontFamily').value;
  if (fontFamily) {
    // Load Google Font if needed
    if (!isSystemFont(fontFamily)) {
      loadGoogleFont(fontFamily);
    }
  }
}

/**
 * Update shadow preview
 */
function updateShadowPreview() {
  const preview = document.getElementById('shadowPreview');
  const enabled = document.getElementById('textShadowEnable').checked;

  if (enabled) {
    const x = document.getElementById('shadowX').value;
    const y = document.getElementById('shadowY').value;
    const blur = document.getElementById('shadowBlur').value;
    const color = document.getElementById('shadowColor').value;
    preview.style.textShadow = `${x}px ${y}px ${blur}px ${color}`;
  } else {
    preview.style.textShadow = 'none';
  }
}

/**
 * Check if font is a system font
 */
function isSystemFont(fontFamily) {
  const systemFonts = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New'];
  return systemFonts.includes(fontFamily);
}

/**
 * Load Google Font dynamically
 */
function loadGoogleFont(fontFamily) {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@400;700&display=swap`;

  // Check if already loaded
  if (!document.querySelector(`link[href="${fontUrl}"]`)) {
    const link = document.createElement('link');
    link.href = fontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}

/**
 * Apply a preset theme
 */
function applyPreset(presetName) {
  const preset = PRESETS[presetName];
  if (!preset) return;

  const settings = preset.settings;

  // Apply font settings
  document.getElementById('fontFamily').value = settings.fontFamily;
  document.getElementById('fontSize').value = settings.fontSize;
  document.getElementById('fontSizeValue').textContent = settings.fontSize + 'px';
  document.getElementById('lineHeight').value = settings.lineHeight;
  document.getElementById('lineHeightValue').textContent = settings.lineHeight;
  document.getElementById('letterSpacing').value = settings.letterSpacing;
  document.getElementById('letterSpacingValue').textContent = settings.letterSpacing + 'px';

  // Apply shadow settings
  const shadow = settings.textShadow;
  document.getElementById('textShadowEnable').checked = shadow.enabled;
  document.getElementById('shadowX').value = shadow.x;
  document.getElementById('shadowXValue').textContent = shadow.x + 'px';
  document.getElementById('shadowY').value = shadow.y;
  document.getElementById('shadowYValue').textContent = shadow.y + 'px';
  document.getElementById('shadowBlur').value = shadow.blur;
  document.getElementById('shadowBlurValue').textContent = shadow.blur + 'px';
  document.getElementById('shadowColor').value = shadow.color;
  document.getElementById('shadowColorText').value = shadow.color;

  updateShadowControlsState();
  updateShadowPreview();
  updateFontPreview();

  // Show feedback
  showNotification(`Applied ${preset.name} preset`);
}

/**
 * Load settings from storage
 */
async function loadSettings() {
  try {
    const storageKey = currentScope === 'global' ? 'globalSettings' : `site_${currentDomain}`;
    const result = await chrome.storage.sync.get([storageKey, 'enabledSites']);

    let settings = result[storageKey] || { ...DEFAULT_SETTINGS };

    // Check if enabled for this site
    const enabledSites = result.enabledSites || {};
    isEnabled = currentScope === 'global' ? settings.enabled : (enabledSites[currentDomain] !== false);

    // Update UI
    document.getElementById('masterToggle').checked = isEnabled;
    document.querySelector('.toggle-label').textContent = isEnabled ? 'Enabled' : 'Disabled';

    // Load font settings
    if (settings.fontFamily) {
      document.getElementById('fontFamily').value = settings.fontFamily;
    }
    document.getElementById('fontSize').value = settings.fontSize;
    document.getElementById('fontSizeValue').textContent = settings.fontSize + 'px';
    document.getElementById('lineHeight').value = settings.lineHeight;
    document.getElementById('lineHeightValue').textContent = settings.lineHeight;
    document.getElementById('letterSpacing').value = settings.letterSpacing;
    document.getElementById('letterSpacingValue').textContent = settings.letterSpacing + 'px';

    // Load shadow settings
    const shadow = settings.textShadow;
    document.getElementById('textShadowEnable').checked = shadow.enabled;
    document.getElementById('shadowX').value = shadow.x;
    document.getElementById('shadowXValue').textContent = shadow.x + 'px';
    document.getElementById('shadowY').value = shadow.y;
    document.getElementById('shadowYValue').textContent = shadow.y + 'px';
    document.getElementById('shadowBlur').value = shadow.blur;
    document.getElementById('shadowBlurValue').textContent = shadow.blur + 'px';
    document.getElementById('shadowColor').value = shadow.color;
    document.getElementById('shadowColorText').value = shadow.color;

    updateShadowControlsState();
    updateShadowPreview();

    // Update site count
    await updateSiteCount();
  } catch (error) {
    console.error('Error loading settings:', error);
    showNotification('Error loading settings');
  }
}

/**
 * Save settings to storage
 */
async function saveSettings() {
  try {
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.classList.add('saving');
    saveBtn.textContent = 'Saving...';

    // Collect settings
    const settings = {
      enabled: isEnabled,
      fontFamily: document.getElementById('fontFamily').value,
      fontSize: parseInt(document.getElementById('fontSize').value),
      lineHeight: parseFloat(document.getElementById('lineHeight').value),
      letterSpacing: parseFloat(document.getElementById('letterSpacing').value),
      textShadow: {
        enabled: document.getElementById('textShadowEnable').checked,
        x: parseInt(document.getElementById('shadowX').value),
        y: parseInt(document.getElementById('shadowY').value),
        blur: parseInt(document.getElementById('shadowBlur').value),
        color: document.getElementById('shadowColor').value
      }
    };

    // Save to storage
    const storageKey = currentScope === 'global' ? 'globalSettings' : `site_${currentDomain}`;
    await chrome.storage.sync.set({ [storageKey]: settings });

    // Update enabled sites
    const result = await chrome.storage.sync.get('enabledSites');
    const enabledSites = result.enabledSites || {};
    enabledSites[currentDomain] = isEnabled;
    await chrome.storage.sync.set({ enabledSites });

    // Notify content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      await chrome.tabs.sendMessage(tab.id, {
        action: 'applySettings',
        settings: settings,
        domain: currentDomain
      });
    }

    // Success feedback
    saveBtn.textContent = 'Saved!';
    setTimeout(() => {
      saveBtn.classList.remove('saving');
      saveBtn.textContent = 'Save';
    }, 1500);

    await updateSiteCount();
  } catch (error) {
    console.error('Error saving settings:', error);
    showNotification('Error saving settings');
    document.getElementById('saveBtn').textContent = 'Save';
    document.getElementById('saveBtn').classList.remove('saving');
  }
}

/**
 * Reset settings to defaults
 */
async function resetSettings() {
  if (!confirm('Reset all settings for this ' + (currentScope === 'global' ? 'globally' : 'site') + '?')) {
    return;
  }

  try {
    const storageKey = currentScope === 'global' ? 'globalSettings' : `site_${currentDomain}`;
    await chrome.storage.sync.remove(storageKey);

    // Reload UI with defaults
    await loadSettings();

    // Notify content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      await chrome.tabs.sendMessage(tab.id, {
        action: 'resetSettings',
        domain: currentDomain
      });
    }

    showNotification('Settings reset successfully');
  } catch (error) {
    console.error('Error resetting settings:', error);
    showNotification('Error resetting settings');
  }
}

/**
 * Clear all settings from storage
 */
async function clearAllSettings() {
  if (!confirm('This will delete all saved settings for all sites. Continue?')) {
    return;
  }

  try {
    await chrome.storage.sync.clear();
    await loadSettings();
    await updateSiteCount();
    showNotification('All settings cleared');
  } catch (error) {
    console.error('Error clearing settings:', error);
    showNotification('Error clearing settings');
  }
}

/**
 * Update site count display
 */
async function updateSiteCount() {
  try {
    const allData = await chrome.storage.sync.get(null);
    const siteKeys = Object.keys(allData).filter(key => key.startsWith('site_'));
    document.getElementById('siteCount').textContent = siteKeys.length;
  } catch (error) {
    console.error('Error updating site count:', error);
  }
}

/**
 * Show notification to user
 */
function showNotification(message) {
  // Simple console log for now - could be enhanced with toast notifications
  console.log(message);
}
