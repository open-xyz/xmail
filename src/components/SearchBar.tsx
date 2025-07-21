import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X, Save, Clock, Code, Star } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters?: SearchFilters) => void;
  savedSearches: SavedSearch[];
  onSaveSearch: (search: SavedSearch) => void;
}

interface SearchFilters {
  isRegex?: boolean;
  hasCode?: boolean;
  isStarred?: boolean;
  dateRange?: string;
  sender?: string;
  category?: string;
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: SearchFilters;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, savedSearches, onSaveSearch }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    onSearch(searchQuery, filters);
  };

  const handleSaveSearch = () => {
    if (query.trim()) {
      const newSearch: SavedSearch = {
        id: Date.now().toString(),
        name: query.substring(0, 30) + (query.length > 30 ? '...' : ''),
        query,
        filters
      };
      onSaveSearch(newSearch);
    }
  };

  const loadSavedSearch = (search: SavedSearch) => {
    setQuery(search.query);
    setFilters(search.filters);
    onSearch(search.query, search.filters);
    setShowSaved(false);
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search emails... (⌘K)"
          className="w-full pl-10 pr-20 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {Object.keys(filters).length > 0 && (
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              {Object.keys(filters).length} filters
            </span>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded transition-colors ${
              showFilters 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.isRegex || false}
                onChange={(e) => setFilters({...filters, isRegex: e.target.checked})}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Regex search</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.hasCode || false}
                onChange={(e) => setFilters({...filters, hasCode: e.target.checked})}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Contains code</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.isStarred || false}
                onChange={(e) => setFilters({...filters, isStarred: e.target.checked})}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Starred only</span>
            </label>
            <select
              value={filters.dateRange || ''}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Any time</option>
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
            </select>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setFilters({})}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Clear filters
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveSearch}
                className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Save className="w-4 h-4" />
                <span>Save search</span>
              </button>
              <button
                onClick={() => handleSearch()}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches */}
      {showSaved && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Saved Searches</h3>
          {savedSearches.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No saved searches yet</p>
          ) : (
            <div className="space-y-2">
              {savedSearches.map((search) => (
                <button
                  key={search.id}
                  onClick={() => loadSavedSearch(search)}
                  className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{search.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{search.query}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;