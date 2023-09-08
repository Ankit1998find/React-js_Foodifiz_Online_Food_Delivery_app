import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import './CustomNavbar.css';
import { Link } from 'react-router-dom';

import CartContext from './CartContext';

const CustomNavbar = ({ token }) => {
  const cart = useContext(CartContext);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" bg="light">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <b>FOODIFIZ</b>
             <sup><b>Nearby Cloud Kitchen</b></sup>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/ShopCart">
                <i className="fas fa-shopping-cart" style={{ fontSize: '30px' }}></i>
                <span className="cartlogo">Cart <sup>{cart.length ? cart.length : ''}</sup></span>
              </Link>

              {token ? ( // If token exists, render the "Logout" dropdown
              <NavDropdown title={<i class="fa fa-user"></i>} id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/customer">
                      <Button variant="danger" className="Buttons">
                        Logout
                      </Button>
                    </Link><br /><br />
                    <Link to="/order">
                      <Button variant="danger" className="Buttons">
                        Orders
                      </Button>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : ( // If token doesn't exist, render the "Login" dropdown
              <NavDropdown title={<i class="fa fa-user"></i>} id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/associate">
                      <Button variant="danger" className="Buttons">
                        Associate
                      </Button>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                   
                  </NavDropdown.Item>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
