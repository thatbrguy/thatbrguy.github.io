import React, { Component } from 'react';
import './Section.css'


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

export default SectionBreak;