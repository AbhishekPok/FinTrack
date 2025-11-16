import { useState } from 'react';
import { Dashboard } from '../../components/homepagecomponents/Dashboard';
import { Transactions } from '../../components/homepagecomponents/Transactions';
import { ClusteringInsights } from '../../components/homepagecomponents/ClusteringInsights';
import { Reports } from '../../components/homepagecomponents/Reports';
import { Sidebar } from '../../components/homepagecomponents/Sidebar';
import styles from './homepage.module.css';

export default function HomePage() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className={styles.appContainer}>
      <button 
        className={styles.menuToggle}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div 
        className={`${styles.overlay} ${sidebarOpen ? styles.visible : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar 
        currentView={currentView} 
        onViewChange={(view) => {
          setCurrentView(view);
          setSidebarOpen(false);
        }} 
        onLogout={() => setIsAuthenticated(false)}
        isOpen={sidebarOpen}
      />
      
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'transactions' && <Transactions />}
          {currentView === 'insights' && <ClusteringInsights />}
          {currentView === 'reports' && <Reports />}
        </div>
      </main>
    </div>
  );
}