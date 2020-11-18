import React, { Component } from 'react';
class Myprofilepopupheader extends Component {
  render(){
    return (
      <div className="d-flex header-profile align-items-center">
          <div className="profile-popup-title">
              <p className="h3 text-white mb-0">{this.props.title}</p>
          </div>
          <div className="ml-auto">
              <div className="close-btn" onClick={this.props.oncloseLick}>
                <img src={require('../../../assets/img/cls.svg')} className="img-fluid close-btn-img" alt="closeicons" />
              </div>
          </div>
      </div>
    )
  }
}
export default Myprofilepopupheader




