import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, Clock, Code, Star, Zap } from 'lucide-react';
import { useAI } from '../hooks/useAI';

interface SmartSearchProps {
  onSearch: (query: string, filters?: any) => void;
  searchQuery: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onSearch, searchQuery }) => {
  const [query, setQuery] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [smartFilters, setSmartFilters] = useState<string[]>([]);
  const { enhanceSearch } = useAI();

  useEffect(() => {
    if (query.length > 2) {
      const filters = enhanceSearch(query);
      setSmartFilters(filters);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSmartFilters([]);
    }
  }, [query, enhanceSearch]);

  const quickFilters = [
    { label: 'Has Code', filter: 'has:code', icon: Code, color: 'text-green-600' },
    { label: 'Starred', filter: 'is:starred', icon: Star, color: 'text-yellow-600' },
    { label: 'Urgent', filter: 'priority:high', icon: Zap, color: 'text-red-600' },
    { label: 'Today', filter: 'date:today', icon: Clock, color: 'text-blue-600' },
  ];

  const smartSuggestions = [
    'error in production',
    'github pull request',
    'build failed',
    'code review needed',
    'deployment successful',
    'sentry alert'
  ];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const addFilter = (filter: string) => {
    const newQuery = query ? `${query} ${filter}` : filter;
    handleSearch(newQuery);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search emails... (⌘K)"
          className="w-full pl-9 pr-10 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        {smartFilters.length > 0 && (
          <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500 animate-pulse" />
        )}
      </div>

      {/* Smart Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
          {/* AI Enhanced Filters */}
          {smartFilters.length > 0 && (
            <div className="p-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-1 mb-2">
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">AI Suggestions</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {smartFilters.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => addFilter(filter)}
                    className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="p-2 border-b border-gray-100 dark:border-gray-800">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Quick Filters</div>
            <div className="grid grid-cols-2 gap-1">
              {quickFilters.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.filter}
                    onClick={() => addFilter(item.filter)}
                    className="flex items-center space-x-1 px-2 py-1 text-xs hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    <Icon className={`w-3 h-3 ${item.color}`} />
                    <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="p-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Suggestions</div>
            {smartSuggestions.slice(0, 4).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion)}
                className="w-full text-left px-2 py-1 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;