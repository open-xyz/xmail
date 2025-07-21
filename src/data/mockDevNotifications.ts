import { DevNotification } from '../types/DevNotification';

export const mockDevNotifications: DevNotification[] = [
  {
    id: '1',
    type: 'ci-cd',
    title: 'Build Failed: main #1234',
    description: 'TypeScript compilation errors in auth module',
    status: 'error',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    repository: 'auth-service',
    branch: 'main',
    url: 'https://circleci.com/builds/1234',
    priority: 'critical'
  },
  {
    id: '2',
    type: 'github',
    title: 'PR Ready for Review',
    description: 'Add JWT authentication middleware',
    status: 'info',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    repository: 'auth-service',
    branch: 'feature/jwt-auth',
    url: 'https://github.com/company/auth-service/pull/42',
    priority: 'high'
  },
  {
    id: '3',
    type: 'sentry',
    title: 'Error Rate Spike',
    description: 'TypeError: Cannot read property "id" of undefined',
    status: 'error',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    repository: 'frontend-app',
    url: 'https://sentry.io/issues/12345',
    priority: 'high'
  },
  {
    id: '4',
    type: 'ci-cd',
    title: 'Deployment Successful',
    description: 'Production deployment completed successfully',
    status: 'success',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    repository: 'frontend-app',
    branch: 'main',
    url: 'https://vercel.com/deployments/abc123',
    priority: 'normal'
  },
  {
    id: '5',
    type: 'security',
    title: 'Vulnerability Detected',
    description: 'High severity vulnerability in lodash dependency',
    status: 'warning',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    repository: 'auth-service',
    url: 'https://github.com/advisories/GHSA-xxx',
    priority: 'high'
  },
  {
    id: '6',
    type: 'github',
    title: 'Code Review Completed',
    description: 'Sarah Chen approved your pull request',
    status: 'success',
    timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    repository: 'frontend-app',
    branch: 'feature/user-dashboard',
    url: 'https://github.com/company/frontend-app/pull/156',
    priority: 'normal'
  },
  {
    id: '7',
    type: 'ci-cd',
    title: 'Tests Passing',
    description: 'All 247 tests passed successfully',
    status: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    repository: 'auth-service',
    branch: 'feature/jwt-auth',
    url: 'https://circleci.com/builds/1233',
    priority: 'low'
  },
  {
    id: '8',
    type: 'sentry',
    title: 'Performance Alert',
    description: 'API response time increased by 40%',
    status: 'warning',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    repository: 'api-gateway',
    url: 'https://sentry.io/performance/12345',
    priority: 'normal'
  }
];

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