import type { NavItem, PageId } from '../types/navigation';

interface SidebarProps {
  items: NavItem[];
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Sidebar({ items, activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">F</span>
        <span className="sidebar-brand-name">Food UI</span>
      </div>
      <nav className="sidebar-nav" aria-label="Main">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={activePage === item.id ? 'sidebar-link active' : 'sidebar-link'}
                aria-current={activePage === item.id ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
