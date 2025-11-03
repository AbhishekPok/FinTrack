import styles from './navbar_homepage.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SideBar from '../../sidebar/sidebar'

export default function NavbarHomepage() {
  return (
    <Navbar className={styles.bg_body_tertiary} expand="lg">
      <Container className={styles.navbar_container}>
        <Navbar.Brand >
          <>
          <SideBar />
          </>
        </Navbar.Brand>
        <Navbar.Brand href="/home">FinTrack</Navbar.Brand>
        <div className={styles.navbar_features}>
          <Nav>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/features">Features</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}
