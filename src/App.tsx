import React, { useState, useMemo } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import ComposeModal from './components/ComposeModal';
import AIAssistant from './components/AIAssistant';
import DevToolsIntegration from './components/DevToolsIntegration';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import { mockEmails } from './data/mockEmails';
import { mockDevNotifications } from './data/mockDevNotifications';
import { Email } from './types/Email';
import { DevNotification } from './types/DevNotification';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useAI } from './hooks/useAI';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<Record<string, any>>({});
  const [isAIVisible, setIsAIVisible] = useState(false);
  const [isDevToolsVisible, setIsDevToolsVisible] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [savedSearches, setSavedSearches] = useState<Array<{ name: string; query: string; filters: Record<string, any> }>>([]);
  const [devNotifications] = useState<DevNotification[]>(mockDevNotifications);

  const { categorizeEmail, detectPriority } = useAI();

  // Define all functions before using them in hooks
  const handleRefresh = () => {
    console.log('Refreshing emails...');
  };

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmail(emailId);
    setIsAIVisible(true); // Auto-show AI when opening email
    
    // Mark as read
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, isRead: true } : email
      )
    );
  };

  const handleStarToggle = (emailId: string) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
      )
    );
  };

  const handleSendEmail = (emailData: any) => {
    const newEmail: Email = {
      id: Date.now().toString(),
      from: { name: 'You', email: 'you@email.com' },
      to: [{ name: 'Recipient', email: emailData.to }],
      subject: emailData.subject,
      body: emailData.body,
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
      hasAttachments: false,
      priority: 'normal',
      category: 'primary',
      labels: []
    };
    
    setEmails(prevEmails => [newEmail, ...prevEmails]);
  };

  const handleSearch = (query: string, filters: Record<string, any> = {}) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  const handleSaveSearch = (name: string, query: string, filters: Record<string, any>) => {
    setSavedSearches(prev => [...prev, { name, query, filters }]);
  };

  const handleDevNotificationClick = (notification: DevNotification) => {
    if (notification.url) {
      window.open(notification.url, '_blank');
    }
  };

  // Filter emails with AI enhancement and advanced search
  const filteredEmails = useMemo(() => {
    let filtered = emails;

    // Auto-categorize emails with AI
    filtered = filtered.map(email => ({
      ...email,
      category: categorizeEmail(email) as any,
      priority: detectPriority(email)
    }));

    // Filter by folder
    switch (selectedFolder) {
      case 'starred':
        filtered = filtered.filter(email => email.isStarred);
        break;
      case 'github':
        filtered = filtered.filter(email => email.category === 'github' || email.source === 'github');
        break;
      case 'ci-cd':
        filtered = filtered.filter(email => email.category === 'ci-cd');
        break;
      case 'alerts':
        filtered = filtered.filter(email => email.category === 'alerts');
        break;
      case 'code-reviews':
        filtered = filtered.filter(email => email.labels.includes('code-review'));
        break;
    }

    // Apply advanced search filters
    if (searchFilters.from) {
      filtered = filtered.filter(email => 
        email.from.email.toLowerCase().includes(searchFilters.from.toLowerCase())
      );
    }
    if (searchFilters.category) {
      filtered = filtered.filter(email => email.category === searchFilters.category);
    }
    if (searchFilters.priority) {
      filtered = filtered.filter(email => email.priority === searchFilters.priority);
    }
    if (searchFilters.hasCode) {
      filtered = filtered.filter(email => /```[\s\S]*?```|`[^`]+`/.test(email.body));
    }
    if (searchFilters.isStarred) {
      filtered = filtered.filter(email => email.isStarred);
    }
    if (searchFilters.isUnread) {
      filtered = filtered.filter(email => !email.isRead);
    }
    if (searchFilters.repository) {
      filtered = filtered.filter(email => 
        email.body.toLowerCase().includes(searchFilters.repository.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchFilters.repository.toLowerCase())
      );
    }

    // Apply text search with AI enhancement
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(email => {
        const searchableText = `${email.subject} ${email.from.name} ${email.body}`.toLowerCase();
        
        // Handle smart filters
        if (query.includes('has:code')) {
          return /```[\s\S]*?```|`[^`]+`/.test(email.body);
        }
        if (query.includes('is:starred')) {
          return email.isStarred;
        }
        if (query.includes('priority:high')) {
          return email.priority === 'high' || email.priority === 'urgent';
        }
        if (query.includes('category:')) {
          const category = query.match(/category:(\w+)/)?.[1];
          return category && email.category === category;
        }
        
        return searchableText.includes(query.replace(/\w+:\w+/g, '').trim());
      });
    }

    return filtered.sort((a, b) => {
      // AI-powered sorting: urgent first, then by time
      const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 2;
      const bPriority = priorityOrder[b.priority] || 2;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [emails, selectedFolder, searchQuery, searchFilters, categorizeEmail, detectPriority]);

  const selectNextEmail = () => {
    if (!selectedEmail && filteredEmails.length > 0) {
      setSelectedEmail(filteredEmails[0].id);
      return;
    }
    
    const currentIndex = filteredEmails.findIndex(email => email.id === selectedEmail);
    if (currentIndex < filteredEmails.length - 1) {
      setSelectedEmail(filteredEmails[currentIndex + 1].id);
    }
  };

  const selectPreviousEmail = () => {
    if (!selectedEmail && filteredEmails.length > 0) {
      setSelectedEmail(filteredEmails[0].id);
      return;
    }
    
    const currentIndex = filteredEmails.findIndex(email => email.id === selectedEmail);
    if (currentIndex > 0) {
      setSelectedEmail(filteredEmails[currentIndex - 1].id);
    }
  };

  const toggleStar = () => {
    if (selectedEmail) {
      handleStarToggle(selectedEmail);
    }
  };

  const openSelectedEmail = () => {
    if (!selectedEmail && filteredEmails.length > 0) {
      handleEmailSelect(filteredEmails[0].id);
    }
  };

  // Enhanced keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'c', action: () => setIsComposeOpen(true), description: 'Compose' },
    { key: 'r', action: () => handleRefresh(), description: 'Refresh' },
    { key: 'Escape', action: () => setSelectedEmail(null), description: 'Back' },
    { key: 'j', action: () => selectNextEmail(), description: 'Next' },
    { key: 'k', action: () => selectPreviousEmail(), description: 'Previous' },
    { key: 's', action: () => toggleStar(), description: 'Star' },
    { key: 'Enter', action: () => openSelectedEmail(), description: 'Open' },
    { key: 'a', action: () => setIsAIVisible(!isAIVisible), description: 'Toggle AI' },
    { key: 'd', action: () => setIsDevToolsVisible(!isDevToolsVisible), description: 'Toggle Dev Tools' },
    { key: '?', action: () => setShowKeyboardShortcuts(true), description: 'Show Shortcuts' },
  ]);

  const unreadCount = emails.filter(email => !email.isRead).length;
  const currentEmail = selectedEmail ? emails.find(email => email.id === selectedEmail) : null;

  // Show landing page first
  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-900 black:bg-black flex">
      {/* Main App */}
      <div className="flex-1 flex flex-col">
        <TopBar 
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          searchQuery={searchQuery}
          onToggleAI={() => setIsAIVisible(!isAIVisible)}
          isAIVisible={isAIVisible}
          onToggleDevTools={() => setIsDevToolsVisible(!isDevToolsVisible)}
          isDevToolsVisible={isDevToolsVisible}
          savedSearches={savedSearches}
          onSaveSearch={handleSaveSearch}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar
            selectedFolder={selectedFolder}
            onFolderChange={setSelectedFolder}
            onComposeClick={() => setIsComposeOpen(true)}
            unreadCount={unreadCount}
          />
          
          <div className="flex-1 flex">
            {!selectedEmail ? (
              <EmailList
                emails={filteredEmails}
                selectedEmail={selectedEmail}
                onEmailSelect={handleEmailSelect}
                onStarToggle={handleStarToggle}
              />
            ) : currentEmail ? (
              <EmailView
                email={currentEmail}
                onBack={() => setSelectedEmail(null)}
                onStarToggle={handleStarToggle}
              />
            ) : null}
          </div>

          {/* AI Assistant Panel */}
          <AIAssistant
            email={currentEmail}
            isVisible={isAIVisible}
            onClose={() => setIsAIVisible(false)}
            mode="analyze"
          />

          {/* Dev Tools Integration Panel */}
          {isDevToolsVisible && (
            <DevToolsIntegration
              notifications={devNotifications}
              onNotificationClick={handleDevNotificationClick}
            />
          )}
        </div>
      </div>
      
      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendEmail}
      />

      <KeyboardShortcuts
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
    </div>
  );
}

export default App;