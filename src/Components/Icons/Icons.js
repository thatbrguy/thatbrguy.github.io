import React, { Component } from 'react';
import './Icons.css';

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

export default ContactIcons;