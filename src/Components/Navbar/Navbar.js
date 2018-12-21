import React, { Component } from 'react';
import {Link} from 'react-scroll';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import './Navbar.css'

class NavbarBR extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navExpanded:false 
    }
    this.setNavExpanded = this.setNavExpanded.bind(this)
    this.closeNav = this.closeNav.bind(this)
  }

  setNavExpanded(value) {
    this.setState({
      navExpanded: value
    });
  }

  closeNav() {
    this.setState({
      navExpanded: false
    });
  }

  render() {

    return(

       <Navbar inverse 
               fixedTop 
               onToggle={this.setNavExpanded} 
               expanded={this.state.navExpanded} 
               className={this.props.styleProps.navbarClass}>
        <Navbar.Header>
          <Navbar.Brand className={this.props.styleProps.navbrandClass}>
            <Link to="home" smooth={true} onClick={this.closeNav}>
              <button style={{background: 'transparent', borderColor:'transparent'}}>Bharath Raj</button>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="navbar-collapse-xs">
          <Nav pullRight 
               className={this.props.styleProps.navrightClass}>
            <NavItem eventKey={1}>
              <Link to="about" smooth={true} offset={-50} onClick={this.closeNav} className='navlink'>
                About
              </Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="portfolio" smooth={true} offset={-50} onClick={this.closeNav} className='navlink'>
                Portfolio
              </Link>
            </NavItem>
            <NavItem eventKey={3}>
              <Link to="exp" smooth={true} offset={-50} onClick={this.closeNav} className='navlink'>
                Experience
              </Link>
            </NavItem>
            <NavItem eventKey={4}>
              <Link to="contact" smooth={true} offset={-50} onClick={this.closeNav} className='navlink'>
                Contact
              </Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      )
  }
}

export default NavbarBR;