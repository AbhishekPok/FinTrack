// Homepage.jsx
import { TrendingUp, PieChart, Bell, Shield, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './landing.module.css';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className={styles.landing}>
      {/* Floating orbs */}
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <TrendingUp className={styles.logoIcon} strokeWidth={2.5} />
              <span className={styles.logoText}>FinTrack</span>
            </div>
            <div className={styles.navLinks}>
              <a href="#features" className={styles.navLink}>Features</a>
              <a href="#about us" className={styles.navLink}>About us</a>
            </div>
            <div className={styles.navButtons}>
              <button className={styles.loginBtn} onClick={()=>navigate('/login')}>Login</button>
              <button className={styles.getStartedBtn} onClick={()=>navigate('/register')}>Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Master Your Money,<br />
              <span className={styles.heroTitleAccent}>Shape Your Future</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Smart expense tracking, powerful insights, and complete financial control—all in one beautiful platform.
            </p>
            <div className={styles.heroFeatures}>
              <div className={styles.heroFeature}>
                <CheckCircle className={styles.checkIcon} />
                <span>No credit card required</span>
              </div>
              <div className={styles.heroFeature}>
                <CheckCircle className={styles.checkIcon} />
                <span>Free 14-day trial</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.dashboardCard}>
              <div className={styles.dashboardContent}>
                <div className={styles.balanceHeader}>
                  <span className={styles.balanceLabel}>Total Balance</span>
                  <div className={styles.balanceBadge}>
                    <TrendingUp className={styles.badgeIcon} />
                    +12.5%
                  </div>
                </div>
                <div className={styles.balanceAmount}>
                  $24,850.00
                </div>
                <div className={styles.balanceCompare}>
                  vs last month: <span className={styles.balanceIncrease}>+$2,720</span>
                </div>
                <div className={styles.statsGrid}>
                  <div className={styles.statCardIncome}>
                    <div className={styles.statLabel}>Income</div>
                    <div className={styles.statValue}>$8,420</div>
                  </div>
                  <div className={styles.statCardExpense}>
                    <div className={styles.statLabel}>Expenses</div>
                    <div className={styles.statValue}>$3,210</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>Everything You Need</h2>
          <p className={styles.featuresSubtitle}>Powerful features to take control of your finances</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.iconPurple}`}>
              <PieChart className={styles.icon} strokeWidth={2.5} />
            </div>
            <h3 className={styles.featureTitle}>Smart Budgeting</h3>
            <p className={styles.featureDesc}>Set budgets and track spending across all categories automatically</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.iconBlue}`}>
              <BarChart3 className={styles.icon} strokeWidth={2.5} />
            </div>
            <h3 className={styles.featureTitle}>Visual Analytics</h3>
            <p className={styles.featureDesc}>Beautiful charts and insights to understand your money habits</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.iconOrange}`}>
              <Bell className={styles.icon} strokeWidth={2.5} />
            </div>
            <h3 className={styles.featureTitle}>Real-Time Alerts</h3>
            <p className={styles.featureDesc}>Get notified instantly when you exceed budget limits</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.iconGreen}`}>
              <Shield className={styles.icon} strokeWidth={2.5} />
            </div>
            <h3 className={styles.featureTitle}>Bank-Level Security</h3>
            <p className={styles.featureDesc}>Your financial data is encrypted and completely secure</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.iconYellow}`}>
              <TrendingUp className={styles.icon} strokeWidth={2.5} />
            </div>
            <h3 className={styles.featureTitle}>Spendings Tracking </h3>
            <p className={styles.featureDesc}>Monitor expense, savings, and all your spending history and habit in one place</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsCard}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Happy Users</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>$2M+</div>
              <div className={styles.statLabel}>Tracked Monthly</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>4.9★</div>
              <div className={styles.statLabel}>User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>
            Ready to Transform Your Finances?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of users who are already taking control of their financial future with FinTrack.
          </p>
          <button className={styles.ctaButton} onClick={()=>navigate('/register')}>
            Get Started Free
            <ArrowRight className={styles.buttonIcon} />
          </button>
          <p className={styles.ctaDisclaimer}>No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <TrendingUp className={styles.footerIcon} />
            <span className={styles.footerLogoText}>FinTrack</span>
          </div>
          <div className={styles.footerCopyright}>
            © 2025 FinTrack. All rights reserved.
          </div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}