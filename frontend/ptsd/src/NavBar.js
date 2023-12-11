import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import logo from './logo.png'
import map from './maps.png'


function NavBar() {

  return (
    <Navbar bg="light" data-bs-theme="light" className="m-0 p-2">
      <Container>
        <Navbar.Brand href="/" className="fw-bold"><img
          alt=""
          src={logo}
          width="40"
          height="40"
          className="d-inline-block align-middle" />{' '}
          PTSD</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="/map"><img
              alt=""
              src={map}
              width="40"
              height="40"
              className="d-inline-block align-self-center" />{' '}
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;