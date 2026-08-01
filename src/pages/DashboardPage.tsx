export function DashboardPage() {
  return (
    <section className="page">
      <header className="page-header">
        <h1>Dashboard</h1>
      </header>
      <div className="todo-card">
        <h2>TODO</h2>
        <ul className="todo-list">
          <li>Add overview widgets (snack count, inventory summary, etc.)</li>
          <li>Add quick links to catalog and inventory actions</li>
          <li>Add recent activity feed</li>
        </ul>
      </div>
    </section>
  );
}
