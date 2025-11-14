import { useState } from 'react';
import styles from './register.module.css';
import { useNavigate} from 'react-router-dom';

export default function Register({ onRegister }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onRegister();
  };

  return (
    <div className={styles.registerpage}>
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />
      
      <div className={styles.registercard}>
        <div className={styles.cardLeft}>
          <div className={styles.brandSection}>
            <h1 className={styles.brandTitle}>FinTrack</h1>
            <p className={styles.brandSubtitle}>Your Personal Finance Manager</p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.currencySymbol}>रु</div>
            <p className={styles.imageCaption}>Start managing your finances today</p>
          </div>
        </div>
        
        <div className={styles.cardRight}>
          <button className={styles.backBtn} onClick={()=>navigate("/")}>
            Back to Login
          </button>
          
          <div className={styles.cardHeader}>
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.subtitle}>Sign up to start tracking your finances</p>
          </div>
          
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <button type="button" onClick={handleSubmit} className={styles.submitBtn}>
              Create Account
            </button>
          </div>
          
          <div className={styles.separator} />
          
          <div className={styles.footer}>
            <p className={styles.footerText}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
      
      <footer className={styles.pageFooter}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>© 2025 FinTrack. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <span className={styles.footerLink}>Privacy Policy</span>
            <span className={styles.footerDivider}>•</span>
            <span className={styles.footerLink}>Terms of Service</span>
            <span className={styles.footerDivider}>•</span>
            <span className={styles.footerLink}>™ FinTrack is a trademark</span>
          </div>
        </div>
      </footer>
    </div>
  );
}