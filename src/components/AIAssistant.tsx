import React, { useState } from 'react';
import { Sparkles, Zap, Brain, Code, Target, MessageSquare, X } from 'lucide-react';
import { Email } from '../types/Email';
import { useAI } from '../hooks/useAI';

interface AIAssistantProps {
  email?: Email;
  isVisible: boolean;
  onClose: () => void;
  mode: 'analyze' | 'compose' | 'search';
}

const AIAssistant: React.FC<AIAssistantProps> = ({ email, isVisible, onClose, mode }) => {
  const { analyzeEmail, getComposeHelp, generateReply } = useAI();
  const [activeTab, setActiveTab] = useState<'insights' | 'actions' | 'reply'>('insights');

  if (!isVisible) return null;

  const analysis = email ? analyzeEmail(email) : null;
  const smartReply = email ? generateReply(email) : '';

  const tabs = [
    { id: 'insights', label: 'Insights', icon: Brain },
    { id: 'actions', label: 'Actions', icon: Target },
    { id: 'reply', label: 'Reply', icon: MessageSquare }
  ];

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Header */}
      <div className="h-12 px-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">AI Assistant</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-3 py-2 text-xs font-medium flex items-center justify-center space-x-1 ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'insights' && analysis && (
          <div className="space-y-3">
            {analysis.insights.map((insight, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="text-sm">{insight.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      {insight.type}
                    </div>
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {insight.content}
                    </div>
                    <div className="mt-1 flex items-center space-x-1">
                      <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${insight.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round(insight.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'actions' && analysis && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
              Suggested Actions
            </div>
            {analysis.suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span className="text-gray-900 dark:text-gray-100">{suggestion}</span>
                </div>
              </button>
            ))}
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-900 dark:text-blue-100">Priority</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                analysis.priority === 'urgent' 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                  : analysis.priority === 'high'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
              }`}>
                {analysis.priority.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {activeTab === 'reply' && (
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Smart Reply
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                {smartReply}
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors">
                Use Reply
              </button>
              <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded transition-colors">
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-1 px-2 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded transition-colors">
            <Code className="w-3 h-3" />
            <span>Extract Code</span>
          </button>
          <button className="flex items-center justify-center space-x-1 px-2 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded transition-colors">
            <Brain className="w-3 h-3" />
            <span>Summarize</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;