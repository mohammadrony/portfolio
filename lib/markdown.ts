import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

// Rewrites relative .md links to absolute /docs/ paths so in-content links don't 404.
// basePath is the directory that owns the current doc, e.g. /docs/database/mongo/
function rewriteMdLinks(basePath: string) {
  return (tree: Parameters<typeof visit>[0]) => {
    visit(tree, 'element', (node: Record<string, unknown>) => {
      if (node.tagName !== 'a') return;
      const props = node.properties as Record<string, unknown> | undefined;
      if (!props?.href) return;
      const href = String(props.href);
      if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) return;
      if (!href.includes('.md')) return;

      const [hrefPath, fragment] = href.split('#');
      // Strip .md extension
      let resolved = hrefPath.replace(/\.md$/, '');
      // README.md → directory index (no filename in URL, just parent path)
      resolved = resolved.replace(/\/README$/i, '').replace(/^README$/i, '.');

      try {
        const url = new URL(resolved || '.', `http://x${basePath}`);
        props.href = url.pathname + (fragment ? '#' + fragment : '');
      } catch {
        // leave href unchanged on parse failure
      }
    });
  };
}

export async function markdownToHtml(markdown: string, basePath?: string): Promise<string> {
  let proc = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' });

  if (basePath) {
    proc = proc.use(() => rewriteMdLinks(basePath));
  }

  const result = await proc
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(result);
}
