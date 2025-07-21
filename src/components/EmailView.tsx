import React from 'react';
import { 
  ArrowLeft, Star, Reply, ReplyAll, Forward, Archive, Trash2,
  GitBranch, AlertTriangle, Zap, Copy, ExternalLink, Clock
} from 'lucide-react';
import { Email } from '../types/Email';

interface EmailViewProps {
  email: Email;
  onBack: () => void;
  onStarToggle: (emailId: string) => void;
}

const EmailView: React.FC<EmailViewProps> = ({ email, onBack, onStarToggle }) => {
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCategoryIcon = (category: string, source?: string) => {
    if (source === 'github') return GitBranch;
    switch (category) {
      case 'ci-cd': return Zap;
      case 'alerts': return AlertTriangle;
      default: return null;
    }
  };

  const getCategoryColor = (category: string, source?: string) => {
    if (source === 'github') return 'text-blue-600 dark:text-blue-400 black:text-blue-400 bg-blue-100 dark:bg-blue-900/30 black:bg-blue-900/30';
    switch (category) {
      case 'ci-cd': return 'text-green-600 dark:text-green-400 black:text-green-400 bg-green-100 dark:bg-green-900/30 black:bg-green-900/30';
      case 'alerts': return 'text-red-600 dark:text-red-400 black:text-red-400 bg-red-100 dark:bg-red-900/30 black:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 black:text-gray-400 bg-gray-100 dark:bg-gray-800 black:bg-gray-800';
    }
  };

  const renderEmailBody = (body: string) => {
    const parts = body.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).split('\n');
        const language = lines[0] || 'text';
        const code = lines.slice(1).join('\n');
        
        return (
          <div key={index} className="my-6 rounded-lg border border-gray-200 dark:border-gray-700 black:border-gray-700 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 black:bg-gray-900 border-b border-gray-200 dark:border-gray-700 black:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400 black:text-gray-400 ml-2">
                  {language}
                </span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 black:text-gray-400 black:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 black:hover:bg-gray-800 rounded transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto bg-white dark:bg-gray-900 black:bg-black text-gray-800 dark:text-gray-200 black:text-gray-200 leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      } else {
        const textWithInlineCode = part.split(/(`[^`]+`)/g).map((textPart, textIndex) => {
          if (textPart.startsWith('`') && textPart.endsWith('`')) {
            return (
              <code 
                key={textIndex}
                className="bg-gray-100 dark:bg-gray-800 black:bg-gray-800 text-gray-800 dark:text-gray-200 black:text-gray-200 px-2 py-1 rounded text-sm font-mono"
              >
                {textPart.slice(1, -1)}
              </code>
            );
          }
          return textPart;
        });
        
        return (
          <div key={index} className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 black:text-gray-200 leading-relaxed text-base">
            {textWithInlineCode}
          </div>
        );
      }
    });
  };

  const CategoryIcon = getCategoryIcon(email.category, email.source);
  const categoryColor = getCategoryColor(email.category, email.source);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 black:bg-black flex flex-col">
      {/* Header */}
      <div className="h-16 px-6 border-b border-gray-200 dark:border-gray-700 black:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800 black:bg-gray-900">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 black:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 black:hover:text-gray-100 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 black:hover:bg-gray-800 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inbox</span>
          <span className="text-xs text-gray-400 bg-gray-200 dark:bg-gray-700 black:bg-gray-800 px-1.5 py-0.5 rounded">ESC</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onStarToggle(email.id)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 black:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Star 
              className={`w-5 h-5 ${
                email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
              }`} 
            />
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 black:hover:bg-gray-800 rounded-lg transition-colors">
            <Archive className="w-5 h-5 text-gray-600 dark:text-gray-400 black:text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 black:hover:bg-gray-800 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400 black:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Subject and Meta */}
        <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 black:border-gray-800">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white black:text-white mb-3 leading-tight">
                {email.subject}
              </h1>
              
              {/* Category and Priority Badges */}
              <div className="flex items-center space-x-3">
                {CategoryIcon && (
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium ${categoryColor}`}>
                    <CategoryIcon className="w-4 h-4" />
                    <span className="capitalize">{email.category}</span>
                  </div>
                )}
                
                {(email.priority === 'high' || email.priority === 'urgent') && (
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium text-red-600 dark:text-red-400 black:text-red-400 bg-red-100 dark:bg-red-900/30 black:bg-red-900/30">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="capitalize">{email.priority} Priority</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sender Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-white">
                  {email.from.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white black:text-white">
                  {email.from.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 black:text-gray-400">
                  {email.from.email}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 black:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatDateTime(email.timestamp)}</span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="px-8 py-8">
          <div className="prose max-w-none">
            {renderEmailBody(email.body)}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-700 black:border-gray-800 bg-gray-50 dark:bg-gray-800 black:bg-gray-900">
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow-md">
            <Reply className="w-4 h-4" />
            <span>Reply</span>
            <span className="text-xs opacity-75 bg-blue-700 px-1.5 py-0.5 rounded">R</span>
          </button>
          <button className="bg-gray-200 dark:bg-gray-700 black:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 black:hover:bg-gray-700 text-gray-700 dark:text-gray-300 black:text-gray-300 px-6 py-2.5 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200">
            <ReplyAll className="w-4 h-4" />
            <span>Reply All</span>
          </button>
          <button className="bg-gray-200 dark:bg-gray-700 black:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 black:hover:bg-gray-700 text-gray-700 dark:text-gray-300 black:text-gray-300 px-6 py-2.5 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200">
            <Forward className="w-4 h-4" />
            <span>Forward</span>
            <span className="text-xs opacity-75 bg-gray-300 dark:bg-gray-600 black:bg-gray-700 px-1.5 py-0.5 rounded">F</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailView;