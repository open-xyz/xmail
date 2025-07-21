import React, { useState } from 'react';
import { 
  GitBranch, AlertTriangle, Zap, Shield, 
  CheckCircle, XCircle, Clock, ExternalLink,
  Code, Database, Server, Monitor
} from 'lucide-react';

interface DevNotification {
  id: string;
  type: 'github' | 'sentry' | 'ci-cd' | 'security';
  title: string;
  description: string;
  status: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  repository?: string;
  branch?: string;
  url?: string;
  priority: 'low' | 'normal' | 'high' | 'critical';
}

interface DevToolsIntegrationProps {
  notifications: DevNotification[];
  onNotificationClick: (notification: DevNotification) => void;
}

const DevToolsIntegration: React.FC<DevToolsIntegrationProps> = ({
  notifications,
  onNotificationClick
}) => {
  const [filter, setFilter] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'github': return GitBranch;
      case 'sentry': return AlertTriangle;
      case 'ci-cd': return Zap;
      case 'security': return Shield;
      default: return Code;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string, priority: string) => {
    if (priority === 'critical') return 'text-red-600 bg-red-50 border-red-200';
    
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Dev Notifications
        </h2>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { id: 'all', label: 'All', icon: Monitor },
            { id: 'github', label: 'Git', icon: GitBranch },
            { id: 'ci-cd', label: 'CI/CD', icon: Zap },
            { id: 'sentry', label: 'Errors', icon: AlertTriangle },
            { id: 'security', label: 'Security', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${
                  filter === tab.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-6 text-center">
            <Database className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredNotifications.map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              const StatusIcon = getStatusIcon(notification.status);
              const statusColor = getStatusColor(notification.status, notification.priority);
              
              return (
                <div
                  key={notification.id}
                  onClick={() => onNotificationClick(notification)}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    {/* Type Icon */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusColor}`}>
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {notification.title}
                        </h3>
                        <StatusIcon className={`w-3 h-3 ${
                          notification.status === 'success' ? 'text-green-500' :
                          notification.status === 'error' ? 'text-red-500' :
                          notification.status === 'warning' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {notification.description}
                      </p>
                      
                      {/* Metadata */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          {notification.repository && (
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {notification.repository}
                            </span>
                          )}
                          {notification.branch && (
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {notification.branch}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(notification.timestamp)}
                          </span>
                          {notification.url && (
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {/* Priority Indicator */}
                      {notification.priority === 'critical' && (
                        <div className="mt-2 flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-red-600 dark:text-red-400">
                            CRITICAL
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded transition-colors">
            <GitBranch className="w-3 h-3" />
            <span>Open GitHub</span>
          </button>
          <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded transition-colors">
            <Server className="w-3 h-3" />
            <span>View Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevToolsIntegration;