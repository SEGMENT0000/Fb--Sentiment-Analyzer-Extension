// Enhanced content script for clean Facebook comment extraction
(function() {
  'use strict';

  // Supported Facebook URL patterns
  const FACEBOOK_URL_PATTERNS = [
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

  // Check if current URL matches supported Facebook post patterns
  function isValidFacebookPostUrl(url) {
    return FACEBOOK_URL_PATTERNS.some(pattern => pattern.test(url));
  }

  // Wait for elements to load
  function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector(selector);
        if (element) {
          obs.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  // Clean comment text by removing UI elements
  function cleanCommentText(element) {
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Remove common UI elements
    const uiSelectors = [
      'a[role="button"]',          // Like/Reply buttons
      '[role="button"]',           // All buttons
      '.UFILikeLink',             // Like links
      '.UFIReplyLink',            // Reply links  
      '.UFIShareLink',            // Share links
      '[data-testid*="like"]',    // Like elements
      '[data-testid*="reply"]',   // Reply elements
      '[data-testid*="share"]',   // Share elements
      '.timestamp',               // Timestamps
      '.livetimestamp',           // Live timestamps
      '[data-utime]',             // Time elements
      'time',                     // Time tags
      '.UFICommentActions',       // Comment action bar
      '.UFICommentLikeCount',     // Like counts
      'span[role="button"]',      // Button spans
      'a[href*="/ufi/reaction"]', // Reaction links
    ];
    
    // Remove UI elements
    uiSelectors.forEach(selector => {
      const elements = clone.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });
    
    // Get text content and clean it
    let text = clone.textContent.trim();
    
    // Remove common UI text patterns
    const uiPatterns = [
      /\d+[ydhm]\s*$/,           // Time patterns like "5h", "2d", "1y"
      /Like\s*$/i,               // Trailing "Like"
      /Reply\s*$/i,              // Trailing "Reply"
      /Share\s*$/i,              // Trailing "Share"
      /\d+\s*$/,                 // Trailing numbers
      /^Like\s+/i,               // Leading "Like"
      /^Reply\s+/i,              // Leading "Reply"
      /^Share\s+/i,              // Leading "Share"
      /\s+Like\s+Reply\s*$/i,    // "Like Reply" at end
      /\s+Reply\s+Like\s*$/i,    // "Reply Like" at end
      /\s+\d+[ydhm]\s+Like\s+Reply\s*$/i, // Time + Like + Reply
    ];
    
    // Apply pattern cleaning
    uiPatterns.forEach(pattern => {
      text = text.replace(pattern, '').trim();
    });
    
    return text;
  }

  // Extract comments from Facebook post with better filtering
  function extractComments() {
    const comments = [];
    
    // Enhanced Facebook comment selectors
    const commentSelectors = [
      '[data-testid="UFI2Comment/body"]',     // Modern FB comment body
      '[data-testid="comment"]',             // Comment containers
      '.UFICommentContent',                  // Classic comment content
      '.UFICommentBody',                     // Classic comment body
      '[role="article"] div[dir="auto"]',    // Articles with text direction
      'div[data-testid*="comment"] div[dir="auto"]', // Comment divs
    ];

    let commentElements = [];
    
    // Try selectors in order of specificity
    for (const selector of commentSelectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        commentElements = Array.from(elements);
        console.log(`Found ${elements.length} comments using selector: ${selector}`);
        break;
      }
    }

    // Fallback: look for probable comment containers
    if (commentElements.length === 0) {
      const potentialComments = document.querySelectorAll('div[dir="auto"]');
      commentElements = Array.from(potentialComments).filter(el => {
        const text = el.textContent.trim();
        
        // Basic filters for comment-like content
        return text.length > 5 && text.length < 2000 &&
               !text.match(/^(Like|Reply|Share|Comment)$/i) &&
               !text.match(/^\d+[ydhm]$/) &&
               !text.match(/^[\d\s,]+$/) &&
               !el.querySelector('img') && // No images
               !el.querySelector('video'); // No videos
      });
      console.log(`Found ${commentElements.length} potential comments with fallback method`);
    }

    // Extract and clean comment data
    commentElements.forEach((element, index) => {
      try {
        const cleanText = cleanCommentText(element);
        
        // Final validation
        if (cleanText && 
            cleanText.length > 2 && 
            cleanText.length < 1500 &&
            !cleanText.match(/^(Like|Reply|Share|Comment|\d+)$/i)) {
          
          // Try to find username
          let username = 'Unknown';
          let currentElement = element;
          
          // Search up the DOM tree for username
          for (let i = 0; i < 6; i++) {
            if (!currentElement.parentElement) break;
            currentElement = currentElement.parentElement;
            
            // Look for profile links or name elements
            const nameElements = currentElement.querySelectorAll('a[role="link"] strong, a strong, strong, span[dir="auto"]');
            for (const nameEl of nameElements) {
              const nameText = nameEl.textContent.trim();
              if (nameText && 
                  nameText.length > 0 && 
                  nameText.length < 100 && 
                  !nameText.match(/\d+[ydhm]/) &&
                  !nameText.match(/^(Like|Reply|Share|Comment|\d+)$/i) &&
                  !nameText.includes('·') && 
                  !nameText.includes('...') &&
                  nameText !== cleanText) {
                username = nameText;
                break;
              }
            }
            
            if (username !== 'Unknown') break;
          }

          comments.push({
            text: cleanText,
            username: username,
            elementIndex: index
          });
        }
      } catch (error) {
        console.log('Error processing comment element:', error);
      }
    });

    // Remove duplicates based on text content
    const uniqueComments = [];
    const seenTexts = new Set();
    
    comments.forEach(comment => {
      const normalizedText = comment.text.toLowerCase().trim();
      if (!seenTexts.has(normalizedText)) {
        seenTexts.add(normalizedText);
        uniqueComments.push(comment);
      }
    });

    console.log(`Extracted ${uniqueComments.length} unique comments`);
    return uniqueComments;
  }

  // Main function to scrape comments
  async function scrapeAndAnalyze() {
    try {
      // Check if we're on a valid Facebook post URL
      if (!isValidFacebookPostUrl(window.location.href)) {
        console.log('Not on a valid Facebook post URL');
        return null;
      }

      console.log('Starting enhanced Facebook comment extraction...');
      
      // Wait for page to load properly
      await waitForElement('body', 5000);
      
      // Wait for dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Extract comments
      const comments = extractComments();
      console.log(`Successfully extracted ${comments.length} clean comments`);
      
      if (comments.length === 0) {
        return {
          role: 'facebook_post',
          url: window.location.href,
          totalComments: 0,
          sentimentDistribution: { positive: 0, negative: 0, neutral: 0 },
          comments: [],
          topPositive: [],
          topNegative: [],
          analyzedAt: new Date().toISOString(),
          error: 'No comments found on this post'
        };
      }

      // Store data for popup to access
      const analysisData = {
        comments: comments,
        url: window.location.href,
        extractedAt: new Date().toISOString()
      };

      // Send data to extension storage
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ 
          facebookAnalysisData: analysisData 
        }, () => {
          console.log('Clean analysis data stored successfully');
        });
      }

      return analysisData;
      
    } catch (error) {
      console.error('Error during enhanced scraping:', error);
      return {
        role: 'facebook_post',
        url: window.location.href,
        totalComments: 0,
        sentimentDistribution: { positive: 0, negative: 0, neutral: 0 },
        comments: [],
        topPositive: [],
        topNegative: [],
        analyzedAt: new Date().toISOString(),
        error: error.message
      };
    }
  }

  // Listen for messages from popup
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'extractComments') {
        scrapeAndAnalyze().then(result => {
          sendResponse(result);
        }).catch(error => {
          sendResponse({
            error: error.message,
            role: 'facebook_post',
            url: window.location.href
          });
        });
        return true; // Indicates we will send a response asynchronously
      }
      
      if (message.action === 'refresh') {
        // Clear any cached data first
        if (typeof chrome !== 'undefined' && chrome.storage) {
          chrome.storage.local.clear(() => {
            // Re-scrape comments fresh
            scrapeAndAnalyze().then(result => {
              sendResponse({
                ...result,
                refreshed: true,
                success: true
              });
            }).catch(error => {
              sendResponse({
                error: error.message,
                role: 'facebook_post',
                url: window.location.href,
                refreshed: false,
                success: false
              });
            });
          });
        } else {
          // Fallback if storage not available
          scrapeAndAnalyze().then(result => {
            sendResponse({
              ...result,
              refreshed: true,
              success: true
            });
          }).catch(error => {
            sendResponse({
              error: error.message,
              role: 'facebook_post',
              url: window.location.href,
              refreshed: false,
              success: false
            });
          });
        }
        return true; // Indicates we will send a response asynchronously
      }
    });
  }

  // Auto-extract comments when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(scrapeAndAnalyze, 4000);
    });
  } else {
    setTimeout(scrapeAndAnalyze, 4000);
  }

})();