import React from 'react';
import { 
  Inbox, Star, Send, Archive, Trash2, 
  GitBranch, Zap, AlertTriangle, Code, PenTool
} from 'lucide-react';

interface SidebarProps {
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
  onComposeClick: () => void;
  unreadCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedFolder, 
  onFolderChange, 
  onComposeClick,
  unreadCount 
}) => {
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: unreadCount, key: 'i' },
    { id: 'starred', name: 'Starred', icon: Star, count: 0, key: 's' },
    { id: 'sent', name: 'Sent', icon: Send, count: 0, key: 't' },
    { id: 'archive', name: 'Archive', icon: Archive, count: 0, key: 'a' },
    { id: 'trash', name: 'Trash', icon: Trash2, count: 0, key: 'd' },
  ];

  const devFolders = [
    { id: 'github', name: 'GitHub', icon: GitBranch, count: 8, key: 'g' },
    { id: 'ci-cd', name: 'CI/CD', icon: Zap, count: 3, key: 'c' },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle, count: 2, key: 'l' },
    { id: 'code-reviews', name: 'Reviews', icon: Code, count: 5, key: 'r' },
  ];

  return (
    <div className="w-56 bg-bg-0 border-r border-bg-2 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-bg-2">
        <h1 className="text-lg font-bold text-text mb-0.5 font-mono">
          Mail
        </h1>
        <p className="text-xs text-text-muted font-mono">
          Developer Email Client
        </p>
      </div>

      {/* Compose */}
      <div className="p-3">
        <button
          onClick={onComposeClick}
          className="w-full bg-gradient-to-r from-accent-1 to-accent-2 hover:opacity-90 text-white font-medium py-2.5 px-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <PenTool className="w-4 h-4" />
          <span className="font-mono">Compose</span>
          <span className="text-xs opacity-75 bg-black/20 px-1.5 py-0.5 rounded font-mono">C</span>
        </button>
      </div>

      {/* Main Folders */}
      <nav className="flex-1 px-3">
        <div className="mb-4">
          <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 px-2 font-mono">
            Folders
          </h3>
          <div className="space-y-0.5">
            {folders.map((folder) => {
              const Icon = folder.icon;
              const isSelected = selectedFolder === folder.id;
              
              return (
                <button
                  key={folder.id}
                  onClick={() => onFolderChange(folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-150 group ${
                    isSelected
                      ? 'bg-bg-1 text-accent-1 shadow-sm'
                      : 'text-text-secondary hover:bg-bg-1 hover:text-text'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-accent-1' : 'text-text-muted group-hover:text-accent-1'}`} />
                    <span className="font-medium font-mono">{folder.name}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      {folder.key}
                    </span>
                    {folder.count > 0 && (
                      <span className="text-xs bg-accent-1 text-white px-1.5 py-0.5 rounded-full font-medium min-w-[18px] text-center font-mono">
                        {folder.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Developer Folders */}
        <div>
          <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 px-2 font-mono">
            Developer
          </h3>
          <div className="space-y-0.5">
            {devFolders.map((folder) => {
              const Icon = folder.icon;
              const isSelected = selectedFolder === folder.id;
              
              return (
                <button
                  key={folder.id}
                  onClick={() => onFolderChange(folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-150 group ${
                    isSelected
                      ? 'bg-bg-1 text-accent-1 shadow-sm'
                      : 'text-text-secondary hover:bg-bg-1 hover:text-text'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-accent-1' : 'text-text-muted group-hover:text-accent-1'}`} />
                    <span className="font-medium font-mono">{folder.name}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      {folder.key}
                    </span>
                    {folder.count > 0 && (
                      <span className={`text-xs text-white px-1.5 py-0.5 rounded-full font-medium min-w-[18px] text-center font-mono ${
                        folder.id === 'alerts' ? 'bg-red-500' : 'bg-accent-2'
                      }`}>
                        {folder.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-bg-2">
        <div className="text-xs text-text-muted text-center">
          <p className="font-mono text-accent-1">xmail.dev v2.1</p>
          <p className="mt-0.5 font-mono">Unified • Fast • Secure</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;