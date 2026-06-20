'use client';

import Link from 'next/link';
import { FaLinux, FaWindows, FaDatabase, FaCloud } from 'react-icons/fa';
import { SiDocker, SiKubernetes, SiAnsible, SiVirtualbox } from 'react-icons/si';
import ScrollReveal from './ScrollReveal';

const topics = [
  { name: 'Linux',          slug: 'linux',          Icon: FaLinux,      color: 'bg-orange-500' },
  { name: 'Kubernetes',     slug: 'kubernetes',     Icon: SiKubernetes, color: 'bg-blue-500'   },
  { name: 'Docker',         slug: 'docker',         Icon: SiDocker,     color: 'bg-sky-500'    },
  { name: 'Cloud',          slug: 'cloud',          Icon: FaCloud,      color: 'bg-violet-500' },
  { name: 'Database',       slug: 'database',       Icon: FaDatabase,   color: 'bg-green-500'  },
  { name: 'Ansible',        slug: 'ansible',        Icon: SiAnsible,    color: 'bg-red-500'    },
  { name: 'Virtualization', slug: 'virtualization', Icon: SiVirtualbox, color: 'bg-pink-500'   },
  { name: 'Windows',        slug: 'windows',        Icon: FaWindows,    color: 'bg-indigo-500' },
];

export default function DocsSection() {
  return (
    <section id="docs" className="py-16 px-6 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal width="100%">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-1">Documentation</p>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                Technical Knowledge Base
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm max-w-lg">
                Hands-on guides and notes from real-world DevOps work across cloud, containers, and infrastructure.
              </p>
            </div>
            <Link
              href="/docs"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
            >
              Browse all docs <span aria-hidden="true">→</span>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal width="100%">
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <Link
                key={t.slug}
                href={`/docs/${t.slug}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <span className={`${t.color} p-1 rounded text-white`}>
                  <t.Icon className="w-3.5 h-3.5" />
                </span>
                {t.name}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
