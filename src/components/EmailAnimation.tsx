import React, { useState, useEffect } from 'react';
import { 
  Mail, Send, Star, Archive, Search, Plus, 
  ChevronRight, Check, Clock, Paperclip, User
} from 'lucide-react';

interface EmailAnimationProps {
  className?: string;
}

const EmailAnimation: React.FC<EmailAnimationProps> = ({ className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    'inbox',
    'compose',
    'typing',
    'sending',
    'organizing',
    'search',
    'complete'
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const mockEmails = [
    { id: 1, from: 'Sarah Chen', subject: 'Project Update', time: '2m ago', unread: true },
    { id: 2, from: 'Team Lead', subject: 'Weekly Standup', time: '1h ago', unread: true },
    { id: 3, from: 'GitHub', subject: 'Pull Request Review', time: '3h ago', unread: false },
    { id: 4, from: 'Client', subject: 'Feedback on Design', time: '1d ago', unread: false },
  ];

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Animation Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Email Client</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="flex h-96">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 border-r border-gray-200 p-4">
            <button 
              className={`w-full mb-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentStep === 'compose' || currentStep === 'typing' || currentStep === 'sending'
                  ? 'bg-blue-600 text-white shadow-lg scale-105' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Compose
            </button>
            
            <nav className="space-y-1">
              {[
                { name: 'Inbox', count: 4, active: currentStep === 'inbox' || currentStep === 'complete' },
                { name: 'Starred', count: 2, active: currentStep === 'organizing' },
                { name: 'Sent', count: 0, active: false },
                { name: 'Archive', count: 0, active: false },
              ].map((folder) => (
                <div
                  key={folder.name}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 ${
                    folder.active 
                      ? 'bg-blue-100 text-blue-700 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium">{folder.name}</span>
                  {folder.count > 0 && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {folder.count}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className={`relative transition-all duration-500 ${
                currentStep === 'search' ? 'scale-105 shadow-lg' : ''
              }`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={currentStep === 'search' ? 'project update...' : 'Search emails...'}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    currentStep === 'search' 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-300 bg-white'
                  }`}
                  readOnly
                />
              </div>
            </div>

            {/* Email List or Compose */}
            <div className="flex-1 overflow-hidden">
              {(currentStep === 'compose' || currentStep === 'typing' || currentStep === 'sending') ? (
                // Compose View
                <div className="p-6 h-full">
                  <div className="bg-white border border-gray-200 rounded-lg h-full flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Message</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="To: sarah@company.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          readOnly
                        />
                        <input
                          type="text"
                          placeholder="Subject: Re: Project Update"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <textarea
                        placeholder={
                          currentStep === 'typing' 
                            ? "Thanks for the update! The project looks great..." 
                            : "Write your message..."
                        }
                        className="w-full h-full resize-none border-0 focus:outline-none text-gray-700"
                        readOnly
                      />
                    </div>
                    <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Attach files</span>
                      </div>
                      <button 
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                          currentStep === 'sending'
                            ? 'bg-green-600 text-white shadow-lg scale-105'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {currentStep === 'sending' ? (
                          <>
                            <Check className="w-4 h-4 inline mr-2" />
                            Sent!
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 inline mr-2" />
                            Send
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Email List View
                <div className="divide-y divide-gray-200">
                  {mockEmails.map((email, index) => (
                    <div
                      key={email.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-all duration-300 ${
                        currentStep === 'search' && index === 0 
                          ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' 
                          : ''
                      } ${
                        currentStep === 'organizing' && index === 0
                          ? 'transform translate-x-2 bg-yellow-50'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-medium ${
                                email.unread ? 'text-gray-900' : 'text-gray-600'
                              }`}>
                                {email.from}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">{email.time}</span>
                                {currentStep === 'organizing' && index === 0 && (
                                  <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
                                )}
                              </div>
                            </div>
                            <p className={`text-sm truncate ${
                              email.unread ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {email.subject}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      {email.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full absolute left-2 top-1/2 transform -translate-y-1/2" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStep 
                        ? 'bg-blue-600 scale-125' 
                        : index < currentStep 
                        ? 'bg-blue-300' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-3">
                {currentStep === 0 && 'Viewing inbox'}
                {currentStep === 1 && 'Opening compose'}
                {currentStep === 2 && 'Writing message'}
                {currentStep === 3 && 'Sending email'}
                {currentStep === 4 && 'Organizing emails'}
                {currentStep === 5 && 'Searching messages'}
                {currentStep === 6 && 'All done!'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Auto-playing demo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Send,
            title: 'Smart Compose',
            description: 'Intuitive email composition with auto-suggestions and formatting.',
            active: currentStep >= 1 && currentStep <= 3
          },
          {
            icon: Archive,
            title: 'Easy Organization',
            description: 'Effortless email management with smart folders and tagging.',
            active: currentStep === 4
          },
          {
            icon: Search,
            title: 'Instant Search',
            description: 'Find any email instantly with powerful search capabilities.',
            active: currentStep === 5
          }
        ].map((feature, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition-all duration-500 ${
              feature.active 
                ? 'border-blue-200 bg-blue-50 shadow-lg scale-105' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${
              feature.active 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <feature.icon className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailAnimation;