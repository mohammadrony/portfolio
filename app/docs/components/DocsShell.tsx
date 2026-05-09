'use client';

import { useState } from 'react';
import DocsNav from './DocsNav';
import Sidebar from './Sidebar';
import { NavItem } from '@/lib/docs';

interface Props {
  children: React.ReactNode;
  currentSlug: string[];
  nav: NavItem[];
  topic: string;
  allTopics: string[];
}

export default function DocsShell({ children, currentSlug, nav, topic, allTopics }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <DocsNav onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar
          currentSlug={currentSlug}
          nav={nav}
          topic={topic}
          allTopics={allTopics}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
