import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import styles from "./register.module.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../common/constant";
import {api} from "../../common/api"

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confrim_password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering:", formData);
    try{
      await api.post("api/user/register/",{formData})
      navigate("/login");
    }
    catch(error){
      alert(error)
    }
  };

  return (
    <div className={styles.registerpage}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className={styles.registercard}>
          <Card.Body>
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.subtitle}>
              Join FinTrack and take control of your finances today!
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  className={styles.formcontrol}
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
                  className={styles.formcontrol}
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
                  className={styles.formcontrol}
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Confrim Password</Form.Label>
                <Form.Control
                  className={styles.formcontrol}
                  type="password"
                  name="confrim_password"
                  placeholder="Confrim your password"
                  value={formData.confrim_password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className={styles.registerbtn} size="lg" onClick={handleSubmit}>
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
        </Card>
      </Container>
    </div>
  );
};

export default Register;
