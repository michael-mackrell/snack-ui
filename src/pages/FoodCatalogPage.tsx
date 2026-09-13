import { useState } from 'react';
import { catalogEntriesApi } from '../api/catalogEntries';
import { AddFoodModal } from '../components/AddFoodModal';
import { Toast } from '../components/Toast';
import { useCatalogEntries } from '../hooks/useCatalogEntries';
import { useFoodInventory } from '../hooks/useFoodInventory';

export function FoodCatalogPage() {
  const { entries, loading, error, addEntry, deleteEntry, uploadImage } = useCatalogEntries();
  const { addFood } = useFoodInventory({ auto: false });
  const [modalOpen, setModalOpen] = useState(false);
  const [addingUuid, setAddingUuid] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [inventoryError, setInventoryError] = useState<string | null>(null);
  const [uploadingUuid, setUploadingUuid] = useState<string | null>(null);

  const handleAddToInventory = async (uuid: string, name: string) => {
    setAddingUuid(uuid);
    setSuccessMessage(null);
    setInventoryError(null);
    try {
      const food = await addFood(uuid);
      setSuccessMessage(`${name} added to inventory. Quantity: ${food.quantity}.`);
    } catch (err) {
      setInventoryError(err instanceof Error ? err.message : 'Failed to add food to inventory.');
    } finally {
      setAddingUuid(null);
    }
  };

  const handleImageUpload = async (uuid: string, file?: File) => {
    if (!file) return;
    setUploadingUuid(uuid);
    setInventoryError(null);
    try {
      await uploadImage(uuid, file);
    } catch (err) {
      setInventoryError(err instanceof Error ? err.message : 'Failed to upload image.');
    } finally {
      setUploadingUuid(null);
    }
  };

  return (
    <section className="page">
      <header className="page-header page-header-row">
        <div>
          <h1>Food Catalog</h1>
          <p className="page-subtitle">Food items available in the catalog.</p>
        </div>
        <button type="button" className="button primary" onClick={() => setModalOpen(true)}>
          Add Food
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
                <th>Image</th>
                <th>Name</th>
                <th>Taste</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="empty-cell">
                    No foods in the catalog yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.uuid}>
                    <td>
                      {entry.imageId ? (
                        <img
                          className="food-thumbnail"
                          src={catalogEntriesApi.imageUrl(entry.uuid, entry.imageId)}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <span className="food-thumbnail-placeholder" aria-label="No image">—</span>
                      )}
                    </td>
                    <td>{entry.name}</td>
                    <td>{entry.tasteRating}</td>
                    <td>
                      <label className="button image-upload-button">
                        {uploadingUuid === entry.uuid ? 'Uploading…' : entry.imageId ? 'Replace image' : 'Add image'}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          disabled={uploadingUuid !== null}
                          onChange={(event) => {
                            void handleImageUpload(entry.uuid, event.target.files?.[0]);
                            event.target.value = '';
                          }}
                        />
                      </label>
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

      <AddFoodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={async (body, image) => {
          const created = await addEntry(body);
          if (image) {
            try {
              await uploadImage(created.uuid, image);
            } catch (error) {
              await deleteEntry(created.uuid);
              throw error;
            }
          }
        }}
      />
      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />
    </section>
  );
}
