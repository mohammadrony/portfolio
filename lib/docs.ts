/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface DocMeta {
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface NavItem {
  title: string;
  slug: string[];
  children?: NavItem[];
  isDir?: boolean;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export const CODE_EXTS: Record<string, string> = {
  '.sh':   'bash',
  '.bash': 'bash',
  '.yaml': 'yaml',
  '.yml':  'yaml',
  '.json': 'json',
  '.toml': 'toml',
  '.conf': 'nginx',
  '.env':  'bash',
};

const SUPPORTED_EXTS = ['.md', ...Object.keys(CODE_EXTS)];

function isUnderContentDir(resolvedPath: string): boolean {
  return resolvedPath === CONTENT_DIR || resolvedPath.startsWith(CONTENT_DIR + path.sep);
}

export function slugToFilePath(slug: string[]): string | null {
  const base = path.resolve(CONTENT_DIR, ...slug); // nosemgrep: path-join-resolve-traversal
  if (!isUnderContentDir(base)) return null;
  if (fs.existsSync(base + '.md')) return base + '.md';
  const idx = path.join(base, 'index.md'); // nosemgrep: path-join-resolve-traversal
  if (fs.existsSync(idx)) return idx;
  for (const ext of Object.keys(CODE_EXTS)) {
    if (fs.existsSync(base + ext)) return base + ext;
  }
  return null;
}

export function getDocContent(slug: string[]): { content: string; meta: DocMeta } | null {
  const filePath = slugToFilePath(slug);
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath);

  if (ext !== '.md') {
    const lang = CODE_EXTS[ext] || 'text';
    const filename = path.basename(filePath);
    return {
      content: `\`\`\`${lang}\n${raw}\n\`\`\``,
      meta: { title: filename },
    };
  }

  const { data, content } = matter(raw);
  const titleFromH1 = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const title = (data.title as string) || titleFromH1 || slugToTitle(slug[slug.length - 1]);
  return { content, meta: { ...data, title } };
}

export function isSlugDirectory(slug: string[]): boolean {
  const resolved = path.resolve(CONTENT_DIR, ...slug); // nosemgrep: path-join-resolve-traversal
  if (!isUnderContentDir(resolved)) return false;
  try {
    return fs.statSync(resolved).isDirectory();
  } catch {
    return false;
  }
}

export function getTopicNav(topic: string): NavItem[] {
  const dir = path.resolve(CONTENT_DIR, topic); // nosemgrep: path-join-resolve-traversal
  if (!isUnderContentDir(dir)) return [];
  if (!fs.existsSync(dir)) return [];
  return buildNavTree(dir, [topic]);
}

function buildNavTree(dir: string, prefix: string[]): NavItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const dirs: NavItem[] = [];
  const files: NavItem[] = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === 'index.md') continue;
    if (entry.name.startsWith('.')) continue;

    if (entry.isDirectory()) {
      const slug = [...prefix, entry.name];
      const idx = path.join(dir, entry.name, 'index.md'); // nosemgrep: path-join-resolve-traversal
      dirs.push({
        title: getTitle(idx, entry.name),
        slug,
        isDir: true,
        children: buildNavTree(path.join(dir, entry.name), slug), // nosemgrep: path-join-resolve-traversal
      });
    } else {
      const ext = path.extname(entry.name);
      if (!SUPPORTED_EXTS.includes(ext)) continue;
      const name = entry.name.slice(0, -ext.length);
      const slug = [...prefix, name];
      files.push({
        title: ext === '.md' ? getTitle(path.join(dir, entry.name), name) : entry.name, // nosemgrep: path-join-resolve-traversal
        slug,
      });
    }
  }

  return [...dirs, ...files];
}

export function getAllTopics(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter(
    (t) => fs.statSync(path.join(CONTENT_DIR, t)).isDirectory() // nosemgrep: path-join-resolve-traversal
  );
}

export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];
  const topics = getAllTopics();
  for (const topic of topics) {
    slugs.push([topic]);
    collectSlugs(path.join(CONTENT_DIR, topic), [topic], slugs); // nosemgrep: path-join-resolve-traversal
  }
  return slugs;
}

function collectSlugs(dir: string, prefix: string[], acc: string[][]): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (entry.isDirectory()) {
      const slug = [...prefix, entry.name];
      acc.push(slug);
      collectSlugs(path.join(dir, entry.name), slug, acc); // nosemgrep: path-join-resolve-traversal
    } else {
      const ext = path.extname(entry.name);
      if (!SUPPORTED_EXTS.includes(ext)) continue;
      if (entry.name === 'index.md') continue;
      acc.push([...prefix, entry.name.slice(0, -ext.length)]);
    }
  }
}

export function countDocs(topic: string): number {
  const dir = path.join(CONTENT_DIR, topic); // nosemgrep: path-join-resolve-traversal
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(d, entry.name)); // nosemgrep: path-join-resolve-traversal
      else {
        const ext = path.extname(entry.name);
        if (SUPPORTED_EXTS.includes(ext) && entry.name !== 'index.md') count++;
      }
    }
  };
  walk(dir);
  return count;
}

export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)$/);
    if (m) {
      const text = m[2].trim();
      headings.push({
        level: m[1].length,
        text,
        id: slugifyHeading(text),
      });
    }
  }
  return headings;
}

export interface NavNeighbors {
  prev: { title: string; slug: string[] } | null;
  next: { title: string; slug: string[] } | null;
}

export function getNavNeighbors(slug: string[]): NavNeighbors {
  if (slug.length < 1) return { prev: null, next: null };
  const topic = slug[0];
  const all = flattenNav([{ title: topic, slug: [topic], isDir: true, children: getTopicNav(topic) }]);
  const idx = all.findIndex((item) => item.slug.join('/') === slug.join('/'));
  return {
    prev: idx > 0 ? { title: all[idx - 1].title, slug: all[idx - 1].slug } : null,
    next: idx >= 0 && idx < all.length - 1 ? { title: all[idx + 1].title, slug: all[idx + 1].slug } : null,
  };
}

function flattenNav(items: NavItem[]): NavItem[] {
  const result: NavItem[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children) result.push(...flattenNav(item.children));
  }
  return result;
}

export interface SearchRecord {
  title: string;
  slug: string[];
  excerpt: string;
  topic: string;
}

export function buildSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];
  const slugs = getAllDocSlugs();
  for (const slug of slugs) {
    const doc = getDocContent(slug);
    if (!doc) continue;
    const plainText = doc.content.replace(/```[\s\S]*?```/g, '').replace(/[#*`[\]()]/g, '').trim();
    records.push({
      title: doc.meta.title as string,
      slug,
      excerpt: plainText.slice(0, 200),
      topic: slug[0],
    });
  }
  return records;
}

function getTitle(filePath: string, fallback: string): string {
  if (!fs.existsSync(filePath)) return slugToTitle(fallback);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  if (data.title) return data.title as string;
  const m = content.match(/^#\s+(.+)$/m);
  return m?.[1]?.trim() || slugToTitle(fallback);
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
