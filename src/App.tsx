import { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { FoodCatalogPage } from './pages/FoodCatalogPage';
import { FoodInventoryPage } from './pages/FoodInventoryPage';
import type { PageId } from './types/navigation';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'dashboard' && <DashboardPage onNavigate={setActivePage} />}
      {activePage === 'catalog' && <FoodCatalogPage />}
      {activePage === 'inventory' && <FoodInventoryPage />}
    </AppLayout>
  );
}

export default App;
