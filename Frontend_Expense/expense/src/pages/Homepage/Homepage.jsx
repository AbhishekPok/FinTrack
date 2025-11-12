// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight,
  LogOut
} from 'lucide-react';
import styles from './homepage.module.css';

export default function Homepage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const transactions = [
    { id: 1, name: 'Grocery Store', amount: -85.50, date: 'Nov 5', type: 'expense' },
    { id: 2, name: 'Salary Deposit', amount: 3500.00, date: 'Nov 1', type: 'income' },
    { id: 3, name: 'Netflix', amount: -15.99, date: 'Nov 3', type: 'expense' },
    { id: 4, name: 'Freelance', amount: 850.00, date: 'Nov 4', type: 'income' },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <TrendingUp className={styles.logoIcon} />
          <span className={styles.logoText}>FinTrack</span>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut className={styles.logoutIcon} />
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className={styles.content}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p className={styles.subtitle}>Here's your financial overview</p>
        </div>

        {/* Balance Card */}
        <div className={styles.balanceCard}>
          <div className={styles.balanceHeader}>
            <span className={styles.balanceLabel}>Total Balance</span>
            <DollarSign className={styles.balanceIcon} />
          </div>
          <div className={styles.balanceAmount}>$24,850.00</div>
          <div className={styles.balanceChange}>
            <span className={styles.changePositive}>+12.5% from last month</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Income</span>
            <div className={styles.statValue}>$8,420</div>
            <span className={styles.statChange}>This month</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Expenses</span>
            <div className={styles.statValue}>$3,210</div>
            <span className={styles.statChange}>This month</span>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={styles.transactionsCard}>
          <h2 className={styles.cardTitle}>Recent Transactions</h2>
          <div className={styles.transactionsList}>
            {transactions.map(transaction => (
              <div key={transaction.id} className={styles.transaction}>
                <div className={styles.transactionLeft}>
                  <div className={`${styles.transactionIcon} ${transaction.type === 'income' ? styles.incomeIcon : styles.expenseIcon}`}>
                    {transaction.type === 'income' ? <ArrowUpRight /> : <ArrowDownRight />}
                  </div>
                  <div>
                    <div className={styles.transactionName}>{transaction.name}</div>
                    <div className={styles.transactionDate}>{transaction.date}</div>
                  </div>
                </div>
                <span className={`${styles.transactionAmount} ${transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount}`}>
                  {transaction.type === 'income' ? '+' : ''}{transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}