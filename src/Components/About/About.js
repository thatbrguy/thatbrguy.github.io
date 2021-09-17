import React, { Component } from 'react';
import {Link} from 'react-scroll';
import Resume from './Bharath_Raj_Nagoor_Kani_Resume_210210.pdf';
import ContactIcons from '../Icons/Icons.js';

import './About.css';

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
          <div>
            <p>
              I currently work at Siemens Digital Industries Software where I build 
              models, algorithms and systems for myriad ADAS and ML applications. My work typically revolves around 
              Computer Vision, Machine Learning and State Estimation concepts. I love to explore and dive deeper 
              into the fields that I find interesting by working on hobby projects and creating technical blogs. You can 
              find some of my projects on <b className="link"><a target="_blank" rel="noopener noreferrer" 
              href="https://github.com/thatbrguy">GitHub</a></b> and my technical blogs 
              on <b className="link"><a target="_blank"
              rel="noopener noreferrer" href="https://medium.com/@thatbrguy">Medium</a></b>.
            </p>
            <p>
              I am always on the lookout for opportunities to learn more and work on exciting projects 
              in the fields of my interest. Scroll down to take a look at some of my projects, publications 
              and blogs.
            </p>
          </div>

          <div align = "center">
          <div className = "resume-pad">
            <a className="btn btn-danger" 
               href={Resume} 
               target="_blank"
               rel="noopener noreferrer">
              Download Resume
            </a>
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

export default About;