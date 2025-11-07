/**
 * Font Master Pro - Content Script
 * Injects font changes and text effects into web pages
 */

// Track current settings
let currentSettings = null;
let currentDomain = '';
let styleElement = null;
let fontLinkElement = null;
let observer = null;

// Elements to exclude from font changes
const EXCLUDED_SELECTORS = [
  'button',
  'input',
  'textarea',
  'select',
  'nav',
  'nav *',
  '.navigation',
  '.navigation *',
  'code',
  'pre',
  'kbd',
  'samp',
  'var',
  '[class*="code"]',
  '[class*="Code"]',
  '[contenteditable="true"]'
].join(', ');

/**
 * Initialize content script
 */
(function init() {
  currentDomain = window.location.hostname;
  loadAndApplySettings();
  setupMessageListener();
  observeDOMChanges();
})();

/**
 * Load settings from storage and apply them
 */
async function loadAndApplySettings() {
  try {
    // Check both site-specific and global settings
    const result = await chrome.storage.sync.get([
      `site_${currentDomain}`,
      'globalSettings',
      'enabledSites'
    ]);

    // Check if enabled for this site
    const enabledSites = result.enabledSites || {};
    const isEnabled = enabledSites[currentDomain] !== false;

    if (!isEnabled) {
      removeStyles();
      return;
    }

    // Prefer site-specific settings, fall back to global
    const settings = result[`site_${currentDomain}`] || result.globalSettings;

    if (settings && settings.enabled) {
      currentSettings = settings;
      applySettings(settings);
    } else {
      removeStyles();
    }
  } catch (error) {
    console.error('Font Master Pro: Error loading settings:', error);
  }
}

/**
 * Apply font settings to the page
 */
function applySettings(settings) {
  try {
    // Remove existing styles
    removeStyles();

    // Create style element if it doesn't exist
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'font-master-pro-styles';
      document.head.appendChild(styleElement);
    }

    // Build CSS rules
    let css = generateCSS(settings);
    styleElement.textContent = css;

    // Load Google Font if needed
    if (settings.fontFamily && !isSystemFont(settings.fontFamily)) {
      loadGoogleFont(settings.fontFamily);
    }

    console.log('Font Master Pro: Settings applied successfully');
  } catch (error) {
    console.error('Font Master Pro: Error applying settings:', error);
  }
}

/**
 * Generate CSS from settings
 */
function generateCSS(settings) {
  let css = '';

  // Build the main selector (exclude specific elements)
  const selector = `body *:not(${EXCLUDED_SELECTORS})`;

  // Font properties
  const rules = [];

  if (settings.fontFamily) {
    rules.push(`font-family: "${settings.fontFamily}", sans-serif !important`);
  }

  if (settings.fontSize) {
    rules.push(`font-size: ${settings.fontSize}px !important`);
  }

  if (settings.lineHeight) {
    rules.push(`line-height: ${settings.lineHeight} !important`);
  }

  if (settings.letterSpacing) {
    rules.push(`letter-spacing: ${settings.letterSpacing}px !important`);
  }

  // Text shadow
  if (settings.textShadow && settings.textShadow.enabled) {
    const shadow = settings.textShadow;
    const shadowValue = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`;
    rules.push(`text-shadow: ${shadowValue} !important`);
  }

  // Combine all rules
  if (rules.length > 0) {
    css = `${selector} {\n  ${rules.join(';\n  ')};\n}`;
  }

  return css;
}

/**
 * Check if font is a system font
 */
function isSystemFont(fontFamily) {
  const systemFonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Verdana',
    'Courier New',
    'Impact',
    'Comic Sans MS',
    'Trebuchet MS'
  ];
  return systemFonts.includes(fontFamily);
}

/**
 * Load Google Font
 */
function loadGoogleFont(fontFamily) {
  try {
    // Remove existing font link if present
    if (fontLinkElement) {
      fontLinkElement.remove();
    }

    // Create new font link
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`;

    // Check if already loaded
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (!existingLink) {
      fontLinkElement = document.createElement('link');
      fontLinkElement.href = fontUrl;
      fontLinkElement.rel = 'stylesheet';
      fontLinkElement.id = 'font-master-pro-font';
      document.head.appendChild(fontLinkElement);
    }
  } catch (error) {
    console.error('Font Master Pro: Error loading Google Font:', error);
  }
}

/**
 * Remove all applied styles
 */
function removeStyles() {
  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }

  if (fontLinkElement) {
    fontLinkElement.remove();
    fontLinkElement = null;
  }
}

/**
 * Setup message listener for popup communication
 */
function setupMessageListener() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
      if (message.action === 'applySettings') {
        currentSettings = message.settings;
        applySettings(message.settings);
        sendResponse({ success: true });
      } else if (message.action === 'resetSettings') {
        currentSettings = null;
        removeStyles();
        sendResponse({ success: true });
      } else if (message.action === 'getSettings') {
        sendResponse({ settings: currentSettings });
      }
    } catch (error) {
      console.error('Font Master Pro: Error handling message:', error);
      sendResponse({ success: false, error: error.message });
    }

    return true; // Keep message channel open for async response
  });
}

/**
 * Observe DOM changes and reapply styles to new elements
 */
function observeDOMChanges() {
  // Create observer for dynamic content
  observer = new MutationObserver((mutations) => {
    // Only reapply if we have current settings
    if (currentSettings && currentSettings.enabled) {
      // Check if new text nodes were added
      let shouldReapply = false;

      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain text
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              shouldReapply = true;
              break;
            }
          }
          if (shouldReapply) break;
        }
      }

      // Reapply styles if needed (throttled)
      if (shouldReapply) {
        throttledReapply();
      }
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/**
 * Throttled reapply function to avoid excessive updates
 */
let reapplyTimeout = null;
function throttledReapply() {
  if (reapplyTimeout) return;

  reapplyTimeout = setTimeout(() => {
    if (currentSettings) {
      // Just ensure styles are still present
      if (!document.getElementById('font-master-pro-styles')) {
        applySettings(currentSettings);
      }
    }
    reapplyTimeout = null;
  }, 500);
}

/**
 * Listen for storage changes
 */
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    // Check if our site's settings changed
    const siteKey = `site_${currentDomain}`;

    if (changes[siteKey] || changes.globalSettings || changes.enabledSites) {
      loadAndApplySettings();
    }
  }
});

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
  if (observer) {
    observer.disconnect();
  }
  removeStyles();
});

console.log('Font Master Pro: Content script initialized for', currentDomain);
