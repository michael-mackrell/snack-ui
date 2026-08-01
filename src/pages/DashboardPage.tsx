import { StatCard } from '../components/StatCard';
import { useCatalogEntries } from '../hooks/useCatalogEntries';
import { useSnackInventory } from '../hooks/useSnackInventory';

export function DashboardPage() {
  const { entries, loading: catalogLoading } = useCatalogEntries();
  const { foods, loading: inventoryLoading } = useSnackInventory();
  const inventoryQuantity = foods.reduce((total, food) => total + food.quantity, 0);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
      </header>

      <div className="stat-grid">
        <StatCard
          title="Snack Catalog"
          value={entries.length}
          label={entries.length === 1 ? 'catalog entry' : 'catalog entries'}
          loading={catalogLoading}
        />
        <StatCard
          title="Snack Inventory"
          value={inventoryQuantity}
          label={inventoryQuantity === 1 ? 'inventory item' : 'inventory items'}
          loading={inventoryLoading}
        />
      </div>
    </section>
  );
}
