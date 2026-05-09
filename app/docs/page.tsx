import type { Metadata } from 'next';
import Link from 'next/link';
import { countDocs, getAllTopics } from '@/lib/docs';
import { TOPICS, TOPIC_ORDER } from '@/lib/docs-config';
import TopicIcon from './components/TopicIcon';
import DocsNavStatic from './components/DocsNavStatic';
import SearchModalTrigger from './components/SearchModalTrigger';

export const metadata: Metadata = {
  title: 'Documentation | Md. Rony',
  description:
    'Technical documentation covering Linux, Docker, Kubernetes, Database, Cloud, Windows, Virtualization, Ansible, and Islamic topics.',
  alternates: { canonical: '/docs' },
  openGraph: {
    title: 'Documentation | Md. Rony',
    description: 'Comprehensive technical docs: Linux, Docker, Kubernetes, Cloud, and more.',
    url: 'https://mohammadrony.com/docs',
  },
};

export default function DocsLandingPage() {
  const allTopics = getAllTopics();
  const orderedTopics = TOPIC_ORDER.filter((t) => allTopics.includes(t));
  const totalDocs = orderedTopics.reduce((sum, t) => sum + countDocs(t), 0);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <DocsNavStatic />

      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-sm font-medium px-3 py-1.5 rounded-full mb-5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            </svg>
            {totalDocs}+ documents across {orderedTopics.length} topics
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Technical Documentation
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-8">
            Personal notes and guides on DevOps, infrastructure, and more — always evolving.
          </p>

          {/* Search bar */}
          <SearchModalTrigger />
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderedTopics.map((topic) => {
            const config = TOPICS[topic];
            const count = countDocs(topic);
            if (!config) return null;
            return (
              <Link
                key={topic}
                href={`/docs/${topic}`}
                className={`
                  group relative flex flex-col p-5 rounded-2xl border transition-all duration-200
                  bg-white hover:${config.bgClass}
                  border-slate-200 hover:${config.borderClass}
                  hover:shadow-sm
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`p-2.5 rounded-xl ${config.bgClass} ${config.textClass} transition-transform group-hover:scale-110`}>
                    <TopicIcon topic={topic} className="w-5 h-5" />
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badgeClass}`}>
                    {count} docs
                  </span>
                </div>

                <h2 className="font-semibold text-slate-900 text-base mb-1 group-hover:text-slate-700">
                  {config.label}
                </h2>
                <p className="text-sm text-slate-500 flex-1 leading-relaxed">
                  {config.description}
                </p>

                <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${config.textClass} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Browse docs
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            </svg>
            <span><strong className="text-slate-600">{totalDocs}+</strong> documents</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
            </svg>
            <span><strong className="text-slate-600">{orderedTopics.length}</strong> topics</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            <span>Continuously updated</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>No account needed</span>
          </div>
        </div>
      </main>
    </div>
  );
}
