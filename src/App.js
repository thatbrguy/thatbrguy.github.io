import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Masonry from 'react-masonry-component';

import expData from './exp.json';
import portfolioData from './portfolio.json';
import { Link, Element } from 'react-scroll';


class NavbarBR extends Component {

  render() {
    /*
    let navStyle = {
      minHeight:this.props.styleProps.height,
      transition:"0.4s"
    }
    if(this.props.styleProps.background !== null)
      navStyle['background'] = this.props.styleProps.background
    if(this.props.styleProps.borderColor !== null)
      navStyle['borderColor'] = this.props.styleProps.background
    const brandStyle = {
      paddingTop:this.props.styleProps.paddingTop,
      fontSize:this.props.styleProps.fontSize,
      transition:"0.4s"
    }
    */
    return(

       <Navbar inverse collapseOnSelect fixedTop className={this.props.styleProps.navbarClass}>
        <Navbar.Header>
          <Navbar.Brand className={this.props.styleProps.navbrandClass}>
            <Link to="home" smooth={true}>
              <button style={{background: 'transparent', borderColor:'transparent'}}>Bharath Raj</button>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="navbar-collapse-xs">
          <Nav pullRight className={this.props.styleProps.navrightClass}>
            <NavItem eventKey={1}>
              <Link to="about" smooth={true} offset={-50} className='navlink'>
                About
              </Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="portfolio" smooth={true} offset={-50} className='navlink'>
                Portfolio
              </Link>
            </NavItem>
            <NavItem eventKey={3}>
              <Link to="exp" smooth={true} offset={-50} className='navlink'>
                Experience
              </Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      )
  }
}

class About extends Component {
  render(){
    return(

    <div className="container">

      <div className="row about">

        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 about-me-img">
          <img className="img-responsive" src="/me.jpg" alt="" />
        </div>

        <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 about-me-text">
          <h1>Meet Bharath.</h1>
          <p>Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. </p>
          <p>Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. </p>  
          <p>Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. </p> 
          <p>Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. 
             Bharath Raj is currently an undergrad at SSN College of Engineering. </p> 
        </div>

      </div>

    </div>

    )
  }
}

class ExperienceCard extends Component{
  render(){
    return(

      <div className="timeline-element right">
        <div className="timeline-content">
          <h2>{this.props.data.title}</h2>
          <h4>{this.props.data.role}</h4>
          <h6>{this.props.data.duration}</h6>
          <p>{this.props.data.desc}</p>
        </div>
      </div>

    )
  }
}

class Experience extends Component{

  loopThroughJson(){
    let experienceCards = [];
    for(let i=0; i < expData.exp.length; i++)
    {
      let data = expData.exp[i];
      experienceCards.push(<ExperienceCard data={data}/>)
    }

    return(
      <div>
        {experienceCards}
      </div>
    )
  }

  render(){
    return(
      <div className="timeline">
        {this.loopThroughJson()}
      </div>
    )
  }
}

class PortfolioCard extends Component{
  
  extractLinks() {

    let linkArray = this.props.element.linkArray;
    let linkTextArray = this.props.element.linkTextArray;
    let links = [], text = [], count = 0;
    let linkData = {
      'links': links,
      'text': text,
      'count': count
    };

    if(linkArray === '')
      return linkData
    else {
      if(linkArray[0] === ';'){
        links = linkArray.substr(1, linkArray.length - 2).split(';;');
        text = linkTextArray.substr(1, linkTextArray.length - 2).split(';;');
      }
      else{
        links.push(linkArray);
        text.push(linkTextArray);
      }
      count = links.length;
    }

    linkData = {
      'links': links,
      'text': text,
      'count': count
    };

    return linkData

  }

  handleLinks(linkData) {

    let links = linkData.links;
    let text = linkData.text;
    let count = linkData.count;
    let htmlLinks =  [];

    if(count > 0)
    {
    for(let i=0; i < links.length; i++)
      htmlLinks.push(
        <div>
          [<a href={links[i].trim()} 
              target='_blank' 
              rel="noopener noreferrer">{text[i].trim()}</a>]
        </div>); 
    
      return <div>{htmlLinks}</div>
    }
    else
      return ''
  }

  handleImgSrc() {
    let src;
    if(this.props.element.src === '')
      src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Logo_CODE.svg/2000px-Logo_CODE.svg.png';
    else
      src = this.props.element.src;
    return src;
  }

  padBottomLinks(count) {
    if(count === 3)
      return "65px"
    else if(count === 2)
      return "45px"
    else if(count === 1)
      return "25px"
  }

