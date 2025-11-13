import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowLeft,
  DollarSign,
  Calendar,
  FileText,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Coffee,
  Heart,
  Smartphone,
  TrendingDown
} from 'lucide-react';
import styles from './addExpense.module.css';

export default function AddExpense() {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'food',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [recentExpenses, setRecentExpenses] = useState([
    { id: 1, amount: 85.50, category: 'food', description: 'Grocery Store', date: 'Nov 5, 2025' },
    { id: 2, amount: 15.99, category: 'entertainment', description: 'Netflix Subscription', date: 'Nov 3, 2025' },
    { id: 3, amount: 45.00, category: 'transport', description: 'Gas Station', date: 'Nov 6, 2025' },
  ]);

  const categories = [
    { value: 'food', label: 'Food', icon: Utensils, color: '#ef4444' },
    { value: 'transport', label: 'Transport', icon: Car, color: '#f59e0b' },
    { value: 'shopping', label: 'Shopping', icon: ShoppingCart, color: '#8b5cf6' },
    { value: 'bills', label: 'Bills', icon: Home, color: '#3b82f6' },
    { value: 'entertainment', label: 'Entertainment', icon: Coffee, color: '#ec4899' },
    { value: 'health', label: 'Health', icon: Heart, color: '#10b981' },
    { value: 'tech', label: 'Tech', icon: Smartphone, color: '#6366f1' },
    { value: 'other', label: 'Other', icon: DollarSign, color: '#6b7280' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.category) {
      const newExpense = {
        id: Date.now(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description || 'Expense',
        date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setRecentExpenses([newExpense, ...recentExpenses]);
      setFormData({
        amount: '',
        category: 'food',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      alert('Expense added successfully! 💸');
    }
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.backgroundIcons}>
        <div className={styles.floatingIcon} style={{top: '10%', left: '5%', animationDelay: '0s'}}>🛒</div>
        <div className={styles.floatingIcon} style={{top: '20%', right: '8%', animationDelay: '2s'}}>🏠</div>
        <div className={styles.floatingIcon} style={{top: '60%', left: '3%', animationDelay: '4s'}}>🚗</div>
        <div className={styles.floatingIcon} style={{top: '75%', right: '5%', animationDelay: '1s'}}>🍔</div>
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
          <div className={styles.pageIcon}>
            <TrendingDown size={32} />
          </div>
          <h1 className={styles.pageTitle}>Add Expense</h1>
          <p className={styles.pageSubtitle}>Track your spending and manage your budget</p>
        </div>

        <div className={styles.layout}>
          {/* Form Card */}
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit}>
              {/* Amount Input */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <DollarSign size={18} />
                  Amount
                </label>
                <div className={styles.amountInputWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={styles.amountInput}
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <ShoppingCart size={18} />
                  Category
                </label>
                <div className={styles.categoryGrid}>
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      className={`${styles.categoryBtn} ${formData.category === category.value ? styles.categoryBtnActive : ''}`}
                      onClick={() => setFormData({...formData, category: category.value})}
                      style={{
                        borderColor: formData.category === category.value ? category.color : 'transparent'
                      }}
                    >
                      <category.icon size={20} color={category.color} />
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Input */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Calendar size={18} />
                  Date
                </label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              {/* Description Input */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <FileText size={18} />
                  Description (Optional)
                </label>
                <textarea
                  placeholder="What did you spend on?"
                  className={styles.textarea}
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className={styles.submitBtn}>
                <DollarSign size={20} />
                Add Expense
              </button>
            </form>
          </div>

          {/* Recent Expenses Sidebar */}
          <div className={styles.sidebarCard}>
            <h2 className={styles.sidebarTitle}>Recent Expenses</h2>
            <div className={styles.expenseList}>
              {recentExpenses.map((expense) => {
                const category = categories.find(cat => cat.value === expense.category);
                return (
                  <div key={expense.id} className={styles.expenseItem}>
                    <div className={styles.expenseIcon} style={{backgroundColor: `${category.color}15`}}>
                      <category.icon size={18} color={category.color} />
                    </div>
                    <div className={styles.expenseDetails}>
                      <div className={styles.expenseDescription}>{expense.description}</div>
                      <div className={styles.expenseDate}>{expense.date}</div>
                    </div>
                    <div className={styles.expenseAmount}>-${expense.amount.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>

            {/* Summary Stats */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryTitle}>This Month</div>
              <div className={styles.summaryAmount}>$3,210.00</div>
              <div className={styles.summaryChange}>
                <TrendingDown size={16} />
                Budget remaining: $1,790
              </div>
            </div>

            {/* Budget Warning */}
            <div className={styles.warningCard}>
              <div className={styles.warningIcon}>⚠️</div>
              <div>
                <div className={styles.warningTitle}>Budget Alert</div>
                <div className={styles.warningText}>You're 65% through your monthly budget</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}