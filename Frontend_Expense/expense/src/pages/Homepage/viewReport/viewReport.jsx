import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowLeft,
  PieChart,
  BarChart3,
  TrendingDown,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import styles from './viewReport.module.css';

export default function ViewReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const categoryData = [
    { name: 'Food & Dining', amount: 425, color: '#ef4444', percentage: 20 },
    { name: 'Bills & Utilities', amount: 850, color: '#3b82f6', percentage: 40 },
    { name: 'Shopping', amount: 320, color: '#8b5cf6', percentage: 15 },
    { name: 'Transportation', amount: 180, color: '#f59e0b', percentage: 8 },
    { name: 'Entertainment', amount: 145, color: '#ec4899', percentage: 7 },
    { name: 'Healthcare', amount: 120, color: '#10b981', percentage: 6 },
    { name: 'Other', amount: 170, color: '#6b7280', percentage: 4 }
  ];

  const monthlyTrend = [
    { month: 'Jul', income: 7200, expenses: 4800 },
    { month: 'Aug', income: 7500, expenses: 5100 },
    { month: 'Sep', income: 7800, expenses: 4600 },
    { month: 'Oct', income: 8100, expenses: 5300 },
    { month: 'Nov', income: 8420, expenses: 3210 }
  ];

  const insights = [
    { 
      icon: '🎯', 
      title: 'Great Progress!', 
      description: 'You\'re 35% under budget this month',
      type: 'positive'
    },
    { 
      icon: '⚠️', 
      title: 'High Spending', 
      description: 'Bills category is at 94% of budget',
      type: 'warning'
    },
    { 
      icon: '💡', 
      title: 'Savings Opportunity', 
      description: 'You could save $200 by reducing dining out',
      type: 'info'
    }
  ];

  const totalIncome = monthlyTrend[monthlyTrend.length - 1].income;
  const totalExpenses = monthlyTrend[monthlyTrend.length - 1].expenses;
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.backgroundIcons}>
        <div className={styles.floatingIcon} style={{top: '10%', left: '5%', animationDelay: '0s'}}>📊</div>
        <div className={styles.floatingIcon} style={{top: '20%', right: '8%', animationDelay: '2s'}}>📈</div>
        <div className={styles.floatingIcon} style={{top: '60%', left: '3%', animationDelay: '4s'}}>💹</div>
        <div className={styles.floatingIcon} style={{top: '75%', right: '5%', animationDelay: '1s'}}>📉</div>
      </div>

      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />

      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className={styles.logo}>
          <TrendingUp className={styles.logoIcon} strokeWidth={2.5} />
          <span className={styles.logoText}>FinTrack</span>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.content}>
        <div className={styles.pageHeader}>
          <div>
            <div className={styles.pageIcon}>
              <BarChart3 size={32} />
            </div>
            <h1 className={styles.pageTitle}>Financial Reports</h1>
            <p className={styles.pageSubtitle}>Analyze your spending patterns and trends</p>
          </div>
          <button className={styles.downloadBtn}>
            <Download size={18} />
            Export Report
          </button>
        </div>

        {/* Period Selector */}
        <div className={styles.periodSelector}>
          {periods.map(period => (
            <button
              key={period.value}
              className={`${styles.periodBtn} ${selectedPeriod === period.value ? styles.periodBtnActive : ''}`}
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
              <ArrowUpRight size={24} />
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricLabel}>Total Income</div>
              <div className={styles.metricValue}>${totalIncome.toLocaleString()}</div>
              <div className={styles.metricChange} style={{color: '#10b981'}}>
                +5.2% from last month
              </div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>
              <ArrowDownRight size={24} />
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricLabel}>Total Expenses</div>
              <div className={styles.metricValue}>${totalExpenses.toLocaleString()}</div>
              <div className={styles.metricChange} style={{color: '#ef4444'}}>
                -39.5% from last month
              </div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'}}>
              <TrendingUp size={24} />
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricLabel}>Savings Rate</div>
              <div className={styles.metricValue}>{savingsRate}%</div>
              <div className={styles.metricChange} style={{color: '#10b981'}}>
                Excellent progress!
              </div>
            </div>
          </div>
        </div>

        <div className={styles.chartsLayout}>
          {/* Spending by Category */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>
                <PieChart size={20} />
                Spending by Category
              </div>
              <div className={styles.chartTotal}>Total: $2,210</div>
            </div>
            <div className={styles.categoryList}>
              {categoryData.map((category, index) => (
                <div key={index} className={styles.categoryRow}>
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryColor} style={{backgroundColor: category.color}} />
                    <span className={styles.categoryName}>{category.name}</span>
                  </div>
                  <div className={styles.categoryStats}>
                    <span className={styles.categoryAmount}>${category.amount}</span>
                    <span className={styles.categoryPercent}>{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>
                <BarChart3 size={20} />
                Income vs Expenses
              </div>
              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <div className={styles.legendDot} style={{backgroundColor: '#10b981'}} />
                  <span>Income</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendDot} style={{backgroundColor: '#ef4444'}} />
                  <span>Expenses</span>
                </div>
              </div>
            </div>
            <div className={styles.barChart}>
              {monthlyTrend.map((data, index) => {
                const maxValue = 10000;
                const incomeHeight = (data.income / maxValue) * 100;
                const expenseHeight = (data.expenses / maxValue) * 100;
                return (
                  <div key={index} className={styles.barGroup}>
                    <div className={styles.barContainer}>
                      <div 
                        className={styles.barIncome} 
                        style={{height: `${incomeHeight}%`}}
                        title={`Income: $${data.income}`}
                      />
                      <div 
                        className={styles.barExpense} 
                        style={{height: `${expenseHeight}%`}}
                        title={`Expenses: $${data.expenses}`}
                      />
                    </div>
                    <div className={styles.barLabel}>{data.month}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className={styles.insightsSection}>
          <h2 className={styles.sectionTitle}>
            <Calendar size={20} />
            Financial Insights
          </h2>
          <div className={styles.insightsGrid}>
            {insights.map((insight, index) => (
              <div 
                key={index} 
                className={`${styles.insightCard} ${styles[`insight${insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}`]}`}
              >
                <div className={styles.insightIcon}>{insight.icon}</div>
                <div className={styles.insightContent}>
                  <div className={styles.insightTitle}>{insight.title}</div>
                  <div className={styles.insightDescription}>{insight.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}