import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Filter, Save, Clock, Code, Star, 
  Calendar, User, Tag, GitBranch, AlertTriangle,
  X, ChevronDown, Zap, Shield
} from 'lucide-react';

interface SearchFilter {
  type: 'text' | 'select' | 'date' | 'boolean';
  key: string;
  label: string;
  options?: string[];
  value?: any;
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: Record<string, any>) => void;
  onSaveSearch: (name: string, query: string, filters: Record<string, any>) => void;
  savedSearches: Array<{ name: string; query: string; filters: Record<string, any> }>;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  onSaveSearch,
  savedSearches
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [showQuickSearches, setShowQuickSearches] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchFilters: SearchFilter[] = [
    {
      type: 'select',
      key: 'from',
      label: 'From',
      options: ['github.com', 'sentry.io', 'circleci.com', 'vercel.com', 'slack.com']
    },
    {
      type: 'select',
      key: 'category',
      label: 'Category',
      options: ['github', 'ci-cd', 'alerts', 'code-review', 'security']
    },
    {
      type: 'select',
      key: 'priority',
      label: 'Priority',
      options: ['low', 'normal', 'high', 'critical']
    },
    {
      type: 'date',
      key: 'dateRange',
      label: 'Date Range'
    },
    {
      type: 'boolean',
      key: 'hasCode',
      label: 'Contains Code'
    },
    {
      type: 'boolean',
      key: 'isStarred',
      label: 'Starred Only'
    },
    {
      type: 'boolean',
      key: 'isUnread',
      label: 'Unread Only'
    },
    {
      type: 'text',
      key: 'repository',
      label: 'Repository'
    },
    {
      type: 'text',
      key: 'branch',
      label: 'Branch'
    }
  ];

  const quickSearches = [
    { label: 'Build Failures', query: 'failed build', icon: AlertTriangle, color: 'text-red-500' },
    { label: 'PR Reviews', query: 'pull request review', icon: GitBranch, color: 'text-accent-1' },
    { label: 'Security Alerts', query: 'security alert', icon: Shield, color: 'text-orange-500' },
    { label: 'Code with Errors', query: 'has:code error', icon: Code, color: 'text-accent-2' },
    { label: 'Starred Important', query: 'is:starred priority:high', icon: Star, color: 'text-amber-500' },
    { label: 'Today\'s Activity', query: 'date:today', icon: Calendar, color: 'text-accent-1' }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowFilters(false);
        setShowSaved(false);
        setShowQuickSearches(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = () => {
    onSearch(query, filters);
    setShowFilters(false);
    setShowSaved(false);
    setShowQuickSearches(false);
  };

  const handleQuickSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery, {});
    setShowQuickSearches(false);
  };

  const handleSaveSearch = () => {
    if (saveName.trim()) {
      onSaveSearch(saveName, query, filters);
      setSaveModalOpen(false);
      setSaveName('');
    }
  };

  const loadSavedSearch = (saved: any) => {
    setQuery(saved.query);
    setFilters(saved.filters);
    onSearch(saved.query, saved.filters);
    setShowSaved(false);
  };

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const removeFilter = (key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearSearch = () => {
    setQuery('');
    setFilters({});
    onSearch('', {});
    setShowQuickSearches(false);
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <div className="relative">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setShowQuickSearches(query.length === 0)}
          placeholder="Search emails... (⌘K)"
          className="w-full pl-10 pr-32 py-2.5 bg-bg-1 border border-bg-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-1 focus:border-transparent text-text placeholder-text-muted font-mono"
        />
        
        {/* Action Buttons */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {(query || activeFilterCount > 0) && (
            <button
              onClick={clearSearch}
              className="p-1.5 text-text-muted hover:text-text rounded transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {activeFilterCount > 0 && (
            <span className="text-xs bg-accent-1/10 text-accent-1 px-2 py-1 rounded-full font-medium font-mono">
              {activeFilterCount}
            </span>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'bg-accent-1/10 text-accent-1'
                : 'text-text-muted hover:text-text'
            }`}
            title="Advanced filters"
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="p-1.5 text-text-muted hover:text-text rounded transition-colors"
            title="Saved searches"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Search Suggestions */}
      {showQuickSearches && query.length === 0 && !showFilters && !showSaved && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-0 border border-bg-2 rounded-lg shadow-lg z-50">
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-text font-mono">Quick Searches</h3>
              <button
                onClick={() => setShowQuickSearches(false)}
                className="p-1 text-text-muted hover:text-text rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickSearches.map((search, index) => {
                const Icon = search.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(search.query)}
                    className="flex items-center space-x-2 p-2 text-left hover:bg-bg-1 rounded transition-colors"
                  >
                    <Icon className={`w-4 h-4 ${search.color}`} />
                    <span className="text-sm text-text font-mono">{search.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-0 border border-bg-2 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-text font-mono">Advanced Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-text-muted hover:text-text rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="mb-4">
                <div className="text-xs font-medium text-text-muted mb-2 font-mono">Active Filters</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    const filter = searchFilters.find(f => f.key === key);
                    return (
                      <div
                        key={key}
                        className="flex items-center space-x-1 bg-accent-1/10 text-accent-1 px-2 py-1 rounded text-xs font-mono"
                      >
                        <span>{filter?.label}: {String(value)}</span>
                        <button
                          onClick={() => removeFilter(key)}
                          className="hover:bg-accent-1/20 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filter Controls */}
            <div className="grid grid-cols-2 gap-4">
              {searchFilters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-xs font-medium text-text-secondary mb-1 font-mono">
                    {filter.label}
                  </label>
                  
                  {filter.type === 'select' && (
                    <select
                      value={filters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      className="w-full text-xs border border-bg-2 rounded bg-bg-1 text-text p-2 font-mono"
                    >
                      <option value="">Any</option>
                      {filter.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                  
                  {filter.type === 'text' && (
                    <input
                      type="text"
                      value={filters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      className="w-full text-xs border border-bg-2 rounded bg-bg-1 text-text p-2 font-mono"
                      placeholder={`Enter ${filter.label.toLowerCase()}`}
                    />
                  )}
                  
                  {filter.type === 'boolean' && (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters[filter.key] || false}
                        onChange={(e) => updateFilter(filter.key, e.target.checked)}
                        className="rounded border-bg-2"
                      />
                      <span className="text-xs text-text-secondary font-mono">Enable</span>
                    </label>
                  )}
                  
                  {filter.type === 'date' && (
                    <select
                      value={filters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      className="w-full text-xs border border-bg-2 rounded bg-bg-1 text-text p-2 font-mono"
                    >
                      <option value="">Any time</option>
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="week">This week</option>
                      <option value="month">This month</option>
                      <option value="custom">Custom range</option>
                    </select>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-bg-2">
              <button
                onClick={() => setFilters({})}
                className="text-xs text-text-muted hover:text-text font-mono"
              >
                Clear all filters
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSaveModalOpen(true)}
                  className="flex items-center space-x-1 text-xs text-accent-1 hover:text-accent-2 font-mono"
                >
                  <Save className="w-3 h-3" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleSearch}
                  className="px-3 py-1.5 bg-accent-1 text-white text-xs rounded hover:opacity-90 transition-opacity font-mono"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches */}
      {showSaved && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-0 border border-bg-2 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-text font-mono">Saved Searches</h3>
              <button
                onClick={() => setShowSaved(false)}
                className="p-1 text-text-muted hover:text-text rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {savedSearches.length === 0 ? (
              <p className="text-sm text-text-muted font-mono">No saved searches yet</p>
            ) : (
              <div className="space-y-2">
                {savedSearches.map((saved, index) => (
                  <button
                    key={index}
                    onClick={() => loadSavedSearch(saved)}
                    className="w-full text-left p-2 hover:bg-bg-1 rounded transition-colors"
                  >
                    <div className="text-sm font-medium text-text font-mono">{saved.name}</div>
                    <div className="text-xs text-text-muted font-mono">{saved.query}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Search Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-bg-0 rounded-lg p-6 w-96 border border-bg-2">
            <h3 className="text-lg font-semibold text-text mb-4 font-mono">Save Search</h3>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter search name"
              className="w-full px-3 py-2 border border-bg-2 rounded bg-bg-1 text-text mb-4 font-mono"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSaveModalOpen(false)}
                className="px-4 py-2 text-text-secondary hover:text-text font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSearch}
                className="px-4 py-2 bg-accent-1 text-white rounded hover:opacity-90 font-mono"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;