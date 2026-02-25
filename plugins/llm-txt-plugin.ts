import type { Plugin, LoadContext } from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';

interface DocContent {
  title: string;
  description: string;
  urlPath: string;
  content: string;
  category: string;
}

// ============================================================
// ADAPT THESE FOR YOUR SITE
// ============================================================

// Map directory names to display category names
const CATEGORY_NAMES: Record<string, string> = {
  'draw-modes': 'Draw Modes',
  'edit-modes': 'Edit Modes',
  'helper-modes': 'Helper Modes',
};

// Map standalone files (by URL slug) to categories
const STANDALONE_CATEGORIES: Record<string, string> = {
  'basics': 'Getting Started',
  'configuring-geoman': 'Getting Started',
  'events': 'Getting Started',
  'mode-switching': 'Getting Started',
  'importing-data': 'Data',
  'exporting-data': 'Data',
  'feature-ids': 'Data',
  'examples': 'Other',
  'geoman-instance-api': 'API Reference',
  'geoman-options-api': 'API Reference',
  'features-instance': 'API Reference',
};

// Category display order
const CATEGORY_ORDER = [
  'Getting Started',
  'Draw Modes',
  'Edit Modes',
  'Helper Modes',
  'Data',
  'API Reference',
  'Other',
];

// Site name and description for the llms.txt header
const SITE_NAME = 'MapLibre-Geoman';
const SITE_DESCRIPTION =
  'MapLibre-Geoman is a MapLibre plugin for creating and editing geometry layers. It supports drawing, editing, dragging, cutting, rotating, splitting, scaling, measuring, snapping, and pinning markers, polygons, polylines, circles, rectangles, and more.';

// ============================================================
// GENERIC LOGIC BELOW — no changes needed
// ============================================================

function extractFrontmatter(content: string): {
  title: string;
  description: string;
  slug: string;
  body: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  let title = '';
  let description = '';
  let slug = '';
  let body = content;

  if (match) {
    const frontmatter = match[1];
    const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }
    const descMatch = frontmatter.match(
      /description:\s*["']?([^"'\n]+)["']?/
    );
    if (descMatch) {
      description = descMatch[1].trim();
    }
    const slugMatch = frontmatter.match(/slug:\s*["']?([^"'\n]+)["']?/);
    if (slugMatch) {
      slug = slugMatch[1].trim();
    }
    body = content.slice(match[0].length);
  }

  if (!title) {
    const headingMatch = body.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      title = headingMatch[1].trim();
    }
  }

  return { title, description, slug, body };
}

function stripMdxComponents(content: string): string {
  // Preserve code blocks
  const codeBlocks: string[] = [];
  let cleaned = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Remove import statements
  cleaned = cleaned.replace(/^import\s+.*$/gm, '');

  // Remove self-closing JSX components: <Component />
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, '');

  // Remove JSX component blocks (including multiline)
  let prev = '';
  while (prev !== cleaned) {
    prev = cleaned;
    cleaned = cleaned.replace(
      /<([A-Z][a-zA-Z]*)[^>]*>[\s\S]*?<\/\1>/g,
      ''
    );
  }

  // Remove HTML image tags
  cleaned = cleaned.replace(/<img[^>]*\/?>/gi, '');

  // Remove markdown images (![alt](url))
  cleaned = cleaned.replace(/!\[[^\]]*\]\([^)]+\)/g, '');

  // Remove <details>/<summary> tags but keep inner content
  cleaned = cleaned.replace(/<\/?details[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/?summary[^>]*>/gi, '');

  // Remove inline HTML div wrappers
  cleaned = cleaned.replace(/<div[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/div>/gi, '');

  // Restore code blocks
  cleaned = cleaned.replace(/__CODE_BLOCK_(\d+)__/g, (_, i) => codeBlocks[parseInt(i)]);

  // Collapse multiple blank lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

function stripLeadingHeading(content: string, title: string): string {
  const normalizedTitle = title.replace(/[⭐\s]+$/g, '').trim().toLowerCase();
  return content.replace(/^(#{1,6})\s+(.+)\n*/, (match, _hashes, heading) => {
    const normalizedHeading = heading.replace(/[⭐\s]+$/g, '').trim().toLowerCase();
    return normalizedHeading === normalizedTitle ? '' : match;
  });
}

function computeUrlPath(relativePath: string, slug: string): string {
  if (slug) {
    return slug.replace(/^\//, '');
  }

  return (
    relativePath
      .replace(/\\/g, '/')
      .replace(/\.mdx?$/, '')
      // Strip numeric prefixes: "01-basics" → "basics", "03a-draw-ellipse" → "draw-ellipse"
      .replace(/^\d+[a-z]?-/, '')
      .replace(/\/\d+[a-z]?-/g, '/')
      // Remove trailing "index"
      .replace(/\/?index$/, '')
  );
}

function getCategory(relativePath: string, urlPath: string): string {
  const normalizedPath = relativePath.replace(/\\/g, '/');
  const dir = normalizedPath.split('/')[0];

  if (normalizedPath.includes('/') && CATEGORY_NAMES[dir]) {
    return CATEGORY_NAMES[dir];
  }

  const slug = urlPath.replace(/\/$/, '');
  if (STANDALONE_CATEGORIES[slug]) {
    return STANDALONE_CATEGORIES[slug];
  }

  return '';
}

function getAllMarkdownFiles(
  dir: string,
  baseDir: string = dir
): DocContent[] {
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
      const { title, description, slug, body } = extractFrontmatter(content);
      const cleanedContent = stripMdxComponents(body);

      const relativePath = path.relative(baseDir, fullPath);
      const urlPath = computeUrlPath(relativePath, slug);
      const category = getCategory(relativePath, urlPath);

      docs.push({
        title: title || path.basename(item, path.extname(item)),
        description,
        urlPath,
        content: cleanedContent,
        category,
      });
    }
  }

  return docs;
}

function generateLlmsIndex(
  docs: DocContent[],
  siteUrl: string,
  baseUrl: string
): string {
  const fullUrl = (urlPath: string) =>
    urlPath ? `${siteUrl}${baseUrl}/${urlPath}` : `${siteUrl}${baseUrl}`;

  const grouped = new Map<string, DocContent[]>();
  for (const doc of docs) {
    if (!doc.category) continue;
    if (!grouped.has(doc.category)) {
      grouped.set(doc.category, []);
    }
    grouped.get(doc.category)!.push(doc);
  }

  let output = `# ${SITE_NAME}\n\n> ${SITE_DESCRIPTION} Source: ${siteUrl}${baseUrl}\n\n`;

  for (const categoryName of CATEGORY_ORDER) {
    const categoryDocs = grouped.get(categoryName);
    if (!categoryDocs || categoryDocs.length === 0) continue;

    output += `## ${categoryName}\n\n`;

    for (const doc of categoryDocs) {
      const desc = doc.description ? `: ${doc.description}` : '';
      output += `- [${doc.title}](${fullUrl(doc.urlPath)})${desc}\n`;
    }

    output += '\n';
  }

  return output.trim() + '\n';
}

function generateLlmsFull(
  docs: DocContent[],
  siteUrl: string,
  baseUrl: string
): string {
  const fullUrl = (urlPath: string) =>
    urlPath ? `${siteUrl}${baseUrl}/${urlPath}` : `${siteUrl}${baseUrl}`;

  let output = `# ${SITE_NAME} Documentation (Full)\n\n`;
  output += `> Complete documentation for ${SITE_NAME}.\n`;
  output += `> Source: ${siteUrl}${baseUrl}\n`;
  output += `> Index: ${siteUrl}${baseUrl}/llms.txt\n\n---\n\n`;

  for (const doc of docs) {
    output += `## ${doc.title}\n\n`;
    if (doc.description) {
      output += `> ${doc.description}\n\n`;
    }
    output += `**URL:** ${fullUrl(doc.urlPath)}\n\n`;
    output += `${stripLeadingHeading(doc.content, doc.title)}\n\n`;
    output += `---\n\n`;
  }

  return output;
}

function generateAllFiles(
  context: LoadContext,
  outputDir: string,
  options: { includeMdFiles: boolean }
) {
  const docsDir = path.join(context.siteDir, 'docs');
  const docs = getAllMarkdownFiles(docsDir);

  docs.sort((a, b) => a.urlPath.localeCompare(b.urlPath));

  const siteUrl = context.siteConfig.url;
  const baseUrl = context.siteConfig.baseUrl.replace(/\/$/, '');

  const llmsIndex = generateLlmsIndex(docs, siteUrl, baseUrl);
  fs.writeFileSync(path.join(outputDir, 'llms.txt'), llmsIndex, 'utf-8');

  const llmsFull = generateLlmsFull(docs, siteUrl, baseUrl);
  fs.writeFileSync(path.join(outputDir, 'llms-full.txt'), llmsFull, 'utf-8');

  if (options.includeMdFiles) {
    for (const doc of docs) {
      if (!doc.urlPath) continue;

      const mdOutputPath = path.join(outputDir, doc.urlPath + '.md');
      fs.mkdirSync(path.dirname(mdOutputPath), { recursive: true });

      const bodyContent = stripLeadingHeading(doc.content, doc.title);
      let mdContent = `# ${doc.title}\n\n`;
      if (doc.description) {
        mdContent += `> ${doc.description}\n\n`;
      }
      mdContent += bodyContent + '\n';

      fs.writeFileSync(mdOutputPath, mdContent, 'utf-8');
    }
  }

  return docs.length;
}

export default function llmTxtPlugin(context: LoadContext): Plugin {
  return {
    name: 'llm-txt-plugin',

    // Generate to static/ so files are served during dev
    async loadContent() {
      const staticDir = path.join(context.siteDir, 'static');
      generateAllFiles(context, staticDir, { includeMdFiles: false });
      console.log('[llm-txt] Generated llms.txt and llms-full.txt in static/');
    },

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'alternate',
              type: 'text/markdown',
              href: `${context.siteConfig.baseUrl}llms.txt`,
            },
          },
        ],
      };
    },

    // Generate full set (including per-page .md files) to build output
    async postBuild(props) {
      const count = generateAllFiles(context, props.outDir, {
        includeMdFiles: true,
      });
      console.log(
        `[llm-txt] Generated llms.txt, llms-full.txt, and ${count} .md files in build/`
      );
    },
  };
}
