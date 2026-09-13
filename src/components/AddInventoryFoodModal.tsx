import type { Food, InventoryFood } from '../api/types';

interface AddInventoryFoodModalProps {
  open: boolean;
  entries: Food[];
  inventoryFoods: InventoryFood[];
  loading: boolean;
  error: string | null;
  addingUuid: string | null;
  onAdd: (food: Food) => void;
  onAddNew: () => void;
  onClose: () => void;
}

export function AddInventoryFoodModal({
  open,
  entries,
  inventoryFoods,
  loading,
  error,
  addingUuid,
  onAdd,
  onAddNew,
  onClose,
}: AddInventoryFoodModalProps) {
  if (!open) return null;

  const quantities = new Map(inventoryFoods.map((food) => [food.uuid, food.quantity]));

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal modal-wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-inventory-food-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-header modal-header-with-action">
          <h2 id="add-inventory-food-title">Add Food to Inventory</h2>
          <div className="modal-header-actions">
            <button type="button" className="button primary" onClick={onAddNew}>
              Add New Food
            </button>
            <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        </header>

        <div className="modal-body">
          {loading && <p className="status-message">Loading catalog…</p>}
          {error && <p className="status-message error">{error}</p>}

          {!loading && entries.length === 0 && (
            <p className="empty-modal-message">The food catalog is empty. Add a new food to get started.</p>
          )}

          {!loading && entries.length > 0 && (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>In inventory</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.uuid}>
                      <td>{entry.name}</td>
                      <td>{quantities.get(entry.uuid) ?? 0}</td>
                      <td>
                        <button
                          type="button"
                          className="button add-to-inventory"
                          disabled={addingUuid !== null}
                          onClick={() => onAdd(entry)}
                        >
                          <span aria-hidden="true">+</span>
                          {addingUuid === entry.uuid ? 'Adding…' : 'Add'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
