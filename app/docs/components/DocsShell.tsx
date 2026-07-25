'use client';

import { useState, useSyncExternalStore } from 'react';
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

const DESKTOP_SIDEBAR_KEY = 'docs-sidebar-open';

let desktopSidebarListeners: Array<() => void> = [];

function subscribeDesktopSidebar(callback: () => void) {
  desktopSidebarListeners.push(callback);
  return () => {
    desktopSidebarListeners = desktopSidebarListeners.filter((l) => l !== callback);
  };
}

function getDesktopSidebarSnapshot() {
  return localStorage.getItem(DESKTOP_SIDEBAR_KEY) !== 'false';
}

function getDesktopSidebarServerSnapshot() {
  return true;
}

function setDesktopSidebarOpen(value: boolean) {
  localStorage.setItem(DESKTOP_SIDEBAR_KEY, String(value));
  desktopSidebarListeners.forEach((l) => l());
}

export default function DocsShell({ children, currentSlug, nav, topic, allTopics }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const desktopOpen = useSyncExternalStore(
    subscribeDesktopSidebar,
    getDesktopSidebarSnapshot,
    getDesktopSidebarServerSnapshot
  );

  const toggleDesktop = () => setDesktopSidebarOpen(!desktopOpen);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <DocsNav
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
        mobileSidebarOpen={sidebarOpen}
        desktopSidebarOpen={desktopOpen}
        onToggleDesktopSidebar={toggleDesktop}
      />
      <div className="flex">
        <Sidebar
          currentSlug={currentSlug}
          nav={nav}
          topic={topic}
          allTopics={allTopics}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          desktopOpen={desktopOpen}
        />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
