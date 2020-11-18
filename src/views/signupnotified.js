import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/login.css";
import { Col, Row } from "reactstrap";
class SignupNotified extends Component {
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
                                                        <h1 className="f-600 ph-1"></h1>
                                                        <h4 className="f-300 my-md-3 my-2"></h4>
                                                        <p className="text-custom-light f-300">
                                                            <span>Please</span>
                                                            <span className="">
                                                                <Link
                                                                    to="/dashboard"
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

export default SignupNotified;
