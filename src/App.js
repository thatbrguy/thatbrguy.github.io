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
            <NavItem eventKey={4}>
              <Link to="contact" smooth={true} offset={-50} className='navlink'>
                Contact
              </Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      )
  }
}

class ContactIcons extends Component {
  render() {
    return(
      <div className = {this.props.iconClass}>
        <a href="https://www.facebook.com/ThatBRGuy" 
           target="_blank"
           rel="noopener noreferrer">
          <i className="fab fa-facebook-square icon-item"></i>
        </a>
        <a href="https://github.com/thatbrguy" 
           target="_blank"
           rel="noopener noreferrer">
          <i className="fab fa-github-square icon-item"></i>
        </a>
        <a href="https://medium.com/@thatbrguy" 
           target="_blank"
           rel="noopener noreferrer">
          <i className="fab fa-medium icon-item"></i>
        </a>
        <a href="https://www.linkedin.com/in/bharathrajn/" 
           target="_blank"
           rel="noopener noreferrer">
          <i className="fab fa-linkedin icon-item"></i>
        </a>
        <a href="mailto:bharathrajn98@gmail.com" 
           target="_blank"
           rel="noopener noreferrer">
          <i className="fas fa-envelope-square icon-item"></i>
        </a>
      </div>
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
          <h1>Let's build something great.</h1>
          <p>Hello. I'm Bharath Raj, an undergraduate student set to graduate at 2019. I actively 
             work on research in the fields of computer vision, machine learning and artificial 
             intelligence. I often work on interesting hobby projects and maintain a technical blog 
             on Medium.</p>
          <p>I am always on the lookout for opportunities to learn more and work on exciting projects 
             in my fields of interest. Scroll down to take a look at my projects, publications and blogs.</p>

          <div align = "center">
          <div className = "resume-pad">
            <button className="btn btn-danger">Download Resume</button>
          </div>
            <hr style={{borderColor:'black', 'borderWidth': '3px'}} />
            
            <ContactIcons iconClass={'icons'} />

            <div className = "icons">
              <Link to="portfolio" smooth={true} offset={-50} className='navlink'>
                <button style={{background: 'transparent', border: 'none'}} className="fas fa-chevron-down">
                </button>
              </Link>
            </div>
          
          </div>
        
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
    // 850 is four card threshold

    if(count > 0)
    {
    for(let i=0; i < links.length; i++){

      let content = text[i].trim();
      let iconClass;

      if(content === 'Arxiv')
        iconClass = "fas fa-file-pdf"
      else if(content === 'Demo')
        iconClass = "fab fa-youtube"
      else if(content === 'Medium')
        iconClass = "fab fa-medium"
      else if(content === 'GitHub')
        iconClass = "fab fa-github"
      else
        iconClass = "fas fa-globe-americas"

      htmlLinks.push(
        <span>
          <a href={links[i].trim()} 
              target='_blank' 
              rel="noopener noreferrer">
            <i style={{fontSize: '20px', paddingLeft:"5px"}} className={iconClass}></i>
          </a>
        </span>); 
    }
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

  render() {

    let linkData = this.extractLinks();

    // 850 is four card small threshold.
    let cardStyle = {
      width: this.props.width > 850 ? "277px" : "160px",
      height: "auto",
      background: "#EEE",
      boxShadow:"0px -3px 0px "+ this.props.element.color +" inset",
      borderRadius: "10px",
      color: "black",
      textAlign: "left",
      paddingBottom: '35px'
    }

    let imgStyle = {
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      marginBottom: "-10px"
    }

    // If you ever modify color, please do change it in the stylesheet
    // for links as well.
    let linkStyle = this.props.width > 850 ? "link-style-lg " : "link-style-sm "
    let linkClass = linkStyle + this.props.element.tag + '-style';
    //const src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Logo_CODE.svg/2000px-Logo_CODE.svg.png'
    //const src = 'https://cdn-images-1.medium.com/max/1116/1*dUiiquKeRQFRhZ82ix4ICw.jpeg'

    return(
      <div style={cardStyle} 
      className={this.props.filter[this.props.element.tag] ? this.props.element.tag: null}>
        <img style={imgStyle} width={cardStyle.width} src={this.handleImgSrc()} alt='img'/>
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
      
        this.singleUnitWidthSmall = 160 + 10; //160 width + 10 pad
        this.minLeftPadSmall = 10; // 10
        this.singleUnitWidthLarge = 297; //277 width + 20 pad
        this.minLeftPadLarge = 20; // 20
        
        this.doubleCardSmall = this.singleUnitWidthSmall * 2 + this.minLeftPadSmall;
        this.tripleCardSmall = this.singleUnitWidthSmall * 3 + this.minLeftPadSmall;
        this.quadCardSmall = this.singleUnitWidthSmall * 4 + this.minLeftPadSmall;
        this.pentaCardSmall = this.singleUnitWidthSmall * 5 + this.minLeftPadSmall;

        this.tripleCardLarge = this.singleUnitWidthLarge * 3 + this.minLeftPadLarge;
        this.quadCardLarge = this.singleUnitWidthLarge * 4 + this.minLeftPadLarge;
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

      if(this.props.width <= this.doubleCardSmall)
        leftPad = Math.floor((this.props.width - (this.singleUnitWidthSmall)) / 2);
      else if(this.props.width > this.doubleCardSmall && this.props.width <= this.tripleCardSmall)
        leftPad = Math.floor((this.props.width - (this.singleUnitWidthSmall * 2)) / 2);
      else if(this.props.width > this.tripleCardSmall && this.props.width <= this.quadCardSmall)
        leftPad = Math.floor((this.props.width - (this.singleUnitWidthSmall * 3)) / 2);
      else if(this.props.width > this.quadCardSmall && this.props.width <= this.pentaCardSmall)
        leftPad = Math.floor((this.props.width - (this.singleUnitWidthSmall * 4)) / 2);
      else if(this.props.width > this.pentaCardSmall && this.props.width <= this.tripleCardLarge)
        leftPad = Math.floor((this.props.width - (this.singleUnitWidthLarge * 2)) / 2);
      else if(this.props.width > this.tripleCardLarge && this.props.width <= this.quadCardLarge)
        leftPad = Math.floor((this.props.width - (this.singleUnitWidthLarge * 3)) / 2);
      else if(this.props.width > this.quadCardLarge)
        leftPad = Math.floor((this.props.width - (this.singleUnitWidthLarge * 4)) / 2);

      let padding = {
        "paddingLeft": leftPad.toString() + "px"
      };
      return padding;
    }

    smallOrLargeClass(baseClassName) {

      let className;

      if(this.props.width > this.pentaCardSmall)
        className = baseClassName + '-lg';
      else if (this.props.width < this.pentaCardSmall)
        className = baseClassName + '-sm';

      return className;
    }

    render() {

        let childElements = [];
        let elements = this.props.elements;
        let currentState = this.state.active;

        for(let i=0; i < elements.length; i++){
          childElements.push(
            <li className={currentState[elements[i].tag] ?
                          'no-padding' :
                           this.smallOrLargeClass(elements[i].tagPaddingClass)}>
                <PortfolioCard element={elements[i]} filter={currentState} width={this.props.width} />
            </li>
          );
        }
    
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
    let divClass = 'section-break-' + this.props.section.toLowerCase()
    let borderClass = 'section-break-border-' + this.props.section.toLowerCase()
    let textClass = 'section-break-text-' + this.props.section.toLowerCase()
    return(
      <div className={divClass}>
        <h1 className={textClass}>{this.props.section}</h1>
        <hr width='90%' className={borderClass} />
      </div>
    )
  }
}

class SkillsIcon extends Component {
  render() {
    return(
      <div>
        <div className="icon-bg-style">
          <i className={this.props.skills.iconClass}></i>
        </div>
        <div className="skills-text">
          <p>{this.props.skills.skillText}</p>
        </div>
        <div>
          <p>{this.props.skills.desc}</p>
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
    const skillList = [
    {
      'iconClass': "fas fa-code icon-style-code",
      'skillText': "Code",
      'desc': 'Python, C, C++, JavaScript, MATLAB, Bash'
    },
    {
      'iconClass': "fab fa-react icon-style-dev",
      'skillText': "Development",
      'desc': 'React, Django, AWS, GCP, Git, GIMP'
    },
    {
      'iconClass': "fas fa-fire icon-style-fw",
      'skillText': "Frameworks",
      'desc': 'TensorFlow, PyTorch, Keras, Scikit'
    }
    ]
    return(
      <div style={{color:"black"}}>
          <h2>Acheivements</h2>
          {this.acheivements()}
          <h2>Skills</h2>
          <div>
            <SkillsIcon skills={skillList[0]} />
            <SkillsIcon skills={skillList[1]} />
            <SkillsIcon skills={skillList[2]} />
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

class Contact extends Component {
  render(){
    return(

      <div className='contact'>
        <ContactIcons iconClass={'contact-icons'}/>
        <div className = "contact-link">
          <Link to="home" smooth={true} offset={-50}>
            <button style={{background: 'transparent', border: 'none'}} 
                    className="fas fa-chevron-up">
            </button>
          </Link>
        </div>
        <hr width='90%' className={'section-break-border-portfolio'} />
        <div>
          <p style={{'margin':'0', 'padding':'0 0 0 5px'}}>
            Bharath Raj &copy; {this.props.year}
          </p>
          <p style={{'margin':'0', 'padding':'0 0 0 5px'}}>
            Built using React. Fork my website here. 
          </p>
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
          <Gallery elements={portfolioData.portfolio} width={this.state.width} />
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
