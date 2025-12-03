import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';
import authService from '../../services/authService';

export default function Register({ onRegister }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // Added username state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await authService.register({ email, password, first_name: name, username }); // Added username to register call
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed! " + (error.response?.data?.detail || "Please try again."));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />

      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <h1 className={styles.brandTitle}>FinTrack</h1>
            <p className={styles.brandText}>Your Personal Finance Manager</p>
          </div>
          <div className={styles.symbol}>
            <div className={styles.symbolBox}>रु</div>
            <p className={styles.symbolText}>Start managing your finances today</p>
          </div>
        </div>

        <div className={styles.right}>
          <button className={styles.back} onClick={() => navigate("/login")}>
            ← Back to Login
          </button>

          <div className={styles.header}>
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.subtitle}>Sign up to start tracking your finances</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.group}>
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

            {/* New username input field */}
            <div className={styles.group}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                id="username"
                type="text"
                placeholder="Create a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.group}>
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

            <div className={styles.group}>
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

            <div className={styles.group}>
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

            <button type="submit" className={styles.submit}>
              Create Account
            </button>
          </form>

          <div className={styles.divider} />

          <div className={styles.terms}>
            <p className={styles.termsText}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>© 2025 FinTrack. All rights reserved.</p>
          <div className={styles.links}>
            <span className={styles.link}>Privacy Policy</span>
            <span className={styles.dot}>•</span>
            <span className={styles.link}>Terms of Service</span>
            <span className={styles.dot}>•</span>
            <span className={styles.link}>™ FinTrack is a trademark</span>
          </div>
        </div>
      </footer>
    </div>
  );
}