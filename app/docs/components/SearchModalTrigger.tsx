'use client';

import { useState } from 'react';
import SearchModal from './SearchModal';

export default function SearchModalTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 w-full max-w-md mx-auto text-left bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-500 px-4 py-3 rounded-xl transition-all"
        aria-label="Search documentation"
      >
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <span className="flex-1 text-sm">Search documentation...</span>
        <kbd className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 flex-shrink-0">⌘K</kbd>
      </button>
      <SearchModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
