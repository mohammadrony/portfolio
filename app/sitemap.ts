import type { MetadataRoute } from 'next';
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mohammadrony.com',
      lastModified: new Date('2025-04-11'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
