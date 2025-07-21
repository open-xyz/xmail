import React from 'react';
import { Star, Paperclip, GitBranch, AlertTriangle, Zap, Code, Clock } from 'lucide-react';
import { Email } from '../types/Email';

interface EmailListProps {
  emails: Email[];
  selectedEmail: string | null;
  onEmailSelect: (emailId: string) => void;
  onStarToggle: (emailId: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ 
  emails, 
  selectedEmail, 
  onEmailSelect, 
  onStarToggle 
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getCategoryIcon = (category: string, source?: string) => {
    if (source === 'github') return GitBranch;
    switch (category) {
      case 'ci-cd': return Zap;
      case 'alerts': return AlertTriangle;
      default: return null;
    }
  };

  const hasCodeContent = (body: string) => {
    return /```[\s\S]*?```|`[^`]+`/.test(body);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'normal': return 'text-accent-1';
      case 'low': return 'text-text-muted';
      default: return 'text-accent-1';
    }
  };

  return (
    <div className="flex-1 bg-bg-0">
      {/* Header */}
      <div className="h-12 px-4 border-b border-bg-2 flex items-center justify-between bg-bg-1">
        <div className="flex items-center space-x-2">
          <h2 className="text-sm font-semibold text-text font-mono">
            Inbox
          </h2>
          <span className="text-xs text-text-muted bg-bg-2 px-2 py-0.5 rounded-full font-mono">
            {emails.length}
          </span>
        </div>
        <div className="text-xs text-text-muted font-mono">
          j/k • enter • s
        </div>
      </div>

      {/* Email List */}
      <div className="divide-y divide-bg-2">
        {emails.map((email, index) => {
          const CategoryIcon = getCategoryIcon(email.category, email.source);
          const hasCode = hasCodeContent(email.body);
          const isSelected = selectedEmail === email.id;
          const isUnread = !email.isRead;
          const priorityColor = getPriorityColor(email.priority);
          
          return (
            <div
              key={email.id}
              onClick={() => onEmailSelect(email.id)}
              className={`group px-4 py-3 hover:bg-bg-1 cursor-pointer transition-all duration-150 border-l-3 ${
                isSelected 
                  ? 'bg-bg-1 border-l-accent-1 shadow-sm' 
                  : email.priority === 'high' || email.priority === 'urgent'
                    ? 'border-l-red-400' 
                    : isUnread
                    ? 'border-l-accent-1'
                    : 'border-l-transparent'
              } ${isUnread ? 'bg-accent-1/5' : ''}`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-mono ${
                  isUnread 
                    ? 'bg-accent-1 text-white shadow-sm' 
                    : 'bg-bg-2 text-text-secondary'
                }`}>
                  <span className="text-xs font-bold">
                    {email.from.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium font-mono ${
                        isUnread 
                          ? 'text-text' 
                          : 'text-text-secondary'
                      }`}>
                        {email.from.name}
                      </span>
                      
                      {/* Compact Badges */}
                      <div className="flex items-center space-x-1">
                        {CategoryIcon && (
                          <div className="flex items-center px-1.5 py-0.5 rounded text-xs text-accent-1 bg-accent-1/10">
                            <CategoryIcon className="w-3 h-3" />
                          </div>
                        )}
                        
                        {hasCode && (
                          <div className="flex items-center px-1.5 py-0.5 rounded text-xs text-accent-2 bg-accent-2/10">
                            <Code className="w-3 h-3" />
                          </div>
                        )}

                        {(email.priority === 'high' || email.priority === 'urgent') && (
                          <div className="flex items-center px-1.5 py-0.5 rounded text-xs text-red-500 bg-red-500/10">
                            <AlertTriangle className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-text-muted font-mono">
                        {formatTime(email.timestamp)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStarToggle(email.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star 
                          className={`w-4 h-4 ${
                            email.isStarred 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-text-muted hover:text-amber-400'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>

                  {/* Subject */}
                  <h3 className={`text-sm mb-1 font-mono ${
                    isUnread 
                      ? 'font-semibold text-text' 
                      : 'font-medium text-text-secondary'
                  }`}>
                    {email.subject}
                  </h3>

                  {/* Preview */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-text-muted line-clamp-1 flex-1 font-mono">
                      {email.body.substring(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-1 ml-2">
                      {email.hasAttachments && (
                        <Paperclip className="w-3 h-3 text-text-muted" />
                      )}
                      {isUnread && (
                        <div className="w-1.5 h-1.5 bg-accent-1 rounded-full shadow-sm" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmailList;