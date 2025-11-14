import { useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.loginpage}>
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />
      
      <div className={styles.logincard}>
        <div className={styles.cardLeft}>
          <div className={styles.brandSection}>
            <h1 className={styles.brandTitle}>FinTrack</h1>
            <p className={styles.brandSubtitle}>Your Personal Finance Manager</p>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.currencySymbol}>रु</div>
            <p className={styles.imageCaption}></p>
          </div>
        </div>
        
        <div className={styles.cardRight}>
          <div className={styles.cardHeader}> Rupees
            <h2 className={styles.title}>Welcome Back</h2>
            <p className={styles.subtitle}>Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <button type="button" className={styles.forgotLink}>
              Forgot password?
            </button>
            
            <button type="submit" className={styles.submitBtn} onClick={()=>navigate("/home")}>
              Sign In
            </button>
          </form>
          
          <div className={styles.separator} />
          
          <div className={styles.footer}>
            <p className={styles.footerText}>Don't have an account?</p>
            <button className={styles.createAccountBtn} onClick={()=>{navigate("register")}}>
              Create Account
            </button>
             <button className={styles.returnhomebtn} onClick={()=>{navigate("/home")}}>
              Return Home
            </button>
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