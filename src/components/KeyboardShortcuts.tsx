import React, { useState } from 'react';
import { Keyboard, X, Command } from 'lucide-react';

interface Shortcut {
  key: string;
  description: string;
  category: string;
  modifiers?: string[];
}

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
  const shortcuts: Shortcut[] = [
    // Navigation
    { key: 'j', description: 'Next email', category: 'Navigation' },
    { key: 'k', description: 'Previous email', category: 'Navigation' },
    { key: 'Enter', description: 'Open email', category: 'Navigation' },
    { key: 'Escape', description: 'Go back', category: 'Navigation' },
    { key: 'g i', description: 'Go to inbox', category: 'Navigation' },
    { key: 'g s', description: 'Go to starred', category: 'Navigation' },
    { key: 'g t', description: 'Go to sent', category: 'Navigation' },
    
    // Actions
    { key: 'c', description: 'Compose email', category: 'Actions' },
    { key: 'r', description: 'Reply', category: 'Actions' },
    { key: 'a', description: 'Reply all', category: 'Actions' },
    { key: 'f', description: 'Forward', category: 'Actions' },
    { key: 's', description: 'Star/unstar', category: 'Actions' },
    { key: 'e', description: 'Archive', category: 'Actions' },
    { key: 'Delete', description: 'Delete', category: 'Actions' },
    
    // Search & Filter
    { key: '/', description: 'Search', category: 'Search', modifiers: ['⌘'] },
    { key: 'k', description: 'Quick search', category: 'Search', modifiers: ['⌘'] },
    { key: 'f', description: 'Advanced filters', category: 'Search', modifiers: ['⌘'] },
    
    // Developer Features
    { key: 'x', description: 'Toggle AI assistant', category: 'Developer' },
    { key: 'd', description: 'Toggle dev tools', category: 'Developer' },
    { key: 'w', description: 'Switch workspace', category: 'Developer' },
    { key: 'p', description: 'Command palette', category: 'Developer', modifiers: ['⌘', 'Shift'] },
    
    // Compose
    { key: 'Enter', description: 'Send email', category: 'Compose', modifiers: ['⌘'] },
    { key: 's', description: 'Save draft', category: 'Compose', modifiers: ['⌘'] },
    { key: 'Escape', description: 'Close compose', category: 'Compose' },
    
    // General
    { key: 'r', description: 'Refresh', category: 'General', modifiers: ['⌘'] },
    { key: '?', description: 'Show shortcuts', category: 'General' },
    { key: 't', description: 'Toggle theme', category: 'General', modifiers: ['⌘'] },
  ];

  const categories = Array.from(new Set(shortcuts.map(s => s.category)));

  const formatKey = (shortcut: Shortcut) => {
    const parts = [];
    if (shortcut.modifiers) {
      parts.push(...shortcut.modifiers);
    }
    parts.push(shortcut.key);
    return parts;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Keyboard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {category}
                </h3>
                <div className="space-y-3">
                  {shortcuts
                    .filter(s => s.category === category)
                    .map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {shortcut.description}
                        </span>
                        <div className="flex items-center space-x-1">
                          {formatKey(shortcut).map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded">
                                {key === '⌘' ? <Command className="w-3 h-3" /> : key}
                              </kbd>
                              {keyIndex < formatKey(shortcut).length - 1 && (
                                <span className="text-gray-400">+</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">?</kbd> anytime to show shortcuts</span>
            <span>Xmail v2.0 - Built for developers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;