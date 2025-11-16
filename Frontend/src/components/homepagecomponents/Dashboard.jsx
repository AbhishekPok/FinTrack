import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { IconCurrencyRupeeNepalese } from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTransactions, mockClusterData, mockSpendingTrends } from '../../lib/mockData';
import styles from '../../styles/dashboard.module.css';

export function Dashboard() {
  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const currentBalance = totalIncome - totalExpenses;
  
  const recentTransactions = mockTransactions.slice(0, 5);
  
  const topSpendingCategory = mockClusterData.reduce((max, cluster) => 
    cluster.totalSpent > max.totalSpent ? cluster : max
  , mockClusterData[0]);

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Dashboard</h1>
        <p className={styles.headerSubtitle}>Welcome back! Here's your financial overview</p>
      </div>

      {/* Financial Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Current Balance</h3>
            <IconCurrencyRupeeNepalese className={styles.cardIcon} style={{ color: '#2563eb' }} />
          </div>
          <div className={styles.cardContent}>
            <p className={`${styles.cardAmount} ${styles.cardAmountBalance}`}>
              रु {currentBalance.toFixed(2)}
            </p>
            <p className={styles.cardSubtext}>Updated today</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Total Income</h3>
            <ArrowUpRight className={styles.cardIcon} style={{ color: '#16a34a' }} />
          </div>
          <div className={styles.cardContent}>
            <p className={`${styles.cardAmount} ${styles.cardAmountIncome}`}>
              रु {totalIncome.toFixed(2)}
            </p>
            <p className={styles.cardSubtext}>This month</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Total Expenses</h3>
            <ArrowDownRight className={styles.cardIcon} style={{ color: '#dc2626' }} />
          </div>
          <div className={styles.cardContent}>
            <p className={`${styles.cardAmount} ${styles.cardAmountExpense}`}>
              रु {totalExpenses.toFixed(2)}
            </p>
            <p className={styles.cardSubtext}>This month</p>
          </div>
        </div>
      </div>

      {/* Spending Trends Chart */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <TrendingUp className={styles.chartIcon} />
          <h2 className={styles.chartTitle}>Spending Trends</h2>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockSpendingTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value) => `रु${value}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.twoColumnGrid}>
        {/* Recent Transactions */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.chartTitle}>Recent Transactions</h2>
          </div>
          <div className={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className={styles.transactionItem}>
                <div className={styles.transactionInfo}>
                  <div className={styles.transactionHeader}>
                    <p className={styles.transactionMerchant}>{transaction.merchant}</p>
                    <span className={styles.transactionBadge}>
                      {transaction.category}
                    </span>
                  </div>
                  <p className={styles.transactionDate}>{transaction.date}</p>
                </div>
                <div className={`${styles.transactionAmount} ${
                  transaction.type === 'income' 
                    ? styles.transactionAmountIncome 
                    : styles.transactionAmountExpense
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}रु{transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className={styles.insightsCard}>
          <div className={styles.insightsHeader}>
            <h2 className={styles.insightsTitle}>AI Insights</h2>
          </div>
          <div className={styles.insightsList}>
            <div className={styles.insightItem}>
              <p className={styles.insightLabel}>Top Spending Category</p>
              <div className={styles.insightContent}>
                <span className={styles.insightCategory}>{topSpendingCategory.category}</span>
                <span 
                  className={styles.insightAmount}
                  style={{ color: topSpendingCategory.color }}
                >
                  रु{topSpendingCategory.totalSpent.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className={styles.insightItem}>
              <p className={styles.insightLabel}>Monthly Trend</p>
              <p className={styles.insightText}>
                Your spending has increased by 15% compared to last month. Consider reviewing your {topSpendingCategory.category.toLowerCase()} expenses.
              </p>
            </div>

            <div className={styles.insightItem}>
              <p className={styles.insightLabel}>Savings Goal</p>
              <p className={styles.insightText}>
                You're on track to save ${(currentBalance * 0.2).toFixed(2)} this month. Keep it up!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}