import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import styles from "./register.module.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../common/constant";
import { api } from "../../common/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });

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
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare JSON data for backend
    const registrationData = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirm_password
    };

    console.log("Registering:", registrationData);

    try {
      const response = await api.post("api/user/register/", registrationData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Registration successful:", response.data);
      
      // Show success message
      alert("Registration successful! Please login.");
      
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data.message || 
                           error.response.data.error || 
                           JSON.stringify(error.response.data) ||
                           "Registration failed. Please try again.";
        alert(errorMessage);
      } else if (error.request) {
        // Request made but no response
        alert("No response from server. Please check your connection.");
      } else {
        // Other errors
        alert("An error occurred: " + error.message);
      }
    }
  };

  const handleReturnToLanding = () => {
    navigate("/");
  };

  return (
    <div className={styles.registerpage}>
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

      <Container className={styles.registercontainer}>
        <Card className={styles.registercard}>
          <div className={styles.cardlayout}>
            {/* Left Side - Financial Imagery */}
            <div className={styles.imageside}>
              <div className={styles.imagecontent}>
                <div className={styles.iconwrapper}>
                  <svg className={styles.financeicon} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    {/* Piggy Bank / Savings Icon */}
                    <circle cx="100" cy="100" r="60" fill="#4f46e5" opacity="0.8"/>
                    <ellipse cx="100" cy="100" rx="65" ry="50" fill="#6366f1" opacity="0.9"/>
                    
                    {/* Coin slot */}
                    <rect x="90" y="70" width="20" height="4" fill="#ffffff" rx="2"/>
                    
                    {/* Eye */}
                    <circle cx="85" cy="95" r="5" fill="#ffffff"/>
                    
                    {/* Coins around */}
                    <circle cx="50" cy="60" r="12" fill="#fbbf24" opacity="0.8"/>
                    <text x="50" y="66" fontSize="16" fill="#ffffff" textAnchor="middle" fontWeight="bold">$</text>
                    
                    <circle cx="150" cy="70" r="10" fill="#fbbf24" opacity="0.7"/>
                    <text x="150" y="75" fontSize="14" fill="#ffffff" textAnchor="middle" fontWeight="bold">$</text>
                    
                    <circle cx="60" cy="150" r="14" fill="#fbbf24" opacity="0.8"/>
                    <text x="60" y="156" fontSize="18" fill="#ffffff" textAnchor="middle" fontWeight="bold">$</text>
                    
                    <circle cx="145" cy="140" r="11" fill="#fbbf24" opacity="0.75"/>
                    <text x="145" y="145" fontSize="15" fill="#ffffff" textAnchor="middle" fontWeight="bold">$</text>
                  </svg>
                  
                  <div className={styles.floatingelements}>
                    <div className={styles.floatingcoin}>💰</div>
                    <div className={styles.floatingchart}>💵</div>
                    <div className={styles.floatingcard}>🏦</div>
                  </div>
                </div>
                <h3 className={styles.imagetitle}>Start Your Journey</h3>
                <p className={styles.imagesubtitle}>
                  Create your account and begin building your financial future with FinTrack
                </p>
              </div>
            </div>

            {/* Right Side - Register Form */}
            <div className={styles.formside}>
              <Card.Body>
                <h2 className={styles.title}>Create Account</h2>
                <p className={styles.subtitle}>
                  Join FinTrack and take control of your finances today!
                </p>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="confirm_password" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm your password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className={styles.registerbtn} size="lg" block>
                    Sign Up
                  </Button>
                </Form>

                <p className={styles.switchtext}>
                  Already have an account?{" "}
                  <Link to="/login" className={styles.switchlink}>
                    Log in
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

export default Register;