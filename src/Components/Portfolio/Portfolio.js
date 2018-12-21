import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

import './Portfolio.css';

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
      width: this.props.width > 850 ? "277px" : "164px",
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
        <h3 style={{paddingLeft: "3px", fontFamily: "Aleo", fontWeight: '700'}}>{this.props.element.title}</h3>
        <p style={{paddingLeft: "3px", fontFamily: "Ubuntu", fontWeight: '200'}}>{this.props.element.desc}</p>
        <div className={linkClass}>{this.handleLinks(linkData)}</div>
      </div>
    )
  }
}

const masonryOptions = {
    transitionDuration: "0.4s"
};
  
class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
          active: {
            blog: false,
            project: false
          }
        };
        this.toggleClass = this.toggleClass.bind(this);
      
        this.singleUnitWidthSmall = 164 + 10; //160 width + 10 pad
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

export default Portfolio;