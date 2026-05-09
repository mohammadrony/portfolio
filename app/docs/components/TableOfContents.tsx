'use client';

import { useEffect, useState } from 'react';
import { Heading } from '@/lib/docs';

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          On this page
        </p>
        <nav aria-label="Table of contents">
          <ul className="space-y-1">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: h.level === 1 ? 0 : h.level === 2 ? 0 : 12 }}>
                <a
                  href={`#${h.id}`}
                  className={`
                    block text-sm py-0.5 leading-snug transition-colors truncate
                    ${activeId === h.id
                      ? 'text-slate-900 font-medium'
                      : 'text-slate-500 hover:text-slate-700'
                    }
                  `}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
