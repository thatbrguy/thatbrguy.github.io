import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Masonry from 'react-masonry-component';

import './App.css';
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
        <Navbar.Collapse>
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

class ExperienceCard extends Component{
  render(){
    return(

      <div className={this.props.data.class}>
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
      if(i % 2 === 0)
        data['class'] = "timeline-element left";
      else
        data['class'] = "timeline-element right"

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
  
  handleLinks() {

    let linkArray = this.props.element.linkArray;
    let linkTextArray = this.props.element.linkTextArray;
    if(linkArray === '')
      return
    else {
      let links = [], text = [];  
      if(linkArray[0] === ';'){
        links = linkArray.substr(1, linkArray.length - 2).split(';;');
        text = linkTextArray.substr(1, linkTextArray.length - 2).split(';;');
      }
      else{
        links.push(linkArray);
        text.push(linkTextArray);
      }
      let htmlLinks = [];
      for(let i=0; i < links.length; i++)
        htmlLinks.push(
          <span>
            [<a href={links[i].trim()} 
                target='_blank' 
                rel="noopener noreferrer">{text[i].trim()}</a>]
          </span>); 
      
      return <div>{htmlLinks}</div>
    }
  }

  handleImgSrc() {
    let src;
    if(this.props.element.src === '')
      src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Logo_CODE.svg/2000px-Logo_CODE.svg.png';
    else
      src = this.props.element.src;
    return src;
  }

  render() {

    let cardStyle = {
      width: "277px",
      height: "auto",
      background: "#EEE",
      boxShadow:"0px -3px 0px "+ this.props.element.color +" inset",
      borderRadius: "10px",
      color: "black",
      textAlign: "left",
      paddingBottom: "30px"
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
        <img style={imgStyle} width='277px' src={this.handleImgSrc()} alt='img'/>
        <h3 style={{paddingLeft: "3px"}}>{this.props.element.title}</h3>
        <p style={{paddingLeft: "3px"}}>{this.props.element.desc}</p>
        <div className={linkClass}>{this.handleLinks()}</div>
      </div>
    )
  }
}


class About extends Component {
  render(){
    return(
      <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at interdum purus. Sed aliquet felis eget nunc consequat laoreet. Duis vehicula justo non porttitor tempor. Nulla facilisi. Morbi sed dui tincidunt, pharetra elit efficitur, gravida turpis. Sed a placerat urna. Aenean accumsan, diam sed aliquam facilisis, purus justo euismod leo, eu gravida est neque quis libero. Morbi gravida dolor eu dolor condimentum dictum eget in ligula. Cras eget arcu egestas, sodales ligula vitae, posuere odio. Nam sollicitudin rutrum arcu, id tincidunt nisl. Praesent dignissim feugiat justo at euismod. Fusce eu lectus ut neque blandit finibus. Etiam sagittis neque ornare aliquet malesuada. Morbi dictum mollis commodo. Nulla facilisi.

Donec laoreet imperdiet velit, mollis scelerisque metus elementum eu. Etiam ligula sem, congue et imperdiet vitae, iaculis at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ante ex, tincidunt id metus vitae, iaculis placerat est. Nam iaculis sem nisi, quis ultricies velit ornare sed. Nam suscipit tortor augue, eu aliquet lectus viverra in.

Suspendisse vitae malesuada lacus. Suspendisse egestas varius erat, sit amet finibus leo porttitor eu. Mauris varius varius ex, a egestas turpis sagittis sit amet. Cras vehicula leo id nisl hendrerit, et dictum eros sollicitudin. Sed tempor diam vitae nisi malesuada scelerisque. Cras eget arcu vehicula, luctus massa a, rutrum turpis. Morbi sit amet elementum dolor, faucibus fringilla nunc. Maecenas vitae condimentum arcu. Integer pretium, dui at pretium gravida, nibh ante accumsan lacus, sit amet dictum sapien dui ut tortor. Nunc vestibulum, ex eget porttitor aliquet, justo enim molestie orci, quis scelerisque odio nunc eget elit. Suspendisse id ipsum fermentum, ultricies mi ac, bibendum velit. Sed ante augue, pulvinar id cursus vitae, porttitor et mauris. Suspendisse ornare commodo nisi, vitae dapibus lorem eleifend molestie. Proin elementum egestas neque, in suscipit lectus ultricies vitae. Etiam eget mi sagittis, placerat dolor ut, dictum leo. Vivamus nec arcu congue, interdum risus nec, consectetur dui.

Integer mauris ligula, ullamcorper ut hendrerit vitae, interdum ut nibh. Proin in auctor turpis. Phasellus vulputate magna at semper malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur vel felis sit amet orci commodo auctor at mattis lacus. Cras maximus eleifend laoreet. Nam interdum sem ut felis sollicitudin, a aliquam nunc luctus. Nam tristique purus nec velit lacinia suscipit. Duis vel suscipit metus, eu placerat libero. Praesent eu lacinia justo. Nunc eget vestibulum nunc. Nunc ac vulputate nunc, eget tristique ipsum. Aliquam erat volutpat. Vestibulum non sem lacinia, auctor ligula non, laoreet massa.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam neque lectus, vulputate viverra ipsum eget, laoreet consequat leo. Mauris vitae nulla lorem. Fusce finibus arcu sem, ac luctus lectus congue vel. Nunc accumsan, leo ultricies mollis consequat, mi dui interdum nisl, id suscipit lectus metus eu erat. Cras a turpis sed enim suscipit sollicitudin non vitae ipsum. Nam odio nisl, rhoncus non tristique quis, convallis at libero. Etiam iaculis congue turpis. Praesent faucibus tellus sed sapien imperdiet accumsan. Nunc condimentum leo ut quam rhoncus, sed fringilla metus tincidunt. Nunc fermentum maximus ex, ac auctor diam pharetra fermentum. Integer sit amet efficitur sem. Nam maximus orci vel egestas vehicula. Pellentesque ut dui id velit malesuada efficitur ut eu velit.
      </p>
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
      const singleUnitWidth = 297; //277 width + 20 pad
      const minLeftPad = 20;
      // let singleCard = singleUnitWidth + minLeftPad;
      let doubleCard = singleUnitWidth * 2 + minLeftPad;
      let tripleCard = singleUnitWidth * 3 + minLeftPad;
      let quadCard = singleUnitWidth * 4 + minLeftPad;
      // Change calculation to be dynamic.

      if(this.props.width <= doubleCard)
        leftPad = Math.floor((this.props.width - (singleUnitWidth)) / 2);
      else if(this.props.width > doubleCard && this.props.width <= tripleCard)
        leftPad = Math.floor((this.props.width - (singleUnitWidth * 2)) / 2);
      else if(this.props.width > tripleCard && this.props.width <= quadCard)
        leftPad = Math.floor((this.props.width - (singleUnitWidth * 3)) / 2);
      else if(this.props.width > quadCard)
        leftPad = Math.floor((this.props.width - (singleUnitWidth * 4)) / 2);

      let padding = {
        "paddingLeft": leftPad.toString() + "px"
      };
      return padding;
    }

    render() {
        let currentState = this.state.active;
        //We need two states. Check based on state.
        const childElements = this.props.elements.map(function(element){
           return (
                <li className={currentState[element.tag] ? 'no-padding' : element.tagPaddingClass}>
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
      <div className="App">
        <Element name="home"></Element>
        <NavbarBR  styleProps={this.state} />
        <h1 style={{color: "#fff", paddingTop: "70px"}}>Issa Me</h1>

        <h2 style={{color: "#fff"}}>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at interdum purus. Sed aliquet felis eget nunc consequat laoreet. Duis vehicula justo non porttitor tempor. Nulla facilisi. Morbi sed dui tincidunt, pharetra elit efficitur, gravida turpis. Sed a placerat urna. Aenean accumsan, diam sed aliquam facilisis, purus justo euismod leo, eu gravida est neque quis libero. Morbi gravida dolor eu dolor condimentum dictum eget in ligula. Cras eget arcu egestas, sodales ligula vitae, posuere odio. Nam sollicitudin rutrum arcu, id tincidunt nisl. Praesent dignissim feugiat justo at euismod. Fusce eu lectus ut neque blandit finibus. Etiam sagittis neque ornare aliquet malesuada. Morbi dictum mollis commodo. Nulla facilisi.

Donec laoreet imperdiet velit, mollis scelerisque metus elementum eu. Etiam ligula sem, congue et imperdiet vitae, iaculis at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ante ex, tincidunt id metus vitae, iaculis placerat est. Nam iaculis sem nisi, quis ultricies velit ornare sed. Nam suscipit tortor augue, eu aliquet lectus viverra in.

Suspendisse vitae malesuada lacus. Suspendisse egestas varius erat, sit amet finibus leo porttitor eu. Mauris varius varius ex, a egestas turpis sagittis sit amet. Cras vehicula leo id nisl hendrerit, et dictum eros sollicitudin. Sed tempor diam vitae nisi malesuada scelerisque. Cras eget arcu vehicula, luctus massa a, rutrum turpis. Morbi sit amet elementum dolor, faucibus fringilla nunc. Maecenas vitae condimentum arcu. Integer pretium, dui at pretium gravida, nibh ante accumsan lacus, sit amet dictum sapien dui ut tortor. Nunc vestibulum, ex eget porttitor aliquet, justo enim molestie orci, quis scelerisque odio nunc eget elit. Suspendisse id ipsum fermentum, ultricies mi ac, bibendum velit. Sed ante augue, pulvinar id cursus vitae, porttitor et mauris. Suspendisse ornare commodo nisi, vitae dapibus lorem eleifend molestie. Proin elementum egestas neque, in suscipit lectus ultricies vitae. Etiam eget mi sagittis, placerat dolor ut, dictum leo. Vivamus nec arcu congue, interdum risus nec, consectetur dui.

Integer mauris ligula, ullamcorper ut hendrerit vitae, interdum ut nibh. Proin in auctor turpis. Phasellus vulputate magna at semper malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur vel felis sit amet orci commodo auctor at mattis lacus. Cras maximus eleifend laoreet. Nam interdum sem ut felis sollicitudin, a aliquam nunc luctus. Nam tristique purus nec velit lacinia suscipit. Duis vel suscipit metus, eu placerat libero. Praesent eu lacinia justo. Nunc eget vestibulum nunc. Nunc ac vulputate nunc, eget tristique ipsum. Aliquam erat volutpat. Vestibulum non sem lacinia, auctor ligula non, laoreet massa.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam neque lectus, vulputate viverra ipsum eget, laoreet consequat leo. Mauris vitae nulla lorem. Fusce finibus arcu sem, ac luctus lectus congue vel. Nunc accumsan, leo ultricies mollis consequat, mi dui interdum nisl, id suscipit lectus metus eu erat. Cras a turpis sed enim suscipit sollicitudin non vitae ipsum. Nam odio nisl, rhoncus non tristique quis, convallis at libero. Etiam iaculis congue turpis. Praesent faucibus tellus sed sapien imperdiet accumsan. Nunc condimentum leo ut quam rhoncus, sed fringilla metus tincidunt. Nunc fermentum maximus ex, ac auctor diam pharetra fermentum. Integer sit amet efficitur sem. Nam maximus orci vel egestas vehicula. Pellentesque ut dui id velit malesuada efficitur ut eu velit.
       
       </h2>
       <Element name='about'>
          <SectionBreak section={'About Me'} />
       </Element>
       <div>
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
       <div style={{background: "#333"}}>
          <Experience />
       </div>
      </div>
    );
  }
}

export default App;
