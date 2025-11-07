/**
 * Font Master Pro - Background Service Worker
 * Manages storage, cross-tab communication, and extension lifecycle
 */

// Default settings structure
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
 * Initialize extension on install
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Font Master Pro installed:', details.reason);

  if (details.reason === 'install') {
    // Set up default global settings on first install
    try {
      await chrome.storage.sync.set({
        globalSettings: { ...DEFAULT_SETTINGS },
        enabledSites: {}
      });
      console.log('Font Master Pro: Default settings initialized');
    } catch (error) {
      console.error('Font Master Pro: Error initializing settings:', error);
    }
  } else if (details.reason === 'update') {
    console.log('Font Master Pro updated to version', chrome.runtime.getManifest().version);
    // Could add migration logic here if needed
  }
});

/**
 * Handle messages from popup or content scripts
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  switch (message.action) {
    case 'getSettings':
      handleGetSettings(message, sendResponse);
      break;

    case 'saveSettings':
      handleSaveSettings(message, sendResponse);
      break;

    case 'resetSettings':
      handleResetSettings(message, sendResponse);
      break;

    case 'broadcastSettings':
      handleBroadcastSettings(message, sendResponse);
      break;

    case 'getSyncStatus':
      handleGetSyncStatus(sendResponse);
      break;

    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }

  return true; // Keep message channel open for async responses
});

/**
 * Get settings for a specific domain
 */
async function handleGetSettings(message, sendResponse) {
  try {
    const domain = message.domain;
    const storageKey = message.scope === 'global' ? 'globalSettings' : `site_${domain}`;

    const result = await chrome.storage.sync.get([storageKey, 'enabledSites']);

    const settings = result[storageKey] || { ...DEFAULT_SETTINGS };
    const enabledSites = result.enabledSites || {};
    const isEnabled = enabledSites[domain] !== false;

    sendResponse({
      success: true,
      settings: settings,
      enabled: isEnabled
    });
  } catch (error) {
    console.error('Error getting settings:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Save settings for a specific domain or globally
 */
async function handleSaveSettings(message, sendResponse) {
  try {
    const { domain, settings, scope, enabled } = message;
    const storageKey = scope === 'global' ? 'globalSettings' : `site_${domain}`;

    // Save settings
    await chrome.storage.sync.set({ [storageKey]: settings });

    // Update enabled sites list
    const result = await chrome.storage.sync.get('enabledSites');
    const enabledSites = result.enabledSites || {};
    enabledSites[domain] = enabled;
    await chrome.storage.sync.set({ enabledSites });

    // Broadcast to all tabs of this domain
    await broadcastToTabs(domain, {
      action: 'applySettings',
      settings: settings,
      domain: domain
    });

    sendResponse({ success: true });
  } catch (error) {
    console.error('Error saving settings:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Reset settings for a specific domain or globally
 */
async function handleResetSettings(message, sendResponse) {
  try {
    const { domain, scope } = message;
    const storageKey = scope === 'global' ? 'globalSettings' : `site_${domain}`;

    await chrome.storage.sync.remove(storageKey);

    // Broadcast to all tabs
    await broadcastToTabs(domain, {
      action: 'resetSettings',
      domain: domain
    });

    sendResponse({ success: true });
  } catch (error) {
    console.error('Error resetting settings:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Broadcast settings to all tabs of a specific domain
 */
async function handleBroadcastSettings(message, sendResponse) {
  try {
    await broadcastToTabs(message.domain, message.data);
    sendResponse({ success: true });
  } catch (error) {
    console.error('Error broadcasting settings:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Get sync status and storage info
 */
async function handleGetSyncStatus(sendResponse) {
  try {
    const allData = await chrome.storage.sync.get(null);
    const siteKeys = Object.keys(allData).filter(key => key.startsWith('site_'));

    sendResponse({
      success: true,
      siteCount: siteKeys.length,
      hasGlobalSettings: !!allData.globalSettings
    });
  } catch (error) {
    console.error('Error getting sync status:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Broadcast message to all tabs matching a domain
 */
async function broadcastToTabs(domain, message) {
  try {
    const tabs = await chrome.tabs.query({});

    for (const tab of tabs) {
      if (tab.url) {
        const url = new URL(tab.url);
        if (url.hostname === domain) {
          try {
            await chrome.tabs.sendMessage(tab.id, message);
          } catch (error) {
            // Tab might not have content script loaded yet
            console.log('Could not send message to tab', tab.id, error.message);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error broadcasting to tabs:', error);
  }
}

/**
 * Listen for storage changes and sync across tabs
 */
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    console.log('Storage changed:', Object.keys(changes));

    // Notify all tabs about storage changes
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url) {
          try {
            chrome.tabs.sendMessage(tab.id, {
              action: 'storageChanged',
              changes: changes
            }).catch(() => {
              // Ignore errors for tabs without content script
            });
          } catch (error) {
            // Ignore
          }
        }
      });
    });
  }
});

/**
 * Handle tab updates - reapply settings when page loads
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only act when page has finished loading
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const url = new URL(tab.url);
      const domain = url.hostname;

      // Get settings for this domain
      const result = await chrome.storage.sync.get([
        `site_${domain}`,
        'globalSettings',
        'enabledSites'
      ]);

      const enabledSites = result.enabledSites || {};
      const isEnabled = enabledSites[domain] !== false;

      if (isEnabled) {
        const settings = result[`site_${domain}`] || result.globalSettings;

        if (settings && settings.enabled) {
          // Wait a bit for content script to be ready
          setTimeout(async () => {
            try {
              await chrome.tabs.sendMessage(tabId, {
                action: 'applySettings',
                settings: settings,
                domain: domain
              });
            } catch (error) {
              // Content script might not be ready yet
              console.log('Could not apply settings to tab', tabId);
            }
          }, 100);
        }
      }
    } catch (error) {
      // Ignore invalid URLs (like chrome:// pages)
    }
  }
});

/**
 * Handle extension icon click - open popup
 */
chrome.action.onClicked.addListener((tab) => {
  // This will only fire if no popup is set, which we have set in manifest
  console.log('Extension icon clicked for tab:', tab.id);
});

/**
 * Cleanup on extension unload
 */
self.addEventListener('unload', () => {
  console.log('Font Master Pro: Service worker unloading');
});

console.log('Font Master Pro: Background service worker initialized');
