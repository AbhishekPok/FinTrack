import { TrendingUp, PieChart, Bell, Shield, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './landing.module.css';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className={styles.landing}>
      {/* Floating Money Icons Background */}
      <div className={styles.backgroundicons}>
        <div className={styles.floatingicon} style={{top: '8%', left: '5%', animationDelay: '0s'}}>💵</div>
        <div className={styles.floatingicon} style={{top: '15%', right: '8%', animationDelay: '2s'}}>💰</div>
        <div className={styles.floatingicon} style={{top: '45%', left: '3%', animationDelay: '4s'}}>💳</div>
        <div className={styles.floatingicon} style={{top: '70%', right: '5%', animationDelay: '1s'}}>💎</div>
        <div className={styles.floatingicon} style={{top: '30%', left: '10%', animationDelay: '3s'}}>🏦</div>
        <div className={styles.floatingicon} style={{top: '55%', right: '10%', animationDelay: '5s'}}>📊</div>
        <div className={styles.floatingicon} style={{top: '20%', left: '15%', animationDelay: '2.5s'}}>💸</div>
        <div className={styles.floatingicon} style={{top: '80%', left: '8%', animationDelay: '1.5s'}}>🪙</div>
        <div className={styles.floatingicon} style={{top: '38%', right: '7%', animationDelay: '4.5s'}}>📈</div>
        <div className={styles.floatingicon} style={{top: '65%', right: '15%', animationDelay: '3.5s'}}>💹</div>
      </div>

      {/* Animated gradient orbs */}
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />
      <div className={styles.orbThree} />

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
              <a href="#about" className={styles.navLink}>About us</a>
            </div>
            <div className={styles.navButtons}>
              <button className={styles.loginBtn} onClick={() => navigate('/login')}>Login</button>
              <button className={styles.getStartedBtn} onClick={() => navigate('/register')}>Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <span className={styles.heroTagText}>🚀 Your Financial Journey Starts Here</span>
            </div>
            <h1 className={styles.heroTitle}>
              Master Your Money,<br />
              <span className={styles.heroTitleAccent}>Shape Your Future</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Smart expense tracking, powerful insights, and complete financial control—all in one beautiful platform.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.heroPrimaryBtn} onClick={() => navigate('/register')}>
                Get Started Free
                <ArrowRight className={styles.buttonIcon} />
              </button>
              <button className={styles.heroSecondaryBtn} onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>
            <div className={styles.heroFeatures}>
              <div className={styles.heroFeature}>
                <CheckCircle className={styles.checkIcon} />
                <span>No credit card required</span>
              </div>
              <div className={styles.heroFeature}>
                <CheckCircle className={styles.checkIcon} />
                <span>Free 14-day trial</span>
              </div>
              <div className={styles.heroFeature}>
                <CheckCircle className={styles.checkIcon} />
                <span>Cancel anytime</span>
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
            
            {/* Floating achievement cards */}
            <div className={styles.floatingCard} style={{top: '10%', right: '-5%'}}>
              <div className={styles.achievementIcon}>🎯</div>
              <div>
                <div className={styles.achievementTitle}>Goal Achieved!</div>
                <div className={styles.achievementText}>Savings target reached</div>
              </div>
            </div>
            
            <div className={styles.floatingCard} style={{bottom: '15%', left: '-8%'}}>
              <div className={styles.achievementIcon}>📊</div>
              <div>
                <div className={styles.achievementTitle}>Monthly Report</div>
                <div className={styles.achievementText}>Ready to view</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.featuresHeader}>
          <div className={styles.sectionTag}>FEATURES</div>
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
            <h3 className={styles.featureTitle}>Spending Tracking</h3>
            <p className={styles.featureDesc}>Monitor expenses, savings, and all your spending history and habits in one place</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className={styles.stats}>
        <div className={styles.statsCard}>
          <h3 className={styles.statsTitle}>Trusted by Thousands</h3>
          <div className={styles.statsGridSection}>
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
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaIcon}>🚀</div>
          <h2 className={styles.ctaTitle}>
            Ready to Transform Your Finances?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of users who are already taking control of their financial future with FinTrack.
          </p>
          <button className={styles.ctaButton} onClick={() => navigate('/register')}>
            Get Started Free
            <ArrowRight className={styles.buttonIcon} />
          </button>
          <p className={styles.ctaDisclaimer}>No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <TrendingUp className={styles.footerIcon} />
                <span className={styles.footerLogoText}>FinTrack</span>
              </div>
              <p className={styles.footerDesc}>
                Your trusted partner in financial management and wealth building.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
              <a href="/terms" className={styles.footerLink}>Terms of Service</a>
              <a href="/contact" className={styles.footerLink}>Contact Us</a>
              <a href="/help" className={styles.footerLink}>Help Center</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <div className={styles.footerCopyright}>
              © {new Date().getFullYear()} FinTrack. All rights reserved.
            </div>
            <div className={styles.footerTrademark}>
              FinTrack™ is a registered trademark of FinTrack Inc.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}