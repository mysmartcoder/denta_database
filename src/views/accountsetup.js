import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/login.css";
import { Col, Row } from "reactstrap";
import queryString from "query-string";
import Api from "../redux/apis/signup";
import { history } from "../history";

class AccountSetup extends Component {
    state = {
        message: "Hold On A Moment...",
        subtext: "",
        color: "#000000",
        isError: false,
        response: 0,
    };
    // Get encrypted email from query string and call account activation API
    componentDidMount() {
        const qString = queryString.parse(window.location.search);
        if (qString != null && qString.Email != undefined) {
            // Call account activation API
            Api.accountActivation(qString.Email)
                .then((res) => {
                    //success
                    this.setState({
                        message: res.data.Message,
                        color: "green",
                        response: 1,
                    });
                    setTimeout(() => history.push("/login"), 5000);
                })
                .catch((error) => {
                    if (error.response) {
                        //failed
                        this.setState({
                            message: error.response.data.Message,
                            color: "red",
                        });
                    }
                });
        }
    }
    render() {
        return (
            <div>
                <div className="body-background">
                    <section className="common-section vh-100">
                        <div className="container h-100">
                            <div className="main-block align-items-center justify-content-center h-100 d-flex">
                                <div className="sub-block wrap-midium">
                                    <div className="d-block">
                                        <div className="inner-block">
                                            <Row className="align-items-center">
                                                <Col md={7}>
                                                    <div className="block-2 text-left">
                                                        <img
                                                            src={require("../assets/img/logo.svg")}
                                                            alt="logo"
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                    <div className="content pb-0">
                                                        <h3
                                                            className="f-600 ph-1"
                                                            style={{
                                                                color: this
                                                                    .state
                                                                    .color,
                                                            }}
                                                        >
                                                            {this.state.message}
                                                        </h3>
                                                        <h4
                                                            style={{
                                                                display:
                                                                    this.state
                                                                        .response >
                                                                    0
                                                                        ? "block"
                                                                        : "none",
                                                            }}
                                                            className="f-300 my-md-3 my-2"
                                                        >
                                                            We are getting setup
                                                            for you.
                                                        </h4>

                                                        <p
                                                            style={{
                                                                display:
                                                                    this.state
                                                                        .response >
                                                                    0
                                                                        ? "block"
                                                                        : "none",
                                                            }}
                                                            className="text-custom-light f-300"
                                                        >
                                                            <span>Please</span>
                                                            <span className="">
                                                                <Link
                                                                    to="/login"
                                                                    className="text-purple f-600 mx-1"
                                                                >
                                                                    Click
                                                                </Link>
                                                            </span>
                                                            <span className="">
                                                                if you are not
                                                                redirected
                                                                automatically
                                                                within a few
                                                                seconds
                                                            </span>
                                                        </p>
                                                    </div>
                                                </Col>
                                                <Col
                                                    md={5}
                                                    className="text-center"
                                                >
                                                    <div className="content-image">
                                                        <img
                                                            src={require("../assets/img/group5751.svg")}
                                                            alt="hold  moment"
                                                            className="img-fluid pt-4 pt-md-0"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default AccountSetup;