  render() {

    let linkData = this.extractLinks();

    let cardStyle = {
      width: "155px",
      height: "auto",
      background: "#EEE",
      boxShadow:"0px -3px 0px "+ this.props.element.color +" inset",
      borderRadius: "10px",
      color: "black",
      textAlign: "left",
      paddingBottom: this.padBottomLinks(linkData.count)
    }

    let imgStyle = {
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      marginBottom: "-10px"
    }

    // If you ever modify color, please do change it in the stylesheet
    // for links as well.
    let linkClass = 'link-style ' + this.props.element.tag + '-style';
    //const src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Logo_CODE.svg/2000px-Logo_CODE.svg.png'
    //const src = 'https://cdn-images-1.medium.com/max/1116/1*dUiiquKeRQFRhZ82ix4ICw.jpeg'

    return(
      <div style={cardStyle} 
      className={this.props.filter[this.props.element.tag] ? this.props.element.tag: null}>
        <img style={imgStyle} width='155px' src={this.handleImgSrc()} alt='img'/>
        <h3 style={{paddingLeft: "3px"}}>{this.props.element.title}</h3>
        <p style={{paddingLeft: "3px"}}>{this.props.element.desc}</p>
        <div className={linkClass}>{this.handleLinks(linkData)}</div>
      </div>
    )
  }
}

const masonryOptions = {
    transitionDuration: "0.4s"
};
  
class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
          active: {
            blog: false,
            project: false
          }
        };
        this.toggleClass = this.toggleClass.bind(this);
    }

    toggleClass(tag) {
        let currentStateBlog = this.state.active.blog;
        let currentStateProject = this.state.active.project;
        if(tag === 'blog')
          this.setState({ active: {blog:false, project:!currentStateProject} });
        else if(tag === 'project')
          this.setState({ active: {blog:!currentStateBlog, project:false} });
    };

    calculateLeftPad(){
      let leftPad;

      const singleUnitWidthSmall = 160 + 10; //160 width + 10 pad
      const minLeftPadSmall = 10; // 10
      const singleUnitWidthLarge = 297; //277 width + 20 pad
      const minLeftPadLarge = 20; // 20
      
      const doubleCardSmall = singleUnitWidthSmall * 2 + minLeftPadSmall;
      const tripleCardSmall = singleUnitWidthSmall * 3 + minLeftPadSmall;
      const quadCardSmall = singleUnitWidthSmall * 4 + minLeftPadSmall;
      const pentaCardSmall = singleUnitWidthSmall * 5 + minLeftPadSmall;

      const doubleCardLarge = singleUnitWidthLarge * 2 + minLeftPadLarge;
      const tripleCardLarge = singleUnitWidthLarge * 3 + minLeftPadLarge;
      const quadCardLarge = singleUnitWidthLarge * 4 + minLeftPadLarge;
      // Change calculation to be dynamic.

      if(this.props.width <= doubleCardSmall)
        leftPad = Math.floor((this.props.width - (singleUnitWidthSmall)) / 2);
      else if(this.props.width > doubleCardSmall && this.props.width <= tripleCardSmall)
        leftPad = Math.floor((this.props.width - (singleUnitWidthSmall * 2)) / 2);
      else if(this.props.width > tripleCardSmall && this.props.width <= quadCardSmall)
        leftPad = Math.floor((this.props.width - (singleUnitWidthSmall * 3)) / 2);
      else if(this.props.width > quadCardSmall && this.props.width <= pentaCardSmall)
        leftPad = Math.floor((this.props.width - (singleUnitWidthSmall * 4)) / 2);
      else if(this.props.width > pentaCardSmall && this.props.width <= tripleCardLarge)
        leftPad = Math.floor((this.props.width - (singleUnitWidthLarge * 2)) / 2);
      else if(this.props.width > tripleCardLarge && this.props.width <= quadCardLarge)
        leftPad = Math.floor((this.props.width - (singleUnitWidthLarge * 3)) / 2);
      else if(this.props.width > quadCardLarge)
        leftPad = Math.floor((this.props.width - (singleUnitWidthLarge * 4)) / 2);

      let padding = {
        "paddingLeft": leftPad.toString() + "px"
      };
      return padding;
    }

    smallOrLargeClass(baseClassName, width) {

      const singleUnitWidthSmall = 160 + 10; //160 width + 10 pad
      const minLeftPadSmall = 10; // 10
      const pentaCardSmall = singleUnitWidthSmall * 5 + minLeftPadSmall;
      let className;

      if(width > pentaCardSmall)
        className = baseClassName + '-lg';
      else if (width < pentaCardSmall)
        className = baseClassName + '-sm';

      return className;
    }

    render() {
        let currentState = this.state.active;
        let smallOrLargeClass = this.smallOrLargeClass;
        let width = this.props.width;
        //We need two states. Check based on state.
        // +lg, +sm to paddingclass based on width
        const childElements = this.props.elements.map(function(element){
           return (
                <li className={currentState[element.tag] ?
                              'no-padding' :
                               console.log(smallOrLargeClass(element.tagPaddingClass, width))}>
                    <PortfolioCard element={element} filter={currentState} />
                </li>
            );
        });
    
        return (
          <div className='portfolio-style'>
            <div className='filter-button-style'>
              <button className='btn btn-danger' onClick={() => this.toggleClass('blog')}>Blogs</button>
              <button className='btn btn-danger' onClick={() => this.toggleClass('project')}>Projects</button>
            </div>
            <div style={this.calculateLeftPad()}>
                <Masonry elementType={'ul'} options={masonryOptions} className={"my-gallery-class"}>
                    {childElements}
                </Masonry>
            </div>
          </div>
        );
    }
}

