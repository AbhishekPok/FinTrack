import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowLeft,
  DollarSign,
  Calendar,
  FileText,
  Briefcase,
  PiggyBank,
  Wallet,
  TrendingDown
} from 'lucide-react';
import styles from './addIncome.module.css';

export default function AddIncome() {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'salary',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [recentIncomes, setRecentIncomes] = useState([
    { id: 1, amount: 3500, category: 'salary', description: 'Monthly Salary', date: 'Nov 1, 2025' },
    { id: 2, amount: 850, category: 'freelance', description: 'Web Development Project', date: 'Nov 4, 2025' },
    { id: 3, amount: 200, category: 'investment', description: 'Dividend Payment', date: 'Nov 8, 2025' },
  ]);

  const categories = [
    { value: 'salary', label: 'Salary', icon: Briefcase, color: '#10b981' },
    { value: 'freelance', label: 'Freelance', icon: Wallet, color: '#3b82f6' },
    { value: 'investment', label: 'Investment', icon: TrendingUp, color: '#8b5cf6' },
    { value: 'business', label: 'Business', icon: PiggyBank, color: '#f59e0b' },
    { value: 'other', label: 'Other', icon: DollarSign, color: '#6b7280' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.category) {
      const newIncome = {
        id: Date.now(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description || 'Income',
        date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setRecentIncomes([newIncome, ...recentIncomes]);
      setFormData({
        amount: '',
        category: 'salary',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      alert('Income added successfully! 💰');
    }
  };

//   const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.backgroundIcons}>
        <div className={styles.floatingIcon} style={{top: '10%', left: '5%', animationDelay: '0s'}}>💵</div>
        <div className={styles.floatingIcon} style={{top: '20%', right: '8%', animationDelay: '2s'}}>💰</div>
        <div className={styles.floatingIcon} style={{top: '60%', left: '3%', animationDelay: '4s'}}>💎</div>
        <div className={styles.floatingIcon} style={{top: '75%', right: '5%', animationDelay: '1s'}}>📈</div>
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
            <TrendingUp size={32} />
          </div>
          <h1 className={styles.pageTitle}>Add Income</h1>
          <p className={styles.pageSubtitle}>Record your earnings and income sources</p>
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
                  <Briefcase size={18} />
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
                  placeholder="Add a note about this income..."
                  className={styles.textarea}
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className={styles.submitBtn}>
                <DollarSign size={20} />
                Add Income
              </button>
            </form>
          </div>

          {/* Recent Incomes Sidebar */}
          <div className={styles.sidebarCard}>
            <h2 className={styles.sidebarTitle}>Recent Income</h2>
            <div className={styles.incomeList}>
              {recentIncomes.map((income) => {
                const category = categories.find(cat => cat.value === income.category);
                return (
                  <div key={income.id} className={styles.incomeItem}>
                    <div className={styles.incomeIcon} style={{backgroundColor: `${category.color}15`}}>
                      <category.icon size={18} color={category.color} />
                    </div>
                    <div className={styles.incomeDetails}>
                      <div className={styles.incomeDescription}>{income.description}</div>
                      <div className={styles.incomeDate}>{income.date}</div>
                    </div>
                    <div className={styles.incomeAmount}>+${income.amount.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>

            {/* Summary Stats */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryTitle}>This Month</div>
              <div className={styles.summaryAmount}>$4,550.00</div>
              <div className={styles.summaryChange}>
                <TrendingUp size={16} />
                +22.5% from last month
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}