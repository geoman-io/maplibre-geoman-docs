import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

interface CopyAsMarkdownProps {
  className?: string;
}

export default function CopyAsMarkdown({ className }: CopyAsMarkdownProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      // Get the current page's markdown source URL
      const editUrl = document.querySelector<HTMLAnchorElement>('a[href*="github.com"][href*="/edit/"]');

      if (editUrl) {
        // Convert edit URL to raw content URL
        const rawUrl = editUrl.href
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/edit/', '/');

        const response = await fetch(rawUrl);
        if (response.ok) {
          const markdown = await response.text();
          await navigator.clipboard.writeText(markdown);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          return;
        }
      }

      // Fallback: convert visible content to markdown-like format
      const article = document.querySelector('article');
      if (article) {
        const title = document.querySelector('h1')?.textContent || '';
        const content = article.innerText;
        const markdown = `# ${title}\n\n${content}`;
        await navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  return (
    <button
      className={`${styles.copyButton} ${className || ''}`}
      onClick={handleCopy}
      title="Copy page content as Markdown"
      aria-label="Copy page content as Markdown"
    >
      {copied ? (
        <>
          <CheckIcon />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <CopyIcon />
          <span>Copy as Markdown</span>
        </>
      )}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
