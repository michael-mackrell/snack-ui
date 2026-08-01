export type PageId = 'dashboard' | 'catalog' | 'inventory';

export interface NavItem {
  id: PageId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'catalog', label: 'Snack Catalog' },
  { id: 'inventory', label: 'Snack Inventory' },
];
