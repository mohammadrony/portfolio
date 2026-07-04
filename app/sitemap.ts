import type { MetadataRoute } from 'next';
import { getAllDocSlugs, slugToFilePath } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mohammadrony.com';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/docs`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Excludes redirect-only directory slugs and noindexed code-file dumps.
  const docRoutes: MetadataRoute.Sitemap = getAllDocSlugs()
    .filter((slug) => slugToFilePath(slug)?.endsWith('.md'))
    .map((slug) => ({
      url: `${base}/docs/${slug.join('/')}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...docRoutes];
}
