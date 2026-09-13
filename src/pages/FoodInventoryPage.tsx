import { useRef, useState } from 'react';
import type { CreateFoodRequest, Food } from '../api/types';
import { AddFoodModal } from '../components/AddFoodModal';
import { AddInventoryFoodModal } from '../components/AddInventoryFoodModal';
import { Toast } from '../components/Toast';
import { useCatalogEntries } from '../hooks/useCatalogEntries';
import { useFoodInventory } from '../hooks/useFoodInventory';

export function FoodInventoryPage() {
  const { foods, loading, error, addFood } = useFoodInventory();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [newFoodOpen, setNewFoodOpen] = useState(false);
  const [addingUuid, setAddingUuid] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const returnToPickerOnClose = useRef(true);
  const {
    entries,
    loading: catalogLoading,
    error: catalogError,
    addEntry,
  } = useCatalogEntries({ auto: pickerOpen });

  const handleAddExistingFood = async (food: Food) => {
    setAddingUuid(food.uuid);
    setActionError(null);
    try {
      const stockedFood = await addFood(food.uuid);
      setPickerOpen(false);
      setSuccessMessage(`${food.name} added to inventory. Quantity: ${stockedFood.quantity}.`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to add food to inventory.');
    } finally {
      setAddingUuid(null);
    }
  };

  const handleCreateAndAddFood = async (body: CreateFoodRequest) => {
    const created = await addEntry(body);
    try {
      const stockedFood = await addFood(created.uuid);
      setSuccessMessage(`${created.name} added to the catalog and inventory. Quantity: ${stockedFood.quantity}.`);
    } catch (err) {
      setActionError(
        `${created.name} was added to the catalog, but could not be added to inventory. ${
          err instanceof Error ? err.message : 'Please try adding it from the catalog list.'
        }`,
      );
      setPickerOpen(true);
    }
  };

  return (
    <section className="page">
      <header className="page-header page-header-row">
        <div>
          <h1>Food Inventory</h1>
          <p className="page-subtitle">Foods currently in stock.</p>
        </div>
        <button
          type="button"
          className="button primary"
          onClick={() => {
            setActionError(null);
            setPickerOpen(true);
          }}
        >
          Add Food
        </button>
      </header>

      {loading && <p className="status-message">Loading inventory…</p>}
      {error && <p className="status-message error">{error.message}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Taste</th>
              </tr>
            </thead>
            <tbody>
              {foods.length === 0 ? (
                <tr>
                  <td colSpan={3} className="empty-cell">
                    No foods are currently in inventory.
                  </td>
                </tr>
              ) : (
                foods.map((food) => (
                  <tr key={food.uuid}>
                    <td>{food.name}</td>
                    <td>{food.quantity}</td>
                    <td>{food.tasteRating}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <AddInventoryFoodModal
        open={pickerOpen}
        entries={entries}
        inventoryFoods={foods}
        loading={catalogLoading}
        error={actionError ?? catalogError?.message ?? null}
        addingUuid={addingUuid}
        onAdd={(food) => void handleAddExistingFood(food)}
        onAddNew={() => {
          returnToPickerOnClose.current = true;
          setPickerOpen(false);
          setNewFoodOpen(true);
        }}
        onClose={() => setPickerOpen(false)}
      />
      <AddFoodModal
        open={newFoodOpen}
        onClose={() => {
          setNewFoodOpen(false);
          if (returnToPickerOnClose.current) setPickerOpen(true);
          returnToPickerOnClose.current = true;
        }}
        onSubmit={async (body) => {
          await handleCreateAndAddFood(body);
          returnToPickerOnClose.current = false;
        }}
      />
      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />
    </section>
  );
}
