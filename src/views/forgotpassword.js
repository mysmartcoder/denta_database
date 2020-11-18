import React, { Component } from "react";
import Button from "./Components/Buttons/Btnpurple/btnpurple";
import { Link } from "react-router-dom";
import Footer from "../views/Components/footer/loginfooter";
import { Form, FormGroup } from "reactstrap";
import "../assets/css/login.css";
import Api from "../redux/apis/forgotpassword";
import { history } from "../history";

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
class ForgotPassword extends Component {
    state = {
        email: "",
        emailError: "",
        wrongUser: false,
        rMessage: "",
    };

    //Change event for email
    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
        if (this.state.email.length == 0) {
            this.setState({ emailError: "Email is required." });
        } else if (!validEmailRegex.test(this.state.email)) {
            this.setState({ emailError: "Email is not valid!" });
        } else {
            this.setState({ emailError: "" });
        }
    };

    // Form submit
    handleSubmit = (event) => {
        this.setState({ wrongUser: false, rMessage: "" });
        if (this.state.email.length == 0) {
            this.setState({ emailError: "Email is required." });
        } else if (!validEmailRegex.test(this.state.email)) {
            this.setState({ emailError: "Email is not valid!" });
        } else {
            event.preventDefault();
            // Call forgot password api
            Api.forgotPassword(this.state.email)
                .then((res) => {
                    console.log(res);
                    this.setState({ rMessage: res.data.Message });
                    setTimeout(() => history.push("/login"), 5000);
                })
                .catch((error) => {
                    this.setState({ rMessage: error.response.data.Message });
                });
        }
    };
    render() {
        return (
            <div className="body-background">
                <section className="common-section vh-100">
                    <div className="container h-100">
                        <div className="main-block align-items-center justify-content-center h-100 d-flex">
                            <div className="login sub-block">
                                <div className="d-block"></div>
                                <div className="inner-block">
                                    <div className="block-1">
                                        <h1>Forgot Password</h1>
                                    </div>
                                    <div className="block-2">
                                        <img
                                            src={require("../assets/img/logo.svg")}
                                            alt="logo"
                                            className="img-fluid"
                                        />
                                    </div>
                                    {this.state.rMessage.length > 0 && (
                                        <p className="error">
                                            {this.state.rMessage}
                                        </p>
                                    )}
                                    <Form
                                        onSubmit={this.handleSubmit}
                                        noValidate
                                    >
                                        <div className="content">
                                            <FormGroup
                                                className={
                                                    this.state.iserror
                                                        ? "login-ur error"
                                                        : "login-ur"
                                                }
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control light-border"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    value={
                                                        this.state.email || ""
                                                    }
                                                    onChange={
                                                        this.handleChangeEmail
                                                    }
                                                />
                                                {this.state.emailError.length >
                                                    0 && (
                                                    <span className="error">
                                                        {this.state.emailError}
                                                    </span>
                                                )}
                                                <img
                                                    src={require("../assets/img/warn.svg")}
                                                    className="error-img img-fluid"
                                                    alt="warn"
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="account-btn-block">
                                            <div className="btn-block">
                                                <Button
                                                    type="submit"
                                                    styleClass="btn-full"
                                                    value="Forgot Password"
                                                />
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default ForgotPassword;
