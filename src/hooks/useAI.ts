import { useState, useCallback, useMemo } from 'react';
import { Email } from '../types/Email';

interface AIInsight {
  type: 'summary' | 'action' | 'priority' | 'code' | 'sentiment';
  content: string;
  confidence: number;
  icon?: string;
}

interface AIResponse {
  insights: AIInsight[];
  suggestions: string[];
  autoReply?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

// Simulated AI responses - in production, this would be real AI
const AI_RESPONSES: Record<string, AIResponse> = {
  'github': {
    insights: [
      { type: 'summary', content: 'Pull request requires code review', confidence: 0.95, icon: '🔍' },
      { type: 'action', content: 'Review changes in auth middleware', confidence: 0.88, icon: '⚡' },
      { type: 'code', content: 'TypeScript code detected - JWT implementation', confidence: 0.92, icon: '💻' }
    ],
    suggestions: ['Review PR', 'Run tests', 'Check security'],
    priority: 'high'
  },
  'ci-cd': {
    insights: [
      { type: 'summary', content: 'Build failure in test suite', confidence: 0.98, icon: '❌' },
      { type: 'action', content: 'Fix failing tests immediately', confidence: 0.95, icon: '🚨' },
      { type: 'priority', content: 'Blocking main branch deployment', confidence: 0.90, icon: '⚠️' }
    ],
    suggestions: ['Fix tests', 'Check logs', 'Revert if needed'],
    priority: 'urgent'
  },
  'alerts': {
    insights: [
      { type: 'summary', content: 'Production error affecting users', confidence: 0.97, icon: '🚨' },
      { type: 'action', content: 'Apply null check fix', confidence: 0.93, icon: '🔧' },
      { type: 'code', content: 'TypeError in auth.js line 45', confidence: 0.96, icon: '🐛' }
    ],
    suggestions: ['Apply hotfix', 'Monitor metrics', 'Update tests'],
    priority: 'urgent'
  },
  'code-review': {
    insights: [
      { type: 'summary', content: 'Performance optimization suggestions', confidence: 0.89, icon: '⚡' },
      { type: 'action', content: 'Consider pagination implementation', confidence: 0.85, icon: '📝' },
      { type: 'sentiment', content: 'Positive feedback with constructive suggestions', confidence: 0.91, icon: '👍' }
    ],
    suggestions: ['Implement changes', 'Add pagination', 'Update docs'],
    priority: 'normal'
  }
};

export const useAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Instant AI analysis - no delays
  const analyzeEmail = useCallback((email: Email): AIResponse => {
    // Determine email type for AI response
    let responseKey = 'default';
    
    if (email.source === 'github' || email.category === 'github') {
      responseKey = 'github';
    } else if (email.category === 'ci-cd') {
      responseKey = 'ci-cd';
    } else if (email.category === 'alerts') {
      responseKey = 'alerts';
    } else if (email.labels.includes('code-review')) {
      responseKey = 'code-review';
    }

    return AI_RESPONSES[responseKey] || {
      insights: [
        { type: 'summary', content: 'Standard email communication', confidence: 0.75, icon: '📧' }
      ],
      suggestions: ['Reply', 'Archive'],
      priority: 'normal'
    };
  }, []);

  // Smart compose suggestions
  const getComposeHelp = useCallback((context: string): string[] => {
    const suggestions = [
      'Thanks for the update!',
      'I\'ll review this shortly.',
      'LGTM! Merging now.',
      'Could you add tests for this?',
      'Looks good, just one small suggestion:',
      'This is blocking deployment, priority fix needed.',
      'Great work on the optimization!',
      'I\'ve applied the hotfix to production.'
    ];

    // Return contextual suggestions instantly
    if (context.includes('github') || context.includes('pr') || context.includes('pull request')) {
      return suggestions.slice(2, 5);
    }
    if (context.includes('error') || context.includes('bug') || context.includes('fix')) {
      return suggestions.slice(5, 8);
    }
    return suggestions.slice(0, 3);
  }, []);

  // Smart reply generation
  const generateReply = useCallback((email: Email): string => {
    if (email.category === 'github' && email.labels.includes('pull-request')) {
      return `Thanks for the PR! I'll review the auth middleware changes and get back to you shortly.

The JWT implementation looks solid. Just want to double-check the rate limiting logic.`;
    }
    
    if (email.category === 'ci-cd' && email.labels.includes('build-failure')) {
      return `Looking into the test failures now. Will push a fix within the hour.

Thanks for the quick notification!`;
    }

    if (email.category === 'alerts') {
      return `Hotfix deployed. Monitoring the error rates now.

The null check should resolve the TypeError. Will follow up with proper tests.`;
    }

    return `Thanks for reaching out! I'll take a look at this and get back to you.`;
  }, []);

  // Instant search enhancement
  const enhanceSearch = useCallback((query: string): string[] => {
    const enhancements = [];
    
    if (query.includes('error') || query.includes('bug')) {
      enhancements.push('category:alerts', 'priority:high', 'has:code');
    }
    if (query.includes('pr') || query.includes('review')) {
      enhancements.push('category:github', 'label:pull-request', 'label:code-review');
    }
    if (query.includes('build') || query.includes('deploy')) {
      enhancements.push('category:ci-cd', 'from:circleci OR from:vercel');
    }
    
    return enhancements;
  }, []);

  // Smart categorization
  const categorizeEmail = useCallback((email: Email): string => {
    const subject = email.subject.toLowerCase();
    const body = email.body.toLowerCase();
    const from = email.from.email.toLowerCase();

    // Instant categorization
    if (from.includes('github') || subject.includes('pull request') || subject.includes('[pr]')) {
      return 'github';
    }
    if (from.includes('circleci') || from.includes('vercel') || subject.includes('build') || subject.includes('deploy')) {
      return 'ci-cd';
    }
    if (from.includes('sentry') || from.includes('error') || subject.includes('alert') || subject.includes('🚨')) {
      return 'alerts';
    }
    if (body.includes('```') || body.includes('code') || subject.includes('review')) {
      return 'code-review';
    }

    return 'primary';
  }, []);

  // Priority detection
  const detectPriority = useCallback((email: Email): 'low' | 'normal' | 'high' | 'urgent' => {
    const subject = email.subject.toLowerCase();
    const body = email.body.toLowerCase();

    if (subject.includes('urgent') || subject.includes('🚨') || subject.includes('critical')) {
      return 'urgent';
    }
    if (subject.includes('error') || subject.includes('failed') || subject.includes('down')) {
      return 'high';
    }
    if (subject.includes('review') || subject.includes('feedback')) {
      return 'normal';
    }

    return 'normal';
  }, []);

  return {
    analyzeEmail,
    getComposeHelp,
    generateReply,
    enhanceSearch,
    categorizeEmail,
    detectPriority,
    isProcessing
  };
};