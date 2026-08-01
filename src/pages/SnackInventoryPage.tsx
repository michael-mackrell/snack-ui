export function SnackInventoryPage() {
  return (
    <section className="page">
      <header className="page-header">
        <h1>Snack Inventory</h1>
      </header>
      <div className="todo-card">
        <h2>TODO</h2>
        <ul className="todo-list">
          <li>List on-hand snack quantities</li>
          <li>Support restock and consume actions</li>
          <li>Link inventory items to catalog entries</li>
        </ul>
      </div>
    </section>
  );
}
