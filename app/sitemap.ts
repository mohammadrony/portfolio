import type { MetadataRoute } from 'next';
import { getAllDocSlugs } from '@/lib/docs';

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

  const docRoutes: MetadataRoute.Sitemap = getAllDocSlugs().map((slug) => ({
    url: `${base}/docs/${slug.join('/')}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...docRoutes];
}
