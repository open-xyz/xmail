import React, { useState } from 'react';
import { FolderOpen, Plus, Settings, GitBranch, Code, Server, ChevronLeft, ChevronRight } from 'lucide-react';

interface Workspace {
  id: string;
  name: string;
  type: 'project' | 'repository' | 'team';
  icon: string;
  color: string;
  unreadCount: number;
}

interface WorkspaceSelectorProps {
  selectedWorkspace: string;
  onWorkspaceChange: (workspaceId: string) => void;
  isVisible: boolean;
  onToggle: () => void;
}

const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  selectedWorkspace,
  onWorkspaceChange,
  isVisible,
  onToggle
}) => {
  const workspaces: Workspace[] = [
    {
      id: 'main',
      name: 'Main Project',
      type: 'project',
      icon: '🚀',
      color: 'bg-blue-500',
      unreadCount: 12
    },
    {
      id: 'auth-service',
      name: 'auth-service',
      type: 'repository',
      icon: '🔐',
      color: 'bg-green-500',
      unreadCount: 5
    },
    {
      id: 'frontend',
      name: 'frontend-app',
      type: 'repository',
      icon: '⚛️',
      color: 'bg-purple-500',
      unreadCount: 8
    },
    {
      id: 'devops',
      name: 'DevOps Team',
      type: 'team',
      icon: '⚙️',
      color: 'bg-orange-500',
      unreadCount: 3
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'repository': return GitBranch;
      case 'team': return Server;
      default: return Code;
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="w-12 bg-gray-900 border-r border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors"
        title="Show Workspaces"
      >
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
    );
  }

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-200">Workspaces</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {}}
              className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded"
              title="Add Workspace"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={onToggle}
              className="p-1 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded"
              title="Hide Workspaces"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Workspace List */}
      <div className="flex-1 p-2 space-y-1">
        {workspaces.map((workspace) => {
          const TypeIcon = getTypeIcon(workspace.type);
          const isSelected = selectedWorkspace === workspace.id;
          
          return (
            <button
              key={workspace.id}
              onClick={() => onWorkspaceChange(workspace.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className={`w-8 h-8 ${workspace.color} rounded-lg flex items-center justify-center text-white text-sm font-medium`}>
                {workspace.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium truncate">{workspace.name}</div>
                <div className="flex items-center space-x-1">
                  <TypeIcon className="w-3 h-3 opacity-60" />
                  <span className="text-xs opacity-60 capitalize">{workspace.type}</span>
                </div>
              </div>
              {workspace.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {workspace.unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Settings */}
      <div className="p-2 border-t border-gray-800">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Workspace Settings</span>
        </button>
      </div>
    </div>
  );
};

export default WorkspaceSelector;