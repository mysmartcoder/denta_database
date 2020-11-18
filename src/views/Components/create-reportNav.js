import React, { Component } from "react";
import ButtonGreen from "./Buttons/Btnpurple/btnImg";
import Button from "./Buttons/Btnpurple/btnpurple";
import SaveModal from "./savemodal";
import { history } from "../../history";
class createNav extends Component {
    state = {
        isSaveShow: false,
        isModalOpen: false,
    };
    componentDidMount() {
        console.log(window.location.pathname);
        if (window.location.pathname === "/CustomCreatereportfilter") {
            this.setState({ isSaveShow: true });
        }
    }
    onModalClick = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    };
    getReportName = (reportName) => {
        this.props.getReportName(reportName);
    };
    Onnext = () => {
        history.push("/account-setup");
    };
    Onexit = () => {
        history.push("/dashboard");
    };
    render() {
        return (
            <div className="">
                <div className="navbar-twicer d-flex justify-content-between align-items-center">
                    <div className="">
                        <ButtonGreen
                            onClick={() => this.Onexit()}
                            styleClass="btn btn-c-green text-capitalize"
                            translate="translate(-25 -132)"
                            fill="#fff"
                            value=" Exit"
                            dimention="M25.414,139.748h0l7.371-7.336a1.411,1.411,0,0,1,1.99,2l-4.949,4.925H46.464a1.411,1.411,0,0,1,0,2.821H29.828l4.949,4.925a1.411,1.411,0,0,1-1.99,2l-7.371-7.336h0A1.412,1.412,0,0,1,25.414,139.748Z"
                        />
                    </div>
                    {this.state.isSaveShow && (
                        <div>
                            <Button
                                styleClass="btn-with-img text-capitalize"
                                value="save"
                                onClick={() => this.onModalClick()}
                            />
                        </div>
                    )}
                </div>
                <SaveModal
                    isModalOpen={this.state.isModalOpen}
                    onModalClick={() => this.onModalClick()}
                    Onnext={() => this.Onnext()}
                    getReportName={this.getReportName}
                />
            </div>
        );
    }
}
export default createNav;
