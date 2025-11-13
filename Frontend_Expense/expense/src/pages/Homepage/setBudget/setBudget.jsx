import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowLeft,
  Target,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Coffee,
  Heart,
  Smartphone,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import styles from './setBudget.module.css';

export default function SetBudget() {
  const [budgets, setBudgets] = useState({
    food: { amount: 600, spent: 425 },
    transport: { amount: 250, spent: 180 },
    shopping: { amount: 400, spent: 320 },
    bills: { amount: 900, spent: 850 },
    entertainment: { amount: 200, spent: 145 },
    health: { amount: 300, spent: 120 },
    tech: { amount: 150, spent: 95 },
    other: { amount: 200, spent: 75 }
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [tempAmount, setTempAmount] = useState('');

  const categories = [
    { value: 'food', label: 'Food & Dining', icon: Utensils, color: '#ef4444' },
    { value: 'transport', label: 'Transportation', icon: Car, color: '#f59e0b' },
    { value: 'shopping', label: 'Shopping', icon: ShoppingCart, color: '#8b5cf6' },
    { value: 'bills', label: 'Bills & Utilities', icon: Home, color: '#3b82f6' },
    { value: 'entertainment', label: 'Entertainment', icon: Coffee, color: '#ec4899' },
    { value: 'health', label: 'Healthcare', icon: Heart, color: '#10b981' },
    { value: 'tech', label: 'Technology', icon: Smartphone, color: '#6366f1' },
    { value: 'other', label: 'Other', icon: Target, color: '#6b7280' }
  ];

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setTempAmount(budgets[category].amount.toString());
  };

  const handleSaveBudget = (category) => {
    if (tempAmount && parseFloat(tempAmount) > 0) {
      setBudgets({
        ...budgets,
        [category]: {
          ...budgets[category],
          amount: parseFloat(tempAmount)
        }
      });
      setEditingCategory(null);
      setTempAmount('');
      alert('Budget updated successfully! 🎯');
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setTempAmount('');
  };

  const totalBudget = Object.values(budgets).reduce((sum, cat) => sum + cat.amount, 0);
  const totalSpent = Object.values(budgets).reduce((sum, cat) => sum + cat.spent, 0);
  const budgetRemaining = totalBudget - totalSpent;

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.backgroundIcons}>
        <div className={styles.floatingIcon} style={{top: '10%', left: '5%', animationDelay: '0s'}}>🎯</div>
        <div className={styles.floatingIcon} style={{top: '20%', right: '8%', animationDelay: '2s'}}>💰</div>
        <div className={styles.floatingIcon} style={{top: '60%', left: '3%', animationDelay: '4s'}}>📊</div>
        <div className={styles.floatingIcon} style={{top: '75%', right: '5%', animationDelay: '1s'}}>💳</div>
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
            <Target size={32} />
          </div>
          <h1 className={styles.pageTitle}>Set Budget</h1>
          <p className={styles.pageSubtitle}>Manage your monthly spending limits by category</p>
        </div>

        {/* Budget Overview Card */}
        <div className={styles.overviewCard}>
          <div className={styles.overviewHeader}>
            <h2 className={styles.overviewTitle}>Monthly Budget Overview</h2>
            <div className={styles.overviewPeriod}>November 2025</div>
          </div>
          <div className={styles.overviewStats}>
            <div className={styles.overviewStat}>
              <div className={styles.statLabel}>Total Budget</div>
              <div className={styles.statValue}>${totalBudget.toFixed(2)}</div>
            </div>
            <div className={styles.overviewStat}>
              <div className={styles.statLabel}>Total Spent</div>
              <div className={styles.statValue} style={{color: '#ef4444'}}>${totalSpent.toFixed(2)}</div>
            </div>
            <div className={styles.overviewStat}>
              <div className={styles.statLabel}>Remaining</div>
              <div className={styles.statValue} style={{color: '#10b981'}}>${budgetRemaining.toFixed(2)}</div>
            </div>
          </div>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{
                width: `${(totalSpent / totalBudget) * 100}%`,
                backgroundColor: (totalSpent / totalBudget) > 0.9 ? '#ef4444' : '#8b5cf6'
              }} 
            />
          </div>
        </div>

        {/* Budget Categories Grid */}
        <div className={styles.categoriesGrid}>
          {categories.map((category) => {
            const budget = budgets[category.value];
            const percentage = (budget.spent / budget.amount) * 100;
            const isOverBudget = percentage > 100;
            const isEditing = editingCategory === category.value;

            return (
              <div key={category.value} className={styles.categoryCard}>
                <div className={styles.categoryCardHeader}>
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryIconWrapper} style={{backgroundColor: `${category.color}15`}}>
                      <category.icon size={24} color={category.color} />
                    </div>
                    <div>
                      <div className={styles.categoryLabel}>{category.label}</div>
                      <div className={styles.categorySpent}>
                        ${budget.spent.toFixed(0)} spent
                      </div>
                    </div>
                  </div>
                  {isOverBudget && (
                    <div className={styles.warningBadge}>
                      <AlertCircle size={16} />
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className={styles.editSection}>
                    <div className={styles.budgetInputWrapper}>
                      <span className={styles.currencySymbol}>$</span>
                      <input
                        type="number"
                        step="0.01"
                        className={styles.budgetInput}
                        value={tempAmount}
                        onChange={(e) => setTempAmount(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className={styles.editButtons}>
                      <button 
                        className={styles.saveBtn}
                        onClick={() => handleSaveBudget(category.value)}
                      >
                        <CheckCircle size={16} />
                        Save
                      </button>
                      <button 
                        className={styles.cancelBtn}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.budgetAmount}>
                      <span className={styles.budgetLabel}>Budget:</span>
                      <span className={styles.budgetValue}>${budget.amount.toFixed(0)}</span>
                    </div>

                    <div className={styles.categoryProgressContainer}>
                      <div 
                        className={styles.categoryProgress} 
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isOverBudget ? '#ef4444' : category.color
                        }} 
                      />
                    </div>

                    <div className={styles.categoryFooter}>
                      <span className={styles.percentageText} style={{color: isOverBudget ? '#ef4444' : category.color}}>
                        {Math.round(percentage)}% used
                      </span>
                      <button 
                        className={styles.editBtn}
                        onClick={() => handleEditClick(category.value)}
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Tips Card */}
        <div className={styles.tipsCard}>
          <div className={styles.tipsIcon}>💡</div>
          <div className={styles.tipsContent}>
            <div className={styles.tipsTitle}>Budget Tips</div>
            <ul className={styles.tipsList}>
              <li>Set realistic budgets based on your spending history</li>
              <li>Review and adjust your budgets monthly</li>
              <li>Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
              <li>Track your progress regularly to stay on target</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}