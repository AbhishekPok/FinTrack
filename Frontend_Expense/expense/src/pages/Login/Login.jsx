import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic here
    console.log("Logging in:", formData);
    navigate("/"); // Redirect to dashboard or home
  };

  return (
    <div className={styles.loginpage}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className={styles.logincard}>
          <Card.Body>
            <h2 className={styles.title}>Welcome Back</h2>
            <p className={styles.subtitle}>Login to continue to FinTrack</p>

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
                />
              </Form.Group>

              <Button type="submit" className={styles.loginbtn} size="lg" block>
                Login
              </Button>
            </Form>

            <p className={styles.switchtext}>
              Don't have an account?{" "}
              <Link to="/register" className={styles.switchlink}>
                Sign up
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
