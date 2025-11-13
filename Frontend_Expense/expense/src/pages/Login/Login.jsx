import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import styles from "./login.module.css";
import {api} from "../../common/api"; 
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../common/constant";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    console.log("yo aairako xa", formData)
    try {
      const loginData = {
        username: formData.email, 
        password: formData.password
      };
      const resp = await api.post("/api/token/", loginData);
      localStorage.setItem(ACCESS_TOKEN, resp.data.access);
      localStorage.setItem(REFRESH_TOKEN, resp.data.refresh); 

      

      navigate("/home");

    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        const errorMessage = error.response.data.detail || error.response.data.message || "Invalid email or password. Please try again.";
        setError(errorMessage);
      } else if (error.request) {
        setError("Cannot connect to server. Please check if the backend is running.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReturnToLanding = () => {
    navigate("/");
  };

  return (
    <div className={styles.loginpage}>
      {/* Floating Money Icons Background */}
      <div className={styles.backgroundicons}>
        <div className={styles.floatingicon} style={{top: '10%', left: '5%', animationDelay: '0s'}}>💵</div>
        <div className={styles.floatingicon} style={{top: '20%', right: '8%', animationDelay: '2s'}}>💰</div>
        <div className={styles.floatingicon} style={{top: '60%', left: '10%', animationDelay: '4s'}}>💳</div>
        <div className={styles.floatingicon} style={{bottom: '15%', right: '12%', animationDelay: '1s'}}>💎</div>
        <div className={styles.floatingicon} style={{top: '40%', left: '15%', animationDelay: '3s'}}>🏦</div>
        <div className={styles.floatingicon} style={{top: '70%', right: '15%', animationDelay: '5s'}}>📊</div>
        <div className={styles.floatingicon} style={{top: '25%', left: '20%', animationDelay: '2.5s'}}>💸</div>
        <div className={styles.floatingicon} style={{bottom: '25%', left: '8%', animationDelay: '1.5s'}}>🪙</div>
        <div className={styles.floatingicon} style={{top: '50%', right: '5%', animationDelay: '4.5s'}}>📈</div>
        <div className={styles.floatingicon} style={{bottom: '40%', right: '20%', animationDelay: '3.5s'}}>💹</div>
      </div>

      {/* Return to Landing Button */}
      <button 
        className={styles.returnbtn}
        onClick={handleReturnToLanding}
        aria-label="Return to landing page"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Home
      </button>

      <Container className={styles.logincontainer}>
        <Card className={styles.logincard}>
          <div className={styles.cardlayout}>
            {/* Left Side - Financial Imagery */}
            <div className={styles.imageside}>
              <div className={styles.imagecontent}>
                <div className={styles.iconwrapper}>
                  <svg className={styles.financeicon} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    {/* Chart/Graph Icon */}
                    <rect x="20" y="120" width="25" height="60" fill="#4f46e5" opacity="0.8" rx="4"/>
                    <rect x="55" y="90" width="25" height="90" fill="#6366f1" opacity="0.9" rx="4"/>
                    <rect x="90" y="70" width="25" height="110" fill="#4f46e5" opacity="0.8" rx="4"/>
                    <rect x="125" y="50" width="25" height="130" fill="#6366f1" opacity="0.9" rx="4"/>
                    <rect x="160" y="30" width="25" height="150" fill="#4f46e5" opacity="0.8" rx="4"/>
                    
                    {/* Trend line */}
                    <path d="M 32 140 L 67 110 L 102 90 L 137 70 L 172 50" 
                          stroke="#ffffff" 
                          strokeWidth="3" 
                          fill="none" 
                          strokeLinecap="round"/>
                    
                    {/* Dollar sign */}
                    <circle cx="100" cy="60" r="35" fill="rgba(255,255,255,0.2)"/>
                    <text x="100" y="78" fontSize="40" fill="#ffffff" textAnchor="middle" fontWeight="bold">$</text>
                  </svg>
                  
                  <div className={styles.floatingelements}>
                    <div className={styles.floatingcoin}>💰</div>
                    <div className={styles.floatingchart}>📈</div>
                    <div className={styles.floatingcard}>💳</div>
                  </div>
                </div>
                <h3 className={styles.imagetitle}>Manage Your Finances</h3>
                <p className={styles.imagesubtitle}>
                  Track expenses, monitor investments, and achieve your financial goals with FinTrack
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className={styles.formside}>
              <Card.Body>
                <h2 className={styles.title}>Welcome Back</h2>
                <p className={styles.subtitle}>Login to continue to FinTrack</p>
                
                {/* Error Message Display */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className={styles.loginbtn} 
                    size="lg" 
                    block
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Form>

                <p className={styles.switchtext}>
                  Don't have an account?{" "}
                  <Link to="/register" className={styles.switchlink}>
                    Sign up
                  </Link>
                </p>
              </Card.Body>
            </div>
          </div>
        </Card>
      </Container>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footercontent}>
          <div className={styles.footerleft}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} FinTrack. All rights reserved.
            </p>
            <p className={styles.trademark}>
              FinTrack™ is a registered trademark of FinTrack Inc.
            </p>
          </div>
          <div className={styles.footerright}>
            <a href="/privacy" className={styles.footerlink}>Privacy Policy</a>
            <span className={styles.separator}>•</span>
            <a href="/terms" className={styles.footerlink}>Terms of Service</a>
            <span className={styles.separator}>•</span>
            <a href="/contact" className={styles.footerlink}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;