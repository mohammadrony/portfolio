import type { Metadata } from 'next';
import fs from 'fs';
import { notFound, redirect } from 'next/navigation';
import {
  getDocContent,
  getTopicNav,
  getAllDocSlugs,
  extractHeadings,
  getNavNeighbors,
  getAllTopics,
  slugToFilePath,
  isSlugDirectory,
} from '@/lib/docs';
import { markdownToHtml } from '@/lib/markdown';
import { TOPICS } from '@/lib/docs-config';
import DocsShell from '../components/DocsShell';
import Breadcrumb from '../components/Breadcrumb';
import TableOfContents from '../components/TableOfContents';
import PrevNext from '../components/PrevNext';
import CopyCodeButton from '../components/CopyCodeButton';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocContent(slug);
  if (!doc) return { title: 'Not Found' };

  const topic = slug[0];
  const topicLabel = TOPICS[topic]?.label || topic;
  const title = `${doc.meta.title} | ${topicLabel} | Md. Rony Docs`;
  const plainText = doc.content.replace(/```[\s\S]*?```/g, '').replace(/[#*`[\]()]/g, '').trim();
  const description = (doc.meta.description as string) || plainText.slice(0, 155);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;

  return {
    title,
    description,
    alternates: { canonical: `/docs/${slug.join('/')}` },
    openGraph: {
      title,
      description,
      url: `https://mohammadrony.com/docs/${slug.join('/')}`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1731, height: 909 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og-image.png'],
    },
    ...(wordCount < 80 ? { robots: { index: false } } : {}),
  };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocContent(slug);
  if (!doc) {
    if (isSlugDirectory(slug)) {
      const parent = slug.length > 1 ? `/docs/${slug.slice(0, -1).join('/')}` : '/docs';
      redirect(parent);
    }
    notFound();
  }

  const topic = slug[0];
  const nav = getTopicNav(topic);
  const allTopics = getAllTopics();
  const headings = extractHeadings(doc.content);
  const neighbors = getNavNeighbors(slug);
  const topicConfig = TOPICS[topic];
  // Compute base path so relative .md links inside content are rewritten correctly
  const filePath = slugToFilePath(slug);
  const dateModified = filePath ? fs.statSync(filePath).mtime.toISOString() : new Date().toISOString();
  const isIndex = filePath?.endsWith('index.md') ?? false;
  const dirSlug = isIndex ? slug : slug.slice(0, -1);
  const basePath = `/docs/${dirSlug.join('/')}/`;

  const htmlContent = await markdownToHtml(doc.content, basePath);

  // Build breadcrumb titles
  const titles = slug.map((_, i) => {
    const partDoc = getDocContent(slug.slice(0, i + 1));
    return partDoc?.meta.title || slug[i];
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: doc.meta.title,
    description: doc.meta.description || '',
    url: `https://mohammadrony.com/docs/${slug.join('/')}`,
    datePublished: dateModified,
    dateModified,
    author: {
      '@type': 'Person',
      name: 'Md. Asaduzzaman Rony',
      url: 'https://mohammadrony.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Md. Asaduzzaman Rony',
    },
    inLanguage: 'en',
    about: topicConfig?.label || topic,
  };

  return (
    <DocsShell currentSlug={slug} nav={nav} topic={topic} allTopics={allTopics}>
      <div className="flex gap-8 max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Main content */}
        <article className="flex-1 min-w-0 max-w-3xl">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> {/* nosemgrep: react-dangerouslysetinnerhtml */}

          <Breadcrumb slug={slug} titles={titles} />

          <div className="docs-prose" dangerouslySetInnerHTML={{ __html: htmlContent }} /> {/* nosemgrep: react-dangerouslysetinnerhtml */}

          <CopyCodeButton />
          <PrevNext neighbors={neighbors} />
        </article>

        {/* Right TOC */}
        <TableOfContents headings={headings} />
      </div>
    </DocsShell>
  );
}
