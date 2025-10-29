import './navbar_landing.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function navbar() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container className='navbar-container'>
        <Navbar.Brand href="/">FinTrack</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>            
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/about">About us</Nav.Link>           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
