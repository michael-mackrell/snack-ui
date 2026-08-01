import { useState } from 'react';
import { AddSnackModal } from '../components/AddSnackModal';
import { Toast } from '../components/Toast';
import { useCatalogEntries } from '../hooks/useCatalogEntries';
import { useSnackInventory } from '../hooks/useSnackInventory';

export function SnackCatalogPage() {
  const { entries, loading, error, addEntry } = useCatalogEntries();
  const { addFood } = useSnackInventory({ auto: false });
  const [modalOpen, setModalOpen] = useState(false);
  const [addingUuid, setAddingUuid] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [inventoryError, setInventoryError] = useState<string | null>(null);

  const handleAddToInventory = async (uuid: string, name: string) => {
    setAddingUuid(uuid);
    setSuccessMessage(null);
    setInventoryError(null);
    try {
      const food = await addFood(uuid);
      setSuccessMessage(`${name} added to inventory. Quantity: ${food.quantity}.`);
    } catch (err) {
      setInventoryError(err instanceof Error ? err.message : 'Failed to add snack to inventory.');
    } finally {
      setAddingUuid(null);
    }
  };

  return (
    <section className="page">
      <header className="page-header page-header-row">
        <div>
          <h1>Snack Catalog</h1>
          <p className="page-subtitle">Food items available in the catalog.</p>
        </div>
        <button type="button" className="button primary" onClick={() => setModalOpen(true)}>
          Add Snack
        </button>
      </header>

      {loading && <p className="status-message">Loading catalog…</p>}
      {error && <p className="status-message error">{error.message}</p>}
      {inventoryError && <p className="status-message error">{inventoryError}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Protein (g)</th>
                <th>Carbs (g)</th>
                <th>Fat (g)</th>
                <th>Taste</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    No snacks in the catalog yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.uuid}>
                    <td>{entry.name}</td>
                    <td>{entry.calories}</td>
                    <td>{entry.protein}</td>
                    <td>{entry.carbs}</td>
                    <td>{entry.fat}</td>
                    <td>{entry.tasteRating}</td>
                    <td>
                      <button
                        type="button"
                        className="button add-to-inventory"
                        disabled={addingUuid === entry.uuid}
                        onClick={() => void handleAddToInventory(entry.uuid, entry.name)}
                      >
                        <span aria-hidden="true">+</span>
                        {addingUuid === entry.uuid ? 'Adding…' : 'Add to Inventory'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <AddSnackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={async (body) => {
          await addEntry(body);
        }}
      />
      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />
    </section>
  );
}
