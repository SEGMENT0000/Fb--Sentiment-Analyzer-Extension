# 📊 Facebook Comment Sentiment Analyzer (Browser Extension)

> A **browser extension** that analyzes the **sentiment** (Positive, Neutral, Negative) of **Facebook post comments** — **no API keys needed**, everything runs locally. 🧠⚡

**MADE BY [AYUSH](https://portfolioxayush.vercel.app)** 💻✨

---

## 🚀 Features

- 🔗 **Works directly on Facebook** – no external API calls  
- 🧠 **On-device sentiment analysis** – secure and private  
- 🕶️ **Minimal, clean UI overlay** right inside Facebook  
- 📈 **Real-time stats** for each post's comment section  
- 💻 **Cross-browser support** – Chrome, Edge, Brave, etc.  
- ⚡ **Lightweight & fast** – zero backend, zero setup  
- 🎨 **Beautiful draggable interface** with smooth animations
- 🔒 **100% Private** – no data leaves your browser

---

## 🖼️ Demo

_Coming soon: GIF or video showcasing the extension in action_

---

## 🧩 How It Works

1. Install the extension in your browser  
2. Visit **any public Facebook post**  
3. Open the comments section  
4. Our extension:
   - Scrapes visible comments  
   - Runs them through a **local sentiment model** (Positive / Neutral / Negative)  
   - Displays **live sentiment stats** as a floating overlay  

---

## ⚙️ Installation

### **Option 1: Manual (Dev Mode)**

1. **Clone the repo**
   ```bash
   git clone https://github.com/SEGMENT0000/Fb--Sentiment-Analyzer-Extension.git
   cd facebook-sentiment-extension
   ```

2. **Load in Chrome/Edge**
   - Open `chrome://extensions/` (or `edge://extensions/`)
   - Enable **"Developer mode"** (toggle in top-right)
   - Click **"Load unpacked"**
   - Select the downloaded folder

3. **Start using!**
   - Navigate to Facebook
   - The sentiment overlay will appear automatically

### **Option 2: Chrome Web Store** _(Coming Soon)_
- Extension will be available on Chrome Web Store soon!

---

## 📱 Usage

1. **Navigate to Facebook** - Visit any public post with comments
2. **Automatic Analysis** - The extension automatically detects and analyzes comments
3. **View Results** - See real-time sentiment breakdown in the floating overlay
4. **Toggle On/Off** - Use the switch to enable/disable analysis
5. **Drag to Move** - Click and drag the overlay to reposition it

---

## 🎯 Supported Browsers

- ✅ **Google Chrome** (v88+)
- ✅ **Microsoft Edge** (v88+)
- ✅ **Brave Browser** (v1.20+)
- ✅ **Opera** (v74+)
- ⏳ **Firefox** (Coming Soon)

---

## 🧠 Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Sentiment Analysis**: Custom local ML algorithm
- **UI Framework**: Pure CSS3 with animations
- **Architecture**: Chrome Extension Manifest V3

---

## 🔧 Development

### Prerequisites
- Node.js (for development tools)
- Chrome/Edge browser for testing

### Setup
```bash
# Clone repository
git clone https://github.com/SEGMENT0000/Fb--Sentiment-Analyzer-Extension.git
cd facebook-sentiment-extension

# Just load the extension directly in browser
```


---

## 🤖 How Sentiment Analysis Works

Our **local sentiment engine** uses:

- **Keyword Analysis**: Positive/negative word detection
- **Context Awareness**: Considers negations and intensifiers  
- **Emoji Recognition**: Analyzes emotional expressions
- **Confidence Scoring**: Provides accuracy estimates
- **Real-time Processing**: Instant analysis as you scroll

**No external APIs** - everything processes locally for maximum privacy!

---

## 📊 Privacy & Security

- 🔒 **100% Local Processing** - No data sent to external servers
- 🛡️ **Zero Data Collection** - We don't store or track anything
- 🔐 **Secure by Design** - Works entirely within your browser
- 📱 **No Permissions Abuse** - Only accesses Facebook pages you visit

---

## 🐛 Known Issues & Limitations

- Works best on **English comments** (multi-language support coming)
- Facebook's dynamic loading may require page refresh occasionally
- Some complex sarcasm might be misclassified

---


## 👨‍💻 About the Developer

**MADE BY [AYUSH](https://portfolioxayush.vercel.app)**

- 🚀 Passionate Full-Stack Developer
- 🤖 AI/ML Enthusiast  
- 🌐 Browser Extension Specialist
- 💻 Open Source Contributor

**Connect with AYUSH:**
- 🌐 Portfolio: [portfolioxayush.vercel.app](https://portfolioxayush.vercel.app)
- 📧 Email: Available on portfolio
- 💼 LinkedIn: Available on portfolio