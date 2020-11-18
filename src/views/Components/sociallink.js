import React, { Component } from 'react';
import '../../assets/css/login.css'
import {
  Link
} from "react-router-dom";
class Sociallink extends Component {
  render(){
    return (
      <li className="social-link-element">
        <Link to={this.props.link} target="_blank">
          <span className="link-blk">
            <img src={require("../../assets/img/"+`${this.props.img}`+"")} className="img-fluid"  alt={this.props.alt}/>
          </span> 
        </Link>
      </li>
    )
  }
}
export default Sociallink
