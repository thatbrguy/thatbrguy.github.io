import React, { Component } from 'react';
import {Element} from 'react-scroll';
import portfolioData from './portfolio.json';

import NavbarBR from './Components/Navbar/Navbar.js';
import About from './Components/About/About.js';
import ExpSkillsGird from './Components/Experience/Experience.js';
import Portfolio from './Components/Portfolio/Portfolio.js';
import SectionBreak from './Components/Section/Section.js';
import Contact from './Components/Footer/Footer.js';

class App extends Component {

  constructor(props){
    // Initial settings based on window width
    super(props);
    this.state = {
      navbarClass: window.innerWidth > 800? "navbar-trans-lg" : "navbar-trans-xs",
      navbrandClass: window.innerWidth > 800? "navbrand-font-lg" : "navbrand-font-xs",
      navrightClass: window.innerWidth > 800? "navbar-right-lg" : "navbar-right-xs",
      width:window.innerWidth,
      year:new Date().getFullYear(),
    };
    this.updateHeight = this.updateHeight.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }

  // Called when scrolled
  updateHeight() {
    const scrollY = window.scrollY;
    if(scrollY < 120 && this.state.width > 800)
      this.setState({navbarClass: "navbar-trans-lg",
                     navbrandClass: "navbrand-font-lg", 
                     navrightClass: "navbar-right-lg"});
    else
      this.setState({navbarClass: "navbar-trans-xs",
                     navbrandClass: "navbrand-font-xs", 
                     navrightClass: "navbar-right-xs"});
      
  }

  //Called when window is resized
  updateWidth() {
    this.setState({width: window.innerWidth});

    if(window.scrollY < 120 && window.innerWidth > 800)
      this.setState({navbarClass: "navbar-trans-lg",
                     navbrandClass: "navbrand-font-lg", 
                     navrightClass: "navbar-right-lg"});
    else
      this.setState({navbarClass: "navbar-trans-xs",
                     navbrandClass: "navbrand-font-xs", 
                     navrightClass: "navbar-right-xs"});
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateHeight);
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateHeight);
    window.removeEventListener('resize', this.updateWidth);
  }

  render() {
    return (
      <div>
        <Element name="home"></Element>
        <NavbarBR  styleProps={this.state} />
        <div className = 'container intro' >
          <p>Research.</p> <p>Code.</p> <p>Blog.</p>
       </div>
       <Element name='about'></Element>
       <div style={{backgroundColor:"white"}}>
          <About />
       </div>
       <Element name='portfolio'>
          <SectionBreak section={'Portfolio'} />
       </Element>
       <div>
          <Portfolio elements={portfolioData.portfolio} width={this.state.width} />
       </div>
       <Element name='exp'>
          <SectionBreak section={'Experience'} />
       </Element>
       <div style={{background: 'white'}}>
          <ExpSkillsGird />
       </div>
       <Element name='contact'>
          <Contact year={this.state.year}/>
       </Element>
      </div>
    );
  }
}

export default App;
