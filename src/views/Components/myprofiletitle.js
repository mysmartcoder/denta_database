import React, { Component } from 'react';
import '../../assets/css/login.css'

class Profiletittle extends Component {
  render(){
    return (

      <div className={`profiles-tittle ${this.props.styleClass}`}>
      <p className="h2 text-custom-light-blue f-700">{this.props.title}</p>
    </div>
    )
  }
}
export default Profiletittle
