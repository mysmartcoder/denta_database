import React, { Component } from 'react';
import '../../assets/css/login.css'

class InformationRow extends Component {
  render(){
    return (
      <li className="column-data-element">
        <p>
          <span className="column-1">
            {this.props.title} : 
          </span>
          <span className="column-2">
            {this.props.data}
          </span>
        </p>
      </li>
    )
  }
}
export default InformationRow
