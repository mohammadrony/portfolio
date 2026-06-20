import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

const DOCS_EXTENSIONS = /\.(md|sh|bash|yaml|yml|json|toml|conf|env)$/i;

function rewriteDocLinks(basePath: string) {
  return (tree: Parameters<typeof visit>[0]) => {
    visit(tree, 'element', (node: Record<string, unknown>) => {
      if (node.tagName !== 'a') return;
      const props = node.properties as Record<string, unknown> | undefined;
      if (!props?.href) return;
      const href = String(props.href);
      if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) return;

      const [hrefPath, fragment] = href.split('#');
      if (!DOCS_EXTENSIONS.test(hrefPath)) return;

      let resolved = hrefPath.replace(DOCS_EXTENSIONS, '');
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
    proc = proc.use(() => rewriteDocLinks(basePath));
  }

  const result = await proc
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(result);
}
