import { LayoutDashboard, Receipt, TrendingUp, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../../Pages/Home/homepage.module.css';

export function Sidebar({ currentView, onViewChange, isOpen }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'insights', label: 'AI Insights', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {/* Brand Section */}
      <div className={styles.sidebarBrand}>
        <div className={styles.sidebarLogo}>रु</div>
        <h1 className={styles.sidebarBrandText}>FinTrack</h1>
      </div>

      {/* Navigation */}
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`${styles.sidebarNavItem} ${
                currentView === item.id ? styles.active : ''
              }`}
            >
              <Icon className={styles.sidebarIcon} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className={styles.sidebarFooter}>
        <div className={styles.sidebarUser}>
          <div className={styles.sidebarUserAvatar}>AP</div>
          <div className={styles.sidebarUserInfo}>
            <p className={styles.sidebarUserName}>Abhishek Pokhrel</p>
            <p className={styles.sidebarUserEmail}>test@test.com</p>
          </div>
        </div>
        <button onClick={
          ()=>{
          localStorage.clear()
          navigate("/")}
          } 
          className={styles.logoutButton}
          >
          <LogOut className={styles.sidebarIcon} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}