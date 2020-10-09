import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class MenuAppBar extends Component{
  state = {

  }
  render() {
    return (
      <div className="menu">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Buscar Imóveis</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" exact to="/zap">
                  Zap
              </Link>
              <Link className="nav-link" exact to="/viva-real">
                Viva Real
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(props) {
    return {
      props
    };
}
  
const connectedMenuAppBar = connect(mapStateToProps)(MenuAppBar);
export { connectedMenuAppBar as MenuAppBar };