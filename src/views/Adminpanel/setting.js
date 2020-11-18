import React, { Component } from 'react';
import Settingtabs from '../Components/settingtabs'
class Setting extends Component {
  state = {
    iserror: false,
  }
  handleerror = () => {
    this.setState({
      iserror: !this.state.iserror
    });
  }
   render(){ 
      return (
        <div className="">
            <div className="py-3">
              <h2 className="text-custom-light-blue mb-0 f-700">
                Settings
              </h2>
            </div>
            <div className="personal-info">
                <Settingtabs iserror={this.state.iserror} handleerror={() => this.handleerror()} />
            </div>
            </div>
       );
   }
}

export default Setting;