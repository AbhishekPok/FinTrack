import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
  PieChart,
  Plus,
  Target,
  Calendar,
  ShoppingCart,
  Home,
  Utensils,
  Car,
  Zap,
  CheckCircle
} from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";

import SetBudget from "./setBudget/setBudget"
import ViewReports from "./viewReport/viewReport"
import AddIncome from "./addIncome/addIncome"
import AddExpense from "./addExpense/addExpense"

import styles from './homepage.module.css';

export default function Homepage() {
  const navigate = useNavigate();
  const [savingsGoal] = useState({ current: 18500, target: 25000 });

  const handleLogout = () => {
    alert('Logout clicked! In your app, this would navigate to /login');
  };

  const transactions = [
    { id: 1, name: 'Grocery Store', amount: -85.50, date: 'Nov 5', type: 'expense', category: 'food' },
    { id: 2, name: 'Salary Deposit', amount: 3500.00, date: 'Nov 1', type: 'income', category: 'income' },
    { id: 3, name: 'Netflix', amount: -15.99, date: 'Nov 3', type: 'expense', category: 'entertainment' },
    { id: 4, name: 'Freelance', amount: 850.00, date: 'Nov 4', type: 'income', category: 'income' },
    { id: 5, name: 'Gas Station', amount: -45.00, date: 'Nov 6', type: 'expense', category: 'transport' },
  ];

  const categories = [
    { name: 'Food', spent: 425, budget: 600, icon: Utensils, color: '#10b981' },
    { name: 'Transport', spent: 180, budget: 250, icon: Car, color: '#3b82f6' },
    { name: 'Shopping', spent: 320, budget: 400, icon: ShoppingCart, color: '#8b5cf6' },
    { name: 'Bills', spent: 850, budget: 900, icon: Home, color: '#f59e0b' },
  ];

  const quickActions = [
    { label: 'Add Income', icon: Plus, color: '#10b981' },
    { label: 'Add Expense', icon: Plus, color: '#ef4444' },
    { label: 'Set Budget', icon: Target, color: '#8b5cf6' },
    { label: 'View Reports', icon: PieChart, color: '#3b82f6' },
  ];

  const savingsProgress = (savingsGoal.current / savingsGoal.target) * 100;

  return (
    <div className={styles.dashboard}>
      {/* Floating Money Icons Background */}
      <div className={styles.backgroundIcons}>
        <div className={styles.floatingIcon} style={{top: '8%', left: '5%', animationDelay: '0s'}}>💵</div>
        <div className={styles.floatingIcon} style={{top: '15%', right: '8%', animationDelay: '2s'}}>💰</div>
        <div className={styles.floatingIcon} style={{top: '45%', left: '3%', animationDelay: '4s'}}>💳</div>
        <div className={styles.floatingIcon} style={{top: '70%', right: '5%', animationDelay: '1s'}}>💎</div>
      </div>

      {/* Animated gradient orbs */}
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />
      <div className={styles.orbThree} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <TrendingUp className={styles.logoIcon} strokeWidth={2.5} />
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
          <div>
            <h1 className={styles.title}>Welcome Back! 👋</h1>
            <p className={styles.subtitle}>Here's your financial overview for today</p>
          </div>
          <div className={styles.dateChip}>
            <Calendar size={16} />
            <span>November 13, 2025</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <button key={index} className={styles.quickActionBtn} style={{borderLeft: `4px solid ${action.color}`}} onClick={navigate("home/add-income")}>
              <action.icon size={20} color={action.color} />
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Balance Card */}
        <div className={styles.balanceCard}>
          <div className={styles.balanceHeader}>
            <span className={styles.balanceLabel}>Total Balance</span>
            <div className={styles.balanceBadge}>
              <TrendingUp className={styles.badgeIcon} />
              +12.5%
            </div>
          </div>
          <div className={styles.balanceAmount}>$24,850.00</div>
          <div className={styles.balanceCompare}>
            vs last month: <span className={styles.balanceIncrease}>+$2,720</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCardIncome}>
            <div className={styles.statIconWrapper}>
              <ArrowUpRight size={24} />
            </div>
            <div>
              <span className={styles.statLabel}>Income</span>
              <div className={styles.statValue}>$8,420</div>
              <span className={styles.statChange}>This month</span>
            </div>
          </div>
          <div className={styles.statCardExpense}>
            <div className={styles.statIconWrapper}>
              <ArrowDownRight size={24} />
            </div>
            <div>
              <span className={styles.statLabel}>Expenses</span>
              <div className={styles.statValue}>$3,210</div>
              <span className={styles.statChange}>This month</span>
            </div>
          </div>
        </div>

        {/* NEW FEATURE 1: Savings Goal Tracker */}
        <div className={styles.savingsCard}>
          <div className={styles.savingsHeader}>
            <div className={styles.savingsTitle}>
              <Target size={20} color="#8b5cf6" />
              <span>Savings Goal Progress</span>
            </div>
            <span className={styles.savingsPercentage}>{Math.round(savingsProgress)}%</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{width: `${savingsProgress}%`}} />
          </div>
          <div className={styles.savingsDetails}>
            <span className={styles.savingsCurrent}>${savingsGoal.current.toLocaleString()}</span>
            <span className={styles.savingsTarget}>Goal: ${savingsGoal.target.toLocaleString()}</span>
          </div>
          <div className={styles.savingsMessage}>
            <CheckCircle size={16} color="#10b981" />
            <span>You're ${(savingsGoal.target - savingsGoal.current).toLocaleString()} away from your goal!</span>
          </div>
        </div>

        {/* NEW FEATURE 2: Budget Categories with Progress */}
        <div className={styles.categoriesCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Budget by Category</h2>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.categoriesList}>
            {categories.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100;
              const isOverBudget = percentage > 100;
              return (
                <div key={index} className={styles.categoryItem}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryLeft}>
                      <div className={styles.categoryIcon} style={{backgroundColor: `${category.color}15`}}>
                        <category.icon size={18} color={category.color} />
                      </div>
                      <div>
                        <div className={styles.categoryName}>{category.name}</div>
                        <div className={styles.categoryAmount}>
                          ${category.spent} of ${category.budget}
                        </div>
                      </div>
                    </div>
                    <span className={styles.categoryPercentage} style={{color: isOverBudget ? '#ef4444' : category.color}}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <div className={styles.categoryProgressContainer}>
                    <div className={styles.categoryProgress} style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: isOverBudget ? '#ef4444' : category.color
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={styles.transactionsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Transactions</h2>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.transactionsList}>
            {transactions.map(transaction => (
              <div key={transaction.id} className={styles.transaction}>
                <div className={styles.transactionLeft}>
                  <div className={transaction.type === 'income' ? styles.transactionIconIncome : styles.transactionIconExpense}>
                    {transaction.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <div className={styles.transactionName}>{transaction.name}</div>
                    <div className={styles.transactionDate}>{transaction.date}</div>
                  </div>
                </div>
                <span className={transaction.type === 'income' ? styles.transactionAmountIncome : styles.transactionAmountExpense}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Card */}
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <Zap size={24} color="#f59e0b" />
          </div>
          <div className={styles.insightContent}>
            <div className={styles.insightTitle}>Smart Insight</div>
            <div className={styles.insightText}>
              You're spending 15% less on dining out this month. Keep it up to reach your savings goal faster! 🎯
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}