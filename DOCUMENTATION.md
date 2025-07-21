# 🦀 xmail.dev - Developer Email Client

**The fastest, most secure email client built specifically for developers**

![Version](https://img.shields.io/badge/version-2.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Rust Inspired](https://img.shields.io/badge/inspired%20by-Rust%20%26%20Zed-orange)

---

## 🚀 **Overview**

xmail.dev is a **Rust-inspired, Zed-style** email client designed for developers who demand speed, security, and efficiency. Built with modern web technologies and featuring a **developer-first black theme** with orange/amber accents that scream performance.

### **🎯 Core Philosophy**
- **⚡ Blazing Fast** - Instant search, zero-lag interactions
- **🔒 Security First** - Zero tracking, local AI processing
- **🛠️ Developer Focused** - Code highlighting, GitHub integration, CI/CD monitoring
- **🎨 Minimal Design** - Clean, distraction-free interface inspired by Rust/Zed

---

## ✨ **Features**

### **🎨 Theme System**
- **Light Mode** - Clean, professional interface
- **Dark Mode** - Easy on the eyes for long coding sessions  
- **Black Mode (Dev Mode)** - Rust-inspired with orange/amber accents

### **🔍 Advanced Search & Filtering**
- **Smart Search** with AI enhancement
- **Quick Filters**: `has:code`, `is:starred`, `priority:high`, `date:today`
- **Saved Searches** with custom filters
- **Real-time Search** with instant results
- **Regex Support** for power users

### **🤖 AI-Powered Features**
- **Local AI Processing** - No data leaves your device
- **Smart Email Categorization** - Auto-sorts GitHub, CI/CD, alerts
- **Priority Detection** - Automatically identifies urgent emails
- **Code Block Detection** - Highlights and formats code snippets
- **Smart Reply Generation** - Context-aware response suggestions
- **Email Summarization** - Quick insights and action items

### **👨‍💻 Developer-Specific Features**

#### **GitHub Integration**
- Pull request notifications
- Code review requests
- Issue updates
- Repository activity

#### **CI/CD Monitoring**
- Build status notifications
- Deployment updates
- Test results
- Pipeline failures

#### **Error Tracking**
- Sentry alerts
- Error notifications
- Performance monitoring
- Security alerts

#### **Code Handling**
- **Syntax Highlighting** for 20+ languages
- **Code Block Extraction** with copy functionality
- **Diff Viewing** for code changes
- **Line Numbers** and file references

### **⌨️ Keyboard Shortcuts**
```
Navigation:
j/k         - Next/Previous email
Enter       - Open email
Escape      - Go back
g+i         - Go to inbox
g+s         - Go to starred

Actions:
c           - Compose email
r           - Reply
a           - Reply all
f           - Forward
s           - Star/unstar
e           - Archive
Delete      - Delete email

Search:
⌘+k         - Quick search
⌘+f         - Advanced filters
/           - Focus search

Developer:
x           - Toggle AI assistant
d           - Toggle dev tools
⌘+t         - Cycle themes
?           - Show shortcuts
```

### **🔐 Security & Privacy**
- **Zero Tracking** - No analytics or telemetry
- **Local Storage** - Emails stored on your device
- **End-to-End Encryption** - Military-grade security
- **No External Dependencies** - AI processing happens locally
- **Open Source** - Fully auditable codebase

---

## 🏗️ **Architecture**

### **Tech Stack**
```
Frontend:     React 18 + TypeScript
Styling:      Tailwind CSS with custom Rust-inspired theme
Icons:        Lucide React
Build:        Vite
State:        React Hooks + Context
AI:           Local processing (no external APIs)
```

### **Project Structure**
```
src/
├── components/           # React components
│   ├── LandingPage.tsx  # Marketing landing page
│   ├── TopBar.tsx       # Header with search and actions
│   ├── Sidebar.tsx      # Navigation and folders
│   ├── EmailList.tsx    # Email list view
│   ├── EmailView.tsx    # Single email view
│   ├── ComposeModal.tsx # Email composition
│   ├── AIAssistant.tsx  # AI-powered features
│   ├── DevToolsIntegration.tsx # Developer notifications
│   ├── AdvancedSearch.tsx # Search and filtering
│   └── KeyboardShortcuts.tsx # Shortcut help
├── hooks/               # Custom React hooks
│   ├── useAI.ts        # AI processing logic
│   ├── useTheme.ts     # Theme management
│   └── useKeyboardShortcuts.ts # Keyboard handling
├── types/              # TypeScript definitions
│   ├── Email.ts        # Email data structures
│   └── DevNotification.ts # Developer notifications
├── data/               # Mock data and examples
│   ├── mockEmails.ts   # Sample emails
│   └── mockDevNotifications.ts # Sample notifications
└── App.tsx             # Main application component
```

### **Component Architecture**

#### **App.tsx** - Main Application
- State management for emails, folders, search
- Keyboard shortcut handling
- Theme management
- AI integration

#### **TopBar.tsx** - Header Component
- Advanced search interface
- Theme switching
- AI and dev tools toggles
- Settings access

#### **Sidebar.tsx** - Navigation
- Folder management (Inbox, Starred, Sent, etc.)
- Developer-specific folders (GitHub, CI/CD, Alerts)
- Compose button
- Unread counts

#### **EmailList.tsx** - Email List View
- Virtualized email list for performance
- Smart categorization badges
- Priority indicators
- Code detection badges
- Time formatting

#### **EmailView.tsx** - Single Email View
- Code syntax highlighting
- Copy code functionality
- Reply/forward actions
- Attachment handling

#### **AIAssistant.tsx** - AI Features
- Email analysis and insights
- Smart reply suggestions
- Action recommendations
- Priority assessment

---

## 🎨 **Design System**

### **Rust-Inspired Black Theme**
```css
Colors:
- Background: Pure Black (#000000)
- Cards: Gray-875 (#171717), Gray-850 (#1a1a1a)
- Primary: Orange-500 (#f97316)
- Secondary: Amber-500 (#f59e0b)
- Text: Orange-400, Orange-300, Gray-100
- Borders: Gray-850, Gray-800

Typography:
- Primary: JetBrains Mono (monospace)
- Secondary: Inter (sans-serif)
- Code: JetBrains Mono with syntax highlighting

Animations:
- Glow effects on active elements
- Smooth transitions (200ms)
- Subtle hover states
- Orange accent animations
```

### **Visual Hierarchy**
1. **Orange/Amber** - Primary actions, active states, important elements
2. **White/Gray-100** - Primary text content
3. **Gray-400/500** - Secondary text, metadata
4. **Gray-600** - Tertiary text, placeholders
5. **Red** - Errors, alerts, urgent items

### **Component Patterns**
- **Cards** - Subtle gray backgrounds with rounded corners
- **Buttons** - Orange gradients with hover effects
- **Badges** - Rounded pills with category colors
- **Icons** - Consistent 16px/20px sizing
- **Spacing** - 8px grid system

---

## 🚀 **Performance**

### **Optimization Strategies**
- **Virtual Scrolling** - Handle thousands of emails
- **Lazy Loading** - Load content as needed
- **Memoization** - Prevent unnecessary re-renders
- **Code Splitting** - Reduce initial bundle size
- **Local Caching** - Store frequently accessed data

### **Benchmarks**
- **Initial Load**: < 2 seconds
- **Search Response**: < 100ms
- **Email Open**: < 50ms
- **Theme Switch**: < 200ms
- **Memory Usage**: < 50MB

---

## 🔧 **Development**

### **Getting Started**
```bash
# Clone the repository
git clone https://github.com/your-org/xmail-dev

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

### **Environment Setup**
```bash
# Required Node.js version
node >= 18.0.0

# Recommended VS Code extensions
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
```

### **Development Workflow**
1. **Feature Development** - Create feature branches
2. **Code Review** - All changes require review
3. **Testing** - Unit tests for all components
4. **Documentation** - Update docs for new features
5. **Performance** - Monitor bundle size and performance

---

## 🧪 **Testing**

### **Test Coverage**
- **Unit Tests** - All components and hooks
- **Integration Tests** - User workflows
- **E2E Tests** - Critical user paths
- **Performance Tests** - Load and stress testing
- **Accessibility Tests** - WCAG compliance

### **Testing Stack**
```
Unit Testing:     Vitest + React Testing Library
E2E Testing:      Playwright
Performance:      Lighthouse CI
Accessibility:    axe-core
```

---

## 📦 **Deployment**

### **Build Process**
```bash
# Production build
npm run build

# Preview build
npm run preview

# Analyze bundle
npm run analyze
```

### **Deployment Targets**
- **Static Hosting** - Vercel, Netlify, GitHub Pages
- **CDN** - CloudFlare, AWS CloudFront
- **Self-Hosted** - Docker containers, VPS

---

## 🔒 **Security**

### **Security Measures**
- **Content Security Policy** - Prevent XSS attacks
- **Subresource Integrity** - Verify external resources
- **HTTPS Only** - Encrypted connections
- **Local Storage** - No cloud dependencies
- **Input Sanitization** - Prevent injection attacks

### **Privacy Features**
- **No Tracking** - Zero analytics or telemetry
- **Local AI** - All processing happens on device
- **Encrypted Storage** - Local data encryption
- **No External APIs** - Complete data sovereignty

---

## 🤝 **Contributing**

### **Contribution Guidelines**
1. **Fork** the repository
2. **Create** a feature branch
3. **Write** tests for new features
4. **Follow** the coding standards
5. **Submit** a pull request

### **Code Standards**
- **TypeScript** - Strict mode enabled
- **ESLint** - Airbnb configuration
- **Prettier** - Consistent formatting
- **Conventional Commits** - Semantic commit messages

---

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Rust Language** - Inspiration for performance and safety
- **Zed Editor** - UI/UX design inspiration
- **React Team** - Amazing framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library

---

## 📞 **Support**

- **Documentation**: [docs.xmail.dev](https://docs.xmail.dev)
- **Issues**: [GitHub Issues](https://github.com/your-org/xmail-dev/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/xmail-dev/discussions)
- **Email**: support@xmail.dev

---

**Built with ❤️ for developers, by developers.**

*Fast. Secure. Beautiful. Developer-focused.*