import { StatCard } from '../components/StatCard';
import { useCatalogEntries } from '../hooks/useCatalogEntries';
import { useFoodInventory } from '../hooks/useFoodInventory';
import type { PageId } from '../types/navigation';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { entries, loading: catalogLoading } = useCatalogEntries();
  const { foods, loading: inventoryLoading } = useFoodInventory();
  const inventoryQuantity = foods.reduce((total, food) => total + food.quantity, 0);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
      </header>

      <div className="stat-grid">
        <StatCard
          title="Food Catalog"
          value={entries.length}
          label={entries.length === 1 ? 'catalog entry' : 'catalog entries'}
          loading={catalogLoading}
          onClick={() => onNavigate('catalog')}
        />
        <StatCard
          title="Food Inventory"
          value={inventoryQuantity}
          label={inventoryQuantity === 1 ? 'inventory item' : 'inventory items'}
          loading={inventoryLoading}
          onClick={() => onNavigate('inventory')}
        />
      </div>
    </section>
  );
}
