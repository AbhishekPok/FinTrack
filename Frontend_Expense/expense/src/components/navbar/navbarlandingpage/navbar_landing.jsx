import { Button } from 'react-bootstrap';
import styles from '../navbarlandingpage/navbar_landing.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarLanding() {
  return (
    <Navbar className={styles.bg_body_tertiary} expand="lg">
      <Container className={styles.navbar_container}>
        <Navbar.Brand className = {styles.navbar_brand}href="/">FinTrack</Navbar.Brand>
        <Nav>
        <div className={styles.navbar_features}>
            <Button className = {styles.button}>
                <span className={styles.navLink}>Features</span>
            </Button>
            <Button className = {styles.button}>
                <span  className={styles.navLink}>Contact</span>
            </Button>
        </div>
        </Nav>
      </Container>
    </Navbar>
  );
}
