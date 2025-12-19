import type { Plugin, LoadContext } from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';

interface DocContent {
  title: string;
  path: string;
  content: string;
}

function extractFrontmatter(content: string): { title: string; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  let title = '';
  let body = content;

  if (match) {
    const frontmatter = match[1];
    const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }
    body = content.slice(match[0].length);
  }

  // Try to extract title from first heading if not in frontmatter
  if (!title) {
    const headingMatch = body.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      title = headingMatch[1].trim();
    }
  }

  return { title, body };
}

function stripMdxComponents(content: string): string {
  // Remove import statements
  let cleaned = content.replace(/^import\s+.*$/gm, '');

  // Remove JSX/MDX components (self-closing and with children)
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, '');
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '');

  // Clean up excessive newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

function getAllMarkdownFiles(dir: string, baseDir: string = dir): DocContent[] {
  const docs: DocContent[] = [];

  if (!fs.existsSync(dir)) {
    return docs;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      docs.push(...getAllMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { title, body } = extractFrontmatter(content);
      const cleanedContent = stripMdxComponents(body);

      // Calculate relative path for URL
      const relativePath = path.relative(baseDir, fullPath);
      const urlPath = relativePath
        .replace(/\\/g, '/')
        .replace(/\.mdx?$/, '')
        .replace(/index$/, '')
        .replace(/^\d+-/, '') // Remove numeric prefixes like "01-"
        .replace(/\/\d+-/g, '/'); // Remove numeric prefixes in subdirs

      docs.push({
        title: title || path.basename(item, path.extname(item)),
        path: urlPath,
        content: cleanedContent,
      });
    }
  }

  return docs;
}

function generateLlmTxt(docs: DocContent[], siteUrl: string, baseUrl: string): string {
  const header = `# MapLibre-Geoman Documentation

> This file contains all documentation in a format optimized for LLMs.
> Source: ${siteUrl}${baseUrl}

## Table of Contents

${docs.map((doc, i) => `${i + 1}. [${doc.title}](#${doc.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')})`).join('\n')}

---

`;

  const content = docs
    .map((doc) => {
      return `## ${doc.title}

**URL:** ${siteUrl}${baseUrl}/${doc.path}

${doc.content}

---
`;
    })
    .join('\n');

  return header + content;
}

export default function llmTxtPlugin(context: LoadContext): Plugin {
  const generateAndSaveLlmTxt = (outputDir: string) => {
    const docsDir = path.join(context.siteDir, 'docs');
    const docs = getAllMarkdownFiles(docsDir);

    // Sort docs by path for consistent ordering
    docs.sort((a, b) => a.path.localeCompare(b.path));

    const llmTxt = generateLlmTxt(
      docs,
      context.siteConfig.url,
      context.siteConfig.baseUrl.replace(/\/$/, '')
    );

    const outputPath = path.join(outputDir, 'llms.txt');
    fs.writeFileSync(outputPath, llmTxt, 'utf-8');

    return docs.length;
  };

  return {
    name: 'llm-txt-plugin',

    async postBuild({ outDir }) {
      const count = generateAndSaveLlmTxt(outDir);
      console.log(`[llm-txt-plugin] Generated llms.txt with ${count} documents`);
    },
  };
}
