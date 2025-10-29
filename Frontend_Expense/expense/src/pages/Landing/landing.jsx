import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"; // ⬅️ Add this at the top
import styles from "./landing.module.css"

const features = [
  {
    icon: "📊",
    title: "Track Expenses",
    description: "Monitor your daily expenses and categorize them automatically."
  },
  {
    icon: "📈",
    title: "Visual Analytics",
    description: "Get insights with beautiful charts and graphs."
  },
  {
    icon: "💰",
    title: "Budget Planning",
    description: "Set budgets and get alerts when you're close to limits."
  }
];

const LandingPage = () => {
const navigate = useNavigate();
return (
<div>
<section className={styles.herosection}>
  <Container className={styles.fintrackcontainer}>
    <Row className="align-items-center">
      <Col md={6} className={styles.herotext}>
        <h1 className={styles.herotitle}>FinTrack</h1>
        <p className={styles.herosubtitle}>
          Take control of your finances with simplicity.  
          Track your spending, analyze trends, and achieve your goals effortlessly.
        </p>
        <div className={styles.herobuttons}>
          <Button
            onClick={() => navigate("/register")}
            className={`${styles.herobutton} ${styles.primaryhero}`}
          >
            Get Started
          </Button>
          <Button
            href="#features"
            className={`${styles.herobutton} ${styles.secondaryhero}`}
          >
            Learn More
          </Button>
        </div>
      </Col>

      <Col md={6} className={styles.heroimagecol}>
        <div className={styles.heroimagewrapper}>
        </div>
      </Col>
    </Row>
  </Container>
</section>

<section className={styles.featuresection}>
  <Container className={styles.featurecontainer}>
    <h2 className="fw-bold mb-5 display-5">Features</h2>
    <div className={styles.featurerow}>
      {features.map((feature, index) => (
        <div key={index} className={styles.featurecard}>
          <div className={styles.featureicon}>{feature.icon}</div>
          <h5 className={styles.featuretitle}>{feature.title}</h5>
          <p className={styles.featuredesc}>{feature.description}</p>
        </div>
      ))}
    </div>
  </Container>
</section>

{/* ✅ Enhanced CTA Section */}
<section className={styles.ctasection}>
  <Container className={styles.ctacontainer}>
    <h2 className={styles.ctatitle}>Ready to take control of your money?</h2>
    <div className={styles.ctabuttons}>
      <Button 
      onClick={() => navigate("/register")}
      className={`${styles.herobutton} ${styles.primaryhero}`}
      >
        Start Tracking Now
      </Button>
      <Button href="#learnmore" className={`${styles.ctabutton} ${styles.secondarybtn}`}>
        Learn More
      </Button>
    </div>
  </Container>
</section>

<footer className={styles.footer}>
  <Container>
    <Row className="align-items-center">
      <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
        <p className={styles.footertext}>
          © {new Date().getFullYear()} FinTrack. All rights reserved.
        </p>
      </Col>

      <Col md={6}>
        <div className={styles.footerlinks}>
          <a href="#" className={styles.footerlink}>Twitter</a>
          <a href="#" className={styles.footerlink}>LinkedIn</a>
          <a href="#" className={styles.footerlink}>GitHub</a>
        </div>
      </Col>
    </Row>
  </Container>
</footer>
</div>
  );
};

export default LandingPage;
