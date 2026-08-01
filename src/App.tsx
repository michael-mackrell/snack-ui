import { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { SnackCatalogPage } from './pages/SnackCatalogPage';
import { SnackInventoryPage } from './pages/SnackInventoryPage';
import type { PageId } from './types/navigation';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'catalog' && <SnackCatalogPage />}
      {activePage === 'inventory' && <SnackInventoryPage />}
    </AppLayout>
  );
}

export default App;
