import React from 'react';
import { Terminal, RefreshCw, Settings, Moon, Sun, Sparkles, Code, Palette, Zap } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import AdvancedSearch from './AdvancedSearch';

interface TopBarProps {
  onSearch: (query: string, filters?: Record<string, any>) => void;
  onRefresh: () => void;
  searchQuery: string;
  onToggleAI: () => void;
  isAIVisible: boolean;
  onToggleDevTools: () => void;
  isDevToolsVisible: boolean;
  savedSearches: Array<{ name: string; query: string; filters: Record<string, any> }>;
  onSaveSearch: (name: string, query: string, filters: Record<string, any>) => void;
}

const TopBar: React.FC<TopBarProps> = ({ 
  onSearch, 
  onRefresh, 
  searchQuery, 
  onToggleAI, 
  isAIVisible,
  onToggleDevTools,
  isDevToolsVisible,
  savedSearches,
  onSaveSearch
}) => {
  const { theme, cycleTheme, getThemeLabel } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return Sun;
      case 'dark': return Moon;
      case 'techy': return Code;
      case 'night': return Zap;
      default: return Sun;
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <div className="h-14 bg-bg-0 border-b border-bg-2 flex items-center px-4 shadow-sm backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2.5 mr-6">
        <div className="w-7 h-7 bg-gradient-to-br from-accent-1 to-accent-2 rounded-lg flex items-center justify-center shadow-sm animate-glow">
          <Terminal className="w-4 h-4 text-white font-bold" />
        </div>
        <div>
          <span className="font-bold text-base text-text font-mono tracking-tight">
            xmail.dev
          </span>
          <div className="text-xs text-text-muted font-mono -mt-0.5 tracking-wide">
            {theme === 'techy' ? 'techy • fast • secure' : 
             theme === 'night' ? 'night • fast • secure' :
             'unified • fast • secure'}
          </div>
        </div>
      </div>

      {/* Advanced Search */}
      <div className="flex-1 max-w-2xl">
        <AdvancedSearch
          onSearch={onSearch}
          onSaveSearch={onSaveSearch}
          savedSearches={savedSearches}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1.5 ml-4">
        <button
          onClick={onToggleAI}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isAIVisible 
              ? 'bg-accent-1/10 text-accent-1 shadow-sm' 
              : 'text-text-secondary hover:text-text hover:bg-bg-1'
          }`}
          title="Toggle AI Assistant (A)"
        >
          <Sparkles className="w-4 h-4" />
        </button>
        
        <button
          onClick={onToggleDevTools}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDevToolsVisible 
              ? 'bg-accent-2/10 text-accent-2 shadow-sm' 
              : 'text-text-secondary hover:text-text hover:bg-bg-1'
          }`}
          title="Toggle Dev Tools (D)"
        >
          <Code className="w-4 h-4" />
        </button>
        
        <button
          onClick={onRefresh}
          className="p-2 text-text-secondary hover:text-text hover:bg-bg-1 rounded-lg transition-all duration-200"
          title="Refresh (⌘R)"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        
        <button
          onClick={cycleTheme}
          className="p-2 text-text-secondary hover:text-text hover:bg-bg-1 rounded-lg transition-all duration-200"
          title={`Current: ${getThemeLabel()} (⌘T)`}
        >
          <ThemeIcon className="w-4 h-4" />
        </button>
        
        <button 
          className="p-2 text-text-secondary hover:text-text hover:bg-bg-1 rounded-lg transition-all duration-200"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;