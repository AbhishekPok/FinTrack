import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import sidebarIcon from './sidebaricons/sidebaricon.png';
import styles from './sidebar.module.css';

function SideBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className={styles.sidebarButton}>
        <img src={sidebarIcon} alt = 'menu'/>
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Fintrack</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Oye K xa yrr.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;