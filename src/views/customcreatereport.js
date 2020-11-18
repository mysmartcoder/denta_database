import React, { Component } from "react";
import ChooseData from "./Components/Choosedata";
import CreateNav from "./Components/create-reportNav";
import Sidebartwicer from "./Components/sidebartwicer";

class CustomCreatereport extends Component {
    getColumnList = (data) => {
        console.log(data);
    };

    render() {
        return (
            <div className="page-wrapper chiller-theme toggled dataset">
                <CreateNav />
                <Sidebartwicer getColumnList={this.getColumnList} />
                <div className="page-content-twicer">
                    <div className="main-body">
                        <ChooseData />
                    </div>
                </div>
            </div>
        );
    }
}
export default CustomCreatereport;
