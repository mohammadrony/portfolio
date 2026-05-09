'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavItem } from '@/lib/docs';
import { TOPICS, TOPIC_ORDER } from '@/lib/docs-config';
import TopicIcon from './TopicIcon';

interface Props {
  currentSlug: string[];
  nav: NavItem[];
  topic: string;
  allTopics: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentSlug, nav, topic, allTopics, isOpen, onClose }: Props) {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());

  // Auto-expand dirs that contain the current page
  useEffect(() => {
    const toExpand = new Set<string>();
    for (let i = 1; i < currentSlug.length; i++) {
      toExpand.add(currentSlug.slice(0, i).join('/'));
    }
    setExpandedDirs(toExpand);
  }, [currentSlug]);

  const toggleDir = (key: string) => {
    setExpandedDirs((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const orderedTopics = TOPIC_ORDER.filter((t) => allTopics.includes(t));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-72 bg-white border-r border-slate-200
          transform transition-transform duration-200
          lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-4rem)] lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 lg:hidden">
          <span className="font-semibold text-slate-900">Documentation</span>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Topic switcher */}
        <div className="px-3 pt-4 pb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2 px-1">Topics</p>
          <div className="grid grid-cols-2 gap-1">
            {orderedTopics.map((t) => {
              const config = TOPICS[t];
              const isActive = t === topic;
              return (
                <Link
                  key={t}
                  href={`/docs/${t}`}
                  onClick={onClose}
                  className={`
                    flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-colors
                    ${isActive
                      ? `${config.bgClass} ${config.textClass}`
                      : 'text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <span className={isActive ? config.textClass : 'text-slate-400'}>
                    <TopicIcon topic={t} className="w-3.5 h-3.5" />
                  </span>
                  {config?.label || t}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-100 mx-3 my-2" />

        {/* Current topic nav */}
        <nav className="px-3 pb-8" aria-label="Documentation navigation">
          <div className="mb-1">
            <Link
              href={`/docs/${topic}`}
              onClick={onClose}
              className={`
                flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-semibold transition-colors
                ${currentSlug.length === 1
                  ? `${TOPICS[topic]?.bgClass} ${TOPICS[topic]?.textClass}`
                  : 'text-slate-700 hover:bg-slate-100'
                }
              `}
            >
              <span className={TOPICS[topic]?.textClass}>
                <TopicIcon topic={topic} className="w-4 h-4" />
              </span>
              {TOPICS[topic]?.label || topic}
            </Link>
          </div>

          <NavTree
            items={nav}
            currentSlug={currentSlug}
            expandedDirs={expandedDirs}
            onToggle={toggleDir}
            onNavigate={onClose}
            depth={0}
            topicConfig={TOPICS[topic]}
          />
        </nav>
      </aside>
    </>
  );
}

interface TreeProps {
  items: NavItem[];
  currentSlug: string[];
  expandedDirs: Set<string>;
  onToggle: (key: string) => void;
  onNavigate: () => void;
  depth: number;
  topicConfig: typeof TOPICS[string];
}

function NavTree({ items, currentSlug, expandedDirs, onToggle, onNavigate, depth, topicConfig }: TreeProps) {
  return (
    <ul className={depth > 0 ? 'ml-3 border-l border-slate-100 pl-2' : ''}>
      {items.map((item) => {
        const key = item.slug.join('/');
        const isActive = key === currentSlug.join('/');
        const isExpanded = expandedDirs.has(key);

        if (item.isDir) {
          return (
            <li key={key}>
              <button
                onClick={() => onToggle(key)}
                className={`
                  w-full flex items-center justify-between gap-1 px-2 py-1.5 rounded-md text-sm transition-colors text-left
                  ${isActive ? `${topicConfig?.bgClass} ${topicConfig?.textClass}` : 'text-slate-600 hover:bg-slate-50'}
                `}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span className="text-slate-400">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                    </svg>
                  </span>
                  <span className="truncate">{item.title}</span>
                </span>
                <svg
                  className={`w-3.5 h-3.5 flex-shrink-0 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                >
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>

              {isExpanded && item.children && (
                <NavTree
                  items={item.children}
                  currentSlug={currentSlug}
                  expandedDirs={expandedDirs}
                  onToggle={onToggle}
                  onNavigate={onNavigate}
                  depth={depth + 1}
                  topicConfig={topicConfig}
                />
              )}
            </li>
          );
        }

        return (
          <li key={key}>
            <Link
              href={`/docs/${item.slug.join('/')}`}
              onClick={onNavigate}
              className={`
                flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm transition-colors
                ${isActive
                  ? `${topicConfig?.bgClass} ${topicConfig?.textClass} font-medium`
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <span className={`flex-shrink-0 ${isActive ? topicConfig?.textClass : 'text-slate-300'}`}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </span>
              <span className="truncate">{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
