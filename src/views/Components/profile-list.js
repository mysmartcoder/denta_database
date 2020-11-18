import React, { Component } from 'react';
import '../../assets/css/login.css'
class profileListelement extends Component {
  render(){
    return (
      <li  className={`common-green-dot ${this.props.styleClass}`}>
        {this.props.title}
      </li>
    )
  }
}
export default profileListelement

