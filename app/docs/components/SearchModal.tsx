'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { TOPICS } from '@/lib/docs-config';
import TopicIcon from './TopicIcon';

interface SearchRecord {
  title: string;
  slug: string[];
  excerpt: string;
  topic: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchRecord[]>([]);
  const [selected, setSelected] = useState(0);
  const [index, setIndex] = useState<Fuse<SearchRecord> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load search index on first open
  useEffect(() => {
    if (!isOpen || index) return;
    fetch('/api/search-index')
      .then((r) => r.json())
      .then((data: SearchRecord[]) => {
        setIndex(new Fuse(data, {
          keys: [
            { name: 'title', weight: 0.7 },
            { name: 'excerpt', weight: 0.3 },
          ],
          threshold: 0.4,
          includeScore: true,
        }));
      });
  }, [isOpen, index]);

  // Focus input and reset state when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setQuery('');
        setResults([]);
        setSelected(0);
      }, 50);
    }
  }, [isOpen]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else document.dispatchEvent(new CustomEvent('open-search'));
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSearch = (q: string) => {
    setQuery(q);
    setSelected(0);
    if (!index || !q.trim()) { setResults([]); return; }
    setResults(index.search(q).slice(0, 8).map((r) => r.item));
  };

  const navigate = (slug: string[]) => {
    router.push('/docs/' + slug.join('/'));
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && results[selected]) navigate(results[selected].slug);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Close search"
      />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <svg className="w-5 h-5 text-slate-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 text-slate-900 placeholder-slate-400 bg-transparent outline-none text-base"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-xs bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 cursor-pointer hover:bg-slate-200"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="py-2 max-h-80 overflow-y-auto" role="listbox">
            {results.map((r, i) => {
              const topicConfig = TOPICS[r.topic];
              return (
                <li key={r.slug.join('/')} role="option" aria-selected={i === selected}>
                  <button
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => navigate(r.slug)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      i === selected ? 'bg-slate-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className={topicConfig?.textClass || 'text-slate-400'}>
                      <TopicIcon topic={r.topic} className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">{r.title}</div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">{r.excerpt}</div>
                    </div>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${topicConfig?.badgeClass || 'bg-slate-100 text-slate-600'}`}>
                      {topicConfig?.label || r.topic}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-400">
            No results for <span className="font-medium text-slate-600">&ldquo;{query}&rdquo;</span>
          </div>
        )}

        {!query && (
          <div className="px-4 py-4">
            <p className="text-xs text-slate-400 mb-2">Quick links</p>
            <div className="flex flex-wrap gap-2">
              {['linux', 'docker', 'kubernetes', 'database', 'cloud'].map((t) => (
                <button
                  key={t}
                  onClick={() => navigate([t])}
                  className={`text-xs px-2.5 py-1 rounded-full border ${TOPICS[t]?.borderClass} ${TOPICS[t]?.textClass} ${TOPICS[t]?.bgClass} font-medium hover:opacity-80 transition-opacity`}
                >
                  {TOPICS[t]?.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
