export interface DevNotification {
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