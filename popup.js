// FB Sentiment Analyzer Popup JavaScript
(function() {
  'use strict';

  let sentimentAnalyzer;
  let currentAnalysisData = null;

  // DOM Elements
  const elements = {
    loadingContainer: document.getElementById('loadingContainer'),
    errorContainer: document.getElementById('errorContainer'),
    mainContent: document.getElementById('mainContent'),
    errorText: document.getElementById('errorText'),
    retryButton: document.getElementById('retryButton'),
    totalComments: document.getElementById('totalComments'),
    overallSentiment: document.getElementById('overallSentiment'),
    positivePercentage: document.getElementById('positivePercentage'),
    negativePercentage: document.getElementById('negativePercentage'),
    neutralPercentage: document.getElementById('neutralPercentage'),
    positiveBar: document.getElementById('positiveBar'),
    negativeBar: document.getElementById('negativeBar'),
    neutralBar: document.getElementById('neutralBar'),
    positiveTab: document.getElementById('positiveTab'),
    negativeTab: document.getElementById('negativeTab'),
    positiveComments: document.getElementById('positiveComments'),
    negativeComments: document.getElementById('negativeComments'),
    noPositiveComments: document.getElementById('noPositiveComments'),
    noNegativeComments: document.getElementById('noNegativeComments'),
    sentimentChart: document.getElementById('sentimentChart'),
    creditLink: document.getElementById('creditLink')
  };

  // Initialize the popup
  function init() {
    sentimentAnalyzer = new SentimentAnalyzer();
    setupEventListeners();
    loadAnalysisData();
  }

  // Setup event listeners
  function setupEventListeners() {
    // Tab switching
    elements.positiveTab.addEventListener('click', () => switchTab('positive'));
    elements.negativeTab.addEventListener('click', () => switchTab('negative'));
    
    // Retry button
    elements.retryButton.addEventListener('click', loadAnalysisData);
    
    // Refresh button
    const refreshButton = document.getElementById('refreshButton');
    if (refreshButton) {
      refreshButton.addEventListener('click', handleRefresh);
    }
    
    // Credit link
    elements.creditLink.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://portfolioxayush.vercel.app' });
    });
  }

  // Switch between positive and negative comment tabs
  function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tabName === 'positive') {
      elements.positiveTab.classList.add('active');
      elements.positiveComments.classList.add('active');
    } else {
      elements.negativeTab.classList.add('active');
      elements.negativeComments.classList.add('active');
    }
  }

  // Load and analyze comments
  async function loadAnalysisData() {
    showLoading();
    
    try {
      // First, try to get cached data from storage
      const result = await new Promise((resolve) => {
        chrome.storage.local.get(['facebookAnalysisData'], resolve);
      });
      
      if (result.facebookAnalysisData) {
        // Use cached data and analyze it
        const rawData = result.facebookAnalysisData;
        const analysisData = sentimentAnalyzer.analyzeComments(
          rawData.comments,
          rawData.url
        );
        
        displayAnalysisResults(analysisData);
        return;
      }
      
      // If no cached data, try to extract fresh data from active tab
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!activeTab || !isValidFacebookUrl(activeTab.url)) {
        showError('Please navigate to a Facebook post to analyze comments');
        return;
      }
      
      // Send message to content script to extract comments
      chrome.tabs.sendMessage(activeTab.id, { action: 'extractComments' }, (response) => {
        if (chrome.runtime.lastError) {
          showError('Unable to access page content. Please refresh the Facebook page and try again.');
          return;
        }
        
        if (response && response.error) {
          showError(response.error);
          return;
        }
        
        if (response && response.comments) {
          const analysisData = sentimentAnalyzer.analyzeComments(
            response.comments,
            response.url
          );
          displayAnalysisResults(analysisData);
        } else {
          showError('No comments found on this page');
        }
      });
      
    } catch (error) {
      console.error('Error loading analysis data:', error);
      showError('An error occurred while analyzing comments');
    }
  }

  // Check if URL is a valid Facebook post URL
  function isValidFacebookUrl(url) {
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

  // Display analysis results
  function displayAnalysisResults(data) {
    currentAnalysisData = data;
    
    // Update stats overview
    elements.totalComments.textContent = data.totalComments;
    elements.overallSentiment.textContent = getOverallSentiment(data.sentimentDistribution);
    
    // Update sentiment percentages and bars
    updateSentimentBars(data.sentimentDistribution);
    
    // Update charts
    updateSentimentChart(data.sentimentDistribution);
    
    // Update comment highlights
    updateCommentHighlights(data.topPositive, data.topNegative);
    
    showMainContent();
  }

  // Get overall sentiment based on distribution
  function getOverallSentiment(distribution) {
    const { positive, negative, neutral } = distribution;
    
    if (positive > negative && positive > neutral) {
      return 'POS';
    } else if (negative > positive && negative > neutral) {
      return 'NEG';
    } else {
      return 'NEU';
    }
  }

  // Update sentiment bars with animation
  function updateSentimentBars(distribution) {
    const { positive, negative, neutral } = distribution;
    
    // Update percentages
    elements.positivePercentage.textContent = `${positive}%`;
    elements.negativePercentage.textContent = `${negative}%`;
    elements.neutralPercentage.textContent = `${neutral}%`;
    
    // Animate bars
    setTimeout(() => {
      elements.positiveBar.style.width = `${positive}%`;
      elements.negativeBar.style.width = `${negative}%`;
      elements.neutralBar.style.width = `${neutral}%`;
    }, 300);
  }

  // Update sentiment chart (simple bar chart)
  function updateSentimentChart(distribution) {
    const canvas = elements.sentimentChart;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const { positive, negative, neutral } = distribution;
    const maxValue = Math.max(positive, negative, neutral, 1);
    
    const barWidth = 60;
    const barSpacing = 30;
    const chartHeight = 100;
    const startX = (canvas.width - (barWidth * 3 + barSpacing * 2)) / 2;
    const startY = canvas.height - 30;
    
    // Draw bars with animation effect
    setTimeout(() => drawAnimatedBar(ctx, startX, startY, barWidth, (positive / maxValue) * chartHeight, '#4ade80'), 100);
    setTimeout(() => drawAnimatedBar(ctx, startX + barWidth + barSpacing, startY, barWidth, (neutral / maxValue) * chartHeight, '#94a3b8'), 200);
    setTimeout(() => drawAnimatedBar(ctx, startX + (barWidth + barSpacing) * 2, startY, barWidth, (negative / maxValue) * chartHeight, '#f87171'), 300);
    
    // Draw labels
    ctx.fillStyle = '#b0b0b0';
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('Positive', startX + barWidth / 2, startY + 15);
    ctx.fillText('Neutral', startX + barWidth + barSpacing + barWidth / 2, startY + 15);
    ctx.fillText('Negative', startX + (barWidth + barSpacing) * 2 + barWidth / 2, startY + 15);
  }

  // Draw animated bar
  function drawAnimatedBar(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y - height, width, height);
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fillRect(x, y - height, width, height);
    ctx.shadowBlur = 0;
  }

  // Update comment highlights
  function updateCommentHighlights(positiveComments, negativeComments) {
    // Clear existing comments
    elements.positiveComments.innerHTML = '';
    elements.negativeComments.innerHTML = '';
    
    // Add positive comments
    if (positiveComments && positiveComments.length > 0) {
      positiveComments.forEach(comment => {
        const commentCard = createCommentCard(comment, 'positive');
        elements.positiveComments.appendChild(commentCard);
      });
    } else {
      elements.positiveComments.appendChild(elements.noPositiveComments);
    }
    
    // Add negative comments
    if (negativeComments && negativeComments.length > 0) {
      negativeComments.forEach(comment => {
        const commentCard = createCommentCard(comment, 'negative');
        elements.negativeComments.appendChild(commentCard);
      });
    } else {
      elements.negativeComments.appendChild(elements.noNegativeComments);
    }
  }

  // Create comment card element
  function createCommentCard(comment, sentiment) {
    const card = document.createElement('div');
    card.className = `comment-card ${sentiment}`;
    
    const header = document.createElement('div');
    header.className = 'comment-header';
    
    const username = document.createElement('div');
    username.className = 'comment-username';
    username.textContent = comment.username || 'Unknown';
    
    const score = document.createElement('div');
    score.className = `comment-score ${sentiment}`;
    score.textContent = comment.score.toFixed(2);
    
    header.appendChild(username);
    header.appendChild(score);
    
    const text = document.createElement('div');
    text.className = 'comment-text';
    text.textContent = comment.text;
    
    card.appendChild(header);
    card.appendChild(text);
    
    return card;
  }

  // Show loading state
  function showLoading() {
    elements.loadingContainer.style.display = 'flex';
    elements.errorContainer.style.display = 'none';
    elements.mainContent.style.display = 'none';
  }

  // Show error state
  function showError(message) {
    elements.errorText.textContent = message;
    elements.loadingContainer.style.display = 'none';
    elements.errorContainer.style.display = 'flex';
    elements.mainContent.style.display = 'none';
  }

  // Show main content
  function showMainContent() {
    elements.loadingContainer.style.display = 'none';
    elements.errorContainer.style.display = 'none';
    elements.mainContent.style.display = 'block';
  }

  // Handle refresh button click
  function handleRefresh() {
    const refreshButton = document.getElementById('refreshButton');
    if (!refreshButton) return;
    
    // Add loading state to refresh button
    const originalHTML = refreshButton.innerHTML;
    refreshButton.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1.2s linear infinite;">
        <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 3v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 21v-5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    refreshButton.disabled = true;
    
    // Clear cached data and trigger fresh analysis
    chrome.storage.local.clear(() => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && isValidFacebookUrl(tabs[0].url)) {
          // Send refresh message to content script
          chrome.tabs.sendMessage(tabs[0].id, {action: 'refresh'}, () => {
            // Reset button state and reload data
            setTimeout(() => {
              refreshButton.innerHTML = originalHTML;
              refreshButton.disabled = false;
              loadAnalysisData();
            }, 1500);
          });
        } else {
          // Reset button state
          setTimeout(() => {
            refreshButton.innerHTML = originalHTML;
            refreshButton.disabled = false;
            loadAnalysisData();
          }, 1500);
        }
      });
    });
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();