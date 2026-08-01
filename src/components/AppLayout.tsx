import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { NAV_ITEMS, type PageId } from '../types/navigation';

interface AppLayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
}

export function AppLayout({ activePage, onNavigate, children }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar items={NAV_ITEMS} activePage={activePage} onNavigate={onNavigate} />
      <main className="app-main">{children}</main>
    </div>
  );
}
