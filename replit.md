# FB Sentiment Analyzer

## Overview

FB Sentiment Analyzer is a Chrome browser extension that analyzes the sentiment of Facebook post comments using a local, rule-based sentiment analysis engine. The extension operates entirely client-side without external APIs, providing privacy-focused sentiment analysis for Facebook content. It features a glassmorphic dark-mode interface that displays sentiment breakdowns, comment categorization, and visual analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Extension Architecture
The application follows Chrome Extension Manifest V3 architecture with three main components:
- **Background Script (Service Worker)**: Handles extension lifecycle events, storage management, and inter-component messaging
- **Content Script**: Injected into Facebook pages to scrape comment data and interact with the DOM
- **Popup Interface**: Provides the user interface for displaying sentiment analysis results

### Sentiment Analysis Engine
The core sentiment analysis is performed by a custom rule-based analyzer that:
- Uses extensive keyword dictionaries for positive, negative, and neutral sentiment classification
- Implements context-aware analysis with phrase patterns and negation handling
- Operates entirely client-side for privacy and performance
- Supports weighted scoring based on keyword strength and context

### Data Storage Strategy
The extension uses Chrome's local storage API for:
- **Extension Settings**: User preferences for auto-analysis and notifications
- **Analysis Cache**: Storing sentiment analysis results per URL for performance
- **History Tracking**: Maintaining analysis history for user reference

### User Interface Design
The popup interface features:
- **Glassmorphic Design**: Modern dark-mode interface with glass-like transparency effects
- **Real-time Analytics**: Live sentiment breakdowns with percentage distributions
- **Comment Categorization**: Tabbed interface separating positive and negative comments
- **Visual Charts**: Progress bars and statistical displays for sentiment distribution

### Facebook Integration
The content script targets specific Facebook URL patterns:
- Post URLs, photo URLs, video URLs, and permalink structures
- Dynamic element detection using MutationObserver for Facebook's dynamic content loading
- Comment extraction with fallback selectors for various Facebook layouts

## External Dependencies

### Browser APIs
- **Chrome Extensions API**: Manifest V3 service worker, content scripts, and popup functionality
- **Chrome Storage API**: Local storage for settings and analysis data persistence
- **Chrome Runtime API**: Message passing between extension components

### Target Platform
- **Facebook.com**: Primary integration target with specific URL pattern matching
- **DOM Manipulation**: Native browser APIs for element selection and content extraction

### No External Services
The extension is designed to operate without external dependencies:
- No external sentiment analysis APIs
- No cloud storage or external databases
- No third-party analytics or tracking services
- Fully local processing for privacy compliance