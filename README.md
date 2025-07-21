# ⚡ XMail - Developer Email Client

A fast, secure email client built specifically for developers with AI assistance, multiple themes, and seamless integration with development workflows. Demo : https://sensational-capybara-249aa3.netlify.app/

<img width="1636" height="714" alt="image" src="https://github.com/user-attachments/assets/4d1dade7-9a69-4f94-a59e-9e84c8de3245" />

![Version](https://img.shields.io/badge/version-2.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)

## ✨ Features

### 🎨 **Multi-Theme Support**
- **Light Mode** - Clean, professional interface
- **Dark Mode** - Easy on the eyes for long coding sessions  
- **Techy Green** - Terminal-inspired developer theme
- **Night Sky** - Unique dark blue aesthetic

### 🤖 **AI-Powered Intelligence**
- **Local AI Processing** - Zero data leaves your device
- **Smart Categorization** - Auto-sorts GitHub, CI/CD, alerts
- **Priority Detection** - Identifies urgent emails automatically
- **Code Block Detection** - Highlights and formats code snippets
- **Smart Reply Generation** - Context-aware response suggestions

### 👨‍💻 **Developer-Focused Features**
- **GitHub Integration** - PR notifications, code reviews, issues
- **CI/CD Monitoring** - Build status, deployment updates, test results
- **Syntax Highlighting** - Support for 20+ programming languages
- **Code Copy** - One-click code extraction from emails
- **Repository Filtering** - Filter by specific repos and projects

### 🔍 **Advanced Search**
- **Smart Filters** - `has:code`, `is:starred`, `priority:high`, `date:today`
- **Saved Searches** - Custom filter combinations
- **Real-time Results** - Instant search feedback
- **Regex Support** - Power user pattern matching

### ⌨️ **Keyboard Navigation**
```
Navigation:     j/k • enter • escape
Actions:        c • r/a/f • s • e
Search:         ⌘+k • ⌘+f • /
Developer:      x • d • ⌘+t • ?
```

### 🔐 **Security & Privacy**
- **Zero Tracking** - No analytics or telemetry
- **Local Storage** - Emails stored on your device
- **No External APIs** - Complete data sovereignty
- **Open Source** - Fully auditable codebase

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/xmail.git
cd xmail

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom theme system
- **Icons**: Lucide React
- **Build**: Vite
- **State**: React Hooks + Context

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx  # Marketing page
│   ├── TopBar.tsx       # Header with search
│   ├── Sidebar.tsx      # Navigation
│   ├── EmailList.tsx    # Email list view
│   ├── EmailView.tsx    # Single email view
│   ├── AIAssistant.tsx  # AI features
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useAI.ts         # AI functionality
│   ├── useTheme.ts      # Theme management
│   └── useKeyboardShortcuts.ts
├── types/               # TypeScript definitions
├── data/                # Mock data
└── App.tsx              # Main application
```

## 🎯 Key Components

### AI Assistant
- **Insights** - Analyze email content with confidence scores
- **Actions** - Suggested next steps based on email type
- **Replies** - Generate contextual responses

### Smart Categories
- **GitHub** - Pull requests, code reviews, releases
- **CI/CD** - Build notifications, deployments, test results
- **Alerts** - Error tracking, monitoring, security alerts
- **Primary** - Regular emails with intelligent sorting

### Developer Tools
- Real-time developer notifications
- Repository-specific filtering
- Code syntax highlighting
- Quick actions for common dev workflows

## ⚙️ Configuration

### Theme Switching
Cycle through themes with `⌘+T` or use the theme selector in the top bar.

### Keyboard Shortcuts
Press `?` to view all available keyboard shortcuts.

### Search Filters
Use smart filters to quickly find emails:
- `has:code` - Emails containing code blocks
- `is:starred` - Starred emails only  
- `priority:high` - High priority emails
- `category:github` - GitHub notifications
- `date:today` - Today's emails

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern developer tools like Zed and Rust's performance philosophy
- Built with ❤️ for developers, by developers

---

**Fast. Secure. Beautiful. Developer-focused.**

*The email client that understands your code.*