class SectionBreak extends Component {
  render(){
    const sectionBreakStyle = {
      background: "#fff",
      height: "100px",
      textAlign: "center"
    }
    const textStyle = {
      paddingTop: "29px"
    }
    return(
      <div style={sectionBreakStyle}>
        <h1 style={textStyle}>{this.props.section}</h1>
      </div>
    )
  }
}

class SkillsIcon extends Component {
  render() {
    return(
      <div>
        <div className="icon-bg-style">
          <i className={this.props.iconClass}></i>
        </div>
        <div className="skills-text">
          <p>{this.props.skillText}</p>
        </div>
        <div>
          <p>Nice, Nice, Nice, Nice, Nice, Nice, Nice, Nice, Nice, Nice</p>
        </div>
      </div>
    )
  }
}

class Skills extends Component {

  acheivements(){
    let htmlList = []
    let acheivementList = [
    {
      'acheivement': "People's Choice Award - Yet Another Hackathon",
      'date': 'August 2018',
      'desc': 'yeayyyyyyyyyy'
    },
    {
      'acheivement': 'Runner Up - Data Science Challenge',
      'date': 'April 2018',
      'desc': 'yeayyyyyyyyyy'
    },
    {
      'acheivement': 'Runner Up - AWS Deep Learning Hackathon',
      'date': 'January 2018',
      'desc': 'yeayyyyyyyyyy'
    },
    {
      'acheivement': 'First Place - Project Display',
      'date': 'August 2017',
      'desc': 'yeayyyyyyyyyy'
    },
    ]

    for(let i = 0; i < acheivementList.length; i++)
    {
      let data = acheivementList[i];
      htmlList.push(
        <li>
          <h4>{data.acheivement}</h4>
          <h6>{data.date}</h6>
          <p>{data.desc}</p>
        </li>
      );
    }

    return(
      <div>
        <ul>
          {htmlList}
        </ul>
      </div>
    )
  }

  render() {
    return(
      <div style={{color:"white"}}>
          <h2>Acheivements</h2>
          {this.acheivements()}
          <h2>Skills</h2>
          <div>
            <SkillsIcon iconClass="fas fa-code icon-style" skillText="Code" />
            <SkillsIcon iconClass="fab fa-react icon-style" skillText="Development" />
            <SkillsIcon iconClass="fas fa-fire icon-style" skillText="Frameworks" />
          </div>  
      </div>
    )
  }
}

class ExpSkillsGird extends Component {
  render() {
    return(

      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Experience />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Skills />
          </div>
        </div>
      </div>

    )
  }
}


class App extends Component {

  constructor(props){
    // Initial settings based on window width
    super(props);
    this.state = {
      navbarClass: window.innerWidth > 800? "navbar-trans-lg" : "navbar-trans-xs",
      navbrandClass: window.innerWidth > 800? "navbrand-font-lg" : "navbrand-font-xs",
      navrightClass: window.innerWidth > 800? "navbar-right-lg" : "navbar-right-xs",
      width:window.innerWidth
    };
    this.updateHeight = this.updateHeight.bind(this)
    this.updateWidth = this.updateWidth.bind(this)
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
          <Gallery elements={portfolioData.portfolio} width={this.state.width} />
       </div>
       <Element name='exp'>
          <SectionBreak section={'Experience'} />
       </Element>
       <ExpSkillsGird style={{background: "#333"}}/>
      </div>
    );
  }
}

export default App;
