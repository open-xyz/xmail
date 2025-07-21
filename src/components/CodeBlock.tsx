import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  startLine?: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename, startLine = 1 }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      javascript: 'text-yellow-600 dark:text-yellow-400',
      typescript: 'text-blue-600 dark:text-blue-400',
      python: 'text-green-600 dark:text-green-400',
      java: 'text-red-600 dark:text-red-400',
      go: 'text-cyan-600 dark:text-cyan-400',
      rust: 'text-orange-600 dark:text-orange-400',
      cpp: 'text-purple-600 dark:text-purple-400',
      shell: 'text-gray-600 dark:text-gray-400',
    };
    return colors[lang.toLowerCase()] || 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="my-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          {filename && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filename}
            </span>
          )}
          <span className={`text-xs font-medium px-2 py-1 rounded ${getLanguageColor(language)} bg-opacity-10`}>
            {language}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        <pre className="p-4 text-sm overflow-x-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
          <code className="block">
            {code.split('\n').map((line, index) => (
              <div key={index} className="flex">
                <span className="select-none text-gray-400 dark:text-gray-600 mr-4 text-right w-8">
                  {startLine + index}
                </span>
                <span className="flex-1">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;