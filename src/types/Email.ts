export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: {
    name: string;
    email: string;
  }[];
  cc?: {
    name: string;
    email: string;
  }[];
  bcc?: {
    name: string;
    email: string;
  }[];
  subject: string;
  body: string;
  htmlBody?: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  priority: 'high' | 'normal' | 'low';
  category: 'primary' | 'social' | 'promotions' | 'updates' | 'github' | 'ci-cd' | 'alerts';
  labels: string[];
  threadId?: string;
  aiSummary?: string;
  codeBlocks?: CodeBlock[];
  isEncrypted?: boolean;
  source?: 'github' | 'gitlab' | 'slack' | 'discord' | 'email';
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  startLine?: number;
  filename?: string;
}

export interface EmailFolder {
  id: string;
  name: string;
  count: number;
  icon: string;
  color?: string;
}

export interface SearchFilter {
  id: string;
  name: string;
  query: string;
  isRegex?: boolean;
  isStarred?: boolean;
}

export interface Theme {
  mode: 'light' | 'dark';
  accent: string;
}

export interface AIFeatures {
  smartCompose: boolean;
  summarization: boolean;
  priorityDetection: boolean;
  autoCategories: boolean;
  codeDetection: boolean;
  threadAnalysis: boolean;
}