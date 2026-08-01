import { useSnackInventory } from '../hooks/useSnackInventory';

export function SnackInventoryPage() {
  const { foods, loading, error } = useSnackInventory();

  return (
    <section className="page">
      <header className="page-header">
        <h1>Snack Inventory</h1>
        <p className="page-subtitle">Snacks currently in stock.</p>
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
                <th>Calories</th>
                <th>Protein (g)</th>
                <th>Carbs (g)</th>
                <th>Fat (g)</th>
                <th>Taste</th>
              </tr>
            </thead>
            <tbody>
              {foods.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    No snacks are currently in inventory.
                  </td>
                </tr>
              ) : (
                foods.map((food) => (
                  <tr key={food.uuid}>
                    <td>{food.name}</td>
                    <td>{food.quantity}</td>
                    <td>{food.calories}</td>
                    <td>{food.protein}</td>
                    <td>{food.carbs}</td>
                    <td>{food.fat}</td>
                    <td>{food.tasteRating}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
