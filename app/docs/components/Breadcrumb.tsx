import Link from 'next/link';
import { TOPICS } from '@/lib/docs-config';

interface Props {
  slug: string[];
  titles: string[];
}

export default function Breadcrumb({ slug, titles }: Props) {
  const crumbs = [
    { label: 'Docs', href: '/docs' },
    ...slug.map((_, i) => ({
      label: i === 0 ? (TOPICS[slug[i]]?.label || titles[i]) : titles[i],
      href: '/docs/' + slug.slice(0, i + 1).join('/'),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg className="w-3.5 h-3.5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          )}
          {i === crumbs.length - 1 ? (
            <span className="text-slate-700 font-medium truncate max-w-[200px]">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-slate-700 transition-colors truncate max-w-[120px]">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
