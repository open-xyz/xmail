import { Email } from '../types/Email';

export const mockEmails: Email[] = [
  {
    id: '1',
    from: {
      name: 'GitHub',
      email: 'noreply@github.com'
    },
    to: [{ name: 'You', email: 'you@email.com' }],
    subject: '[repo/main] PR #42: Add auth middleware',
    body: `@dev opened a pull request:

## Summary
Added JWT authentication middleware with rate limiting.

## Changes
- JWT token validation
- Rate limiting per IP
- Error handling improvements

\`\`\`typescript
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
\`\`\`

Ready for review.`,
    timestamp: new Date('2024-01-15T09:30:00'),
    isRead: false,
    isStarred: true,
    hasAttachments: false,
    priority: 'high',
    category: 'github',
    source: 'github',
    labels: ['pull-request']
  },
  {
    id: '2',
    from: {
      name: 'CircleCI',
      email: 'noreply@circleci.com'
    },
    to: [{ name: 'You', email: 'you@email.com' }],
    subject: '❌ Build failed: main #1234',
    body: `Build #1234 failed on main branch

**Error:**
\`\`\`bash
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! test@1.0.0 test: \`jest\`
npm ERR! Exit status 1
\`\`\`

**Failed Tests:**
- auth.test.ts: Token validation
- user.test.ts: User creation

View logs: https://circleci.com/builds/1234`,
    timestamp: new Date('2024-01-15T08:45:00'),
    isRead: false,
    isStarred: false,
    hasAttachments: false,
    priority: 'high',
    category: 'ci-cd',
    labels: ['build-failure']
  },
  {
    id: '3',
    from: {
      name: 'Sarah Chen',
      email: 'sarah@company.com'
    },
    to: [{ name: 'You', email: 'you@email.com' }],
    subject: 'Code review: API optimization',
    body: `Hey! Reviewed your API changes.

**Feedback:**
- Good use of caching
- Consider adding pagination
- Database queries look efficient

**Suggestion:**
\`\`\`typescript
// Add pagination
const getUsers = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return db.users.findMany({
    skip: offset,
    take: limit
  });
};
\`\`\`

LGTM overall! 👍`,
    timestamp: new Date('2024-01-14T16:20:00'),
    isRead: true,
    isStarred: true,
    hasAttachments: false,
    priority: 'normal',
    category: 'primary',
    labels: ['code-review']
  },
  {
    id: '4',
    from: {
      name: 'Sentry',
      email: 'alerts@sentry.io'
    },
    to: [{ name: 'You', email: 'you@email.com' }],
    subject: '🚨 Error: TypeError in auth.js',
    body: `**New Error Detected**

TypeError: Cannot read property 'id' of undefined
File: auth.js:45
Users affected: 12

**Stack Trace:**
\`\`\`javascript
TypeError: Cannot read property 'id' of undefined
    at validateUser (auth.js:45:23)
    at login (auth.js:12:15)
\`\`\`

**Fix:**
\`user?.id\` instead of \`user.id\`

View: https://sentry.io/issues/12345`,
    timestamp: new Date('2024-01-14T14:30:00'),
    isRead: false,
    isStarred: false,
    hasAttachments: false,
    priority: 'high',
    category: 'alerts',
    labels: ['error', 'production']
  },
  {
    id: '5',
    from: {
      name: 'Vercel',
      email: 'noreply@vercel.com'
    },
    to: [{ name: 'You', email: 'you@email.com' }],
    subject: '✅ Deployment successful',
    body: `Deployment completed successfully!

**Details:**
- URL: https://app.vercel.app
- Branch: main
- Commit: a1b2c3d
- Build time: 2m 34s

**Performance:**
- FCP: 1.2s
- LCP: 2.1s
- CLS: 0.05

All systems operational! 🚀`,
    timestamp: new Date('2024-01-14T12:15:00'),
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    priority: 'normal',
    category: 'ci-cd',
    labels: ['deployment']
  }
];