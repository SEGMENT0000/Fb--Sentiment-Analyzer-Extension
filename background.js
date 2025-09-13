// Background script for FB Sentiment Analyzer extension
(function() {
  'use strict';

  // Extension installation handler
  chrome.runtime.onInstalled.addListener((details) => {
    console.log('FB Sentiment Analyzer extension installed/updated');
    
    if (details.reason === 'install') {
      // Set default storage values on first install
      chrome.storage.local.set({
        extensionSettings: {
          autoAnalyze: true,
          notificationsEnabled: false,
          lastAnalyzedUrl: null,
          analysisHistory: []
        }
      });
    }
  });

  // Handle messages from content scripts and popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
      case 'storeAnalysisData':
        handleStoreAnalysisData(message.data, sendResponse);
        break;
      
      case 'getAnalysisData':
        handleGetAnalysisData(message.url, sendResponse);
        break;
      
      case 'clearAnalysisData':
        handleClearAnalysisData(sendResponse);
        break;
      
      case 'updateExtensionSettings':
        handleUpdateSettings(message.settings, sendResponse);
        break;
      
      default:
        console.log('Unknown message action:', message.action);
    }
    
    return true; // Indicates we will send a response asynchronously
  });

  // Store analysis data in local storage
  function handleStoreAnalysisData(data, sendResponse) {
    try {
      const analysisData = {
        ...data,
        timestamp: Date.now(),
        id: generateAnalysisId()
      };
      
      // Store current analysis data
      chrome.storage.local.set({
        facebookAnalysisData: analysisData
      }, () => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
          return;
        }
        
        // Add to analysis history
        updateAnalysisHistory(analysisData);
        sendResponse({ success: true, data: analysisData });
      });
      
    } catch (error) {
      console.error('Error storing analysis data:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  // Get stored analysis data
  function handleGetAnalysisData(url, sendResponse) {
    chrome.storage.local.get(['facebookAnalysisData'], (result) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      
      const data = result.facebookAnalysisData;
      
      // Check if data exists and is for the requested URL
      if (data && (!url || data.url === url)) {
        sendResponse({ success: true, data: data });
      } else {
        sendResponse({ success: false, error: 'No analysis data found' });
      }
    });
  }

  // Clear stored analysis data
  function handleClearAnalysisData(sendResponse) {
    chrome.storage.local.remove(['facebookAnalysisData'], () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      
      sendResponse({ success: true });
    });
  }

  // Update extension settings
  function handleUpdateSettings(settings, sendResponse) {
    chrome.storage.local.get(['extensionSettings'], (result) => {
      const currentSettings = result.extensionSettings || {};
      const updatedSettings = { ...currentSettings, ...settings };
      
      chrome.storage.local.set({
        extensionSettings: updatedSettings
      }, () => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
          return;
        }
        
        sendResponse({ success: true, settings: updatedSettings });
      });
    });
  }

  // Update analysis history
  function updateAnalysisHistory(analysisData) {
    chrome.storage.local.get(['extensionSettings'], (result) => {
      const settings = result.extensionSettings || {};
      const history = settings.analysisHistory || [];
      
      // Add new analysis to history (keep only last 10)
      const updatedHistory = [
        {
          id: analysisData.id,
          url: analysisData.url,
          timestamp: analysisData.timestamp,
          totalComments: analysisData.totalComments,
          sentimentDistribution: analysisData.sentimentDistribution
        },
        ...history.filter(item => item.url !== analysisData.url)
      ].slice(0, 10);
      
      // Update settings with new history
      const updatedSettings = {
        ...settings,
        analysisHistory: updatedHistory,
        lastAnalyzedUrl: analysisData.url
      };
      
      chrome.storage.local.set({
        extensionSettings: updatedSettings
      });
    });
  }

  // Generate unique analysis ID
  function generateAnalysisId() {
    return 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Handle tab updates to check for Facebook URLs
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      // Check if it's a supported Facebook URL
      if (isValidFacebookPostUrl(tab.url)) {
        // Update extension badge or icon to indicate the extension is active
        chrome.action.setBadgeText({
          text: '✓',
          tabId: tabId
        });
        chrome.action.setBadgeBackgroundColor({
          color: '#4ade80',
          tabId: tabId
        });
      } else {
        // Clear badge for non-Facebook URLs
        chrome.action.setBadgeText({
          text: '',
          tabId: tabId
        });
      }
    }
  });

  // Check if URL is a valid Facebook post URL
  function isValidFacebookPostUrl(url) {
    const patterns = [
      /^https:\/\/www\.facebook\.com\/[^\/]+\/posts\/[^\/]+/,
      /^https:\/\/www\.facebook\.com\/[^\/]+\/activity\/[^\/]+/,
      /^https:\/\/www\.facebook\.com\/photo\.php\?fbid=\d+/,
      /^https:\/\/www\.facebook\.com\/[^\/]+\/photos\/[^\/]+/,
      /^https:\/\/www\.facebook\.com\/photos\/[^\/]+/,
      /^https:\/\/www\.facebook\.com\/permalink\.php\?story_fbid=\d+/,
      /^https:\/\/www\.facebook\.com\/[^\/]+\/videos\/[^\/]+/,
      /^https:\/\/www\.facebook\.com\/photo\?fbid=\d+/,
      /^https:\/\/www\.facebook\.com\/watch\/\?v=\d+/
    ];
    
    return patterns.some(pattern => pattern.test(url));
  }

  // Handle extension icon click
  chrome.action.onClicked.addListener((tab) => {
    // This won't fire if we have a popup defined, but included for completeness
    console.log('Extension icon clicked on tab:', tab.url);
  });

  // Cleanup on extension shutdown
  chrome.runtime.onSuspend.addListener(() => {
    console.log('FB Sentiment Analyzer extension shutting down');
  });

})();