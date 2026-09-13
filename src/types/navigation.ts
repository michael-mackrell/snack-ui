export type PageId = 'dashboard' | 'catalog' | 'inventory';

export interface NavItem {
  id: PageId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'catalog', label: 'Food Catalog' },
  { id: 'inventory', label: 'Food Inventory' },
];
