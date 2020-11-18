import React, { Component } from "react";
import Button from "./Components/Buttons/Btnpurple/btnpurple";
import { Link } from "react-router-dom";
import Footer from "../views/Components/footer/loginfooter";
import { Form, FormGroup } from "reactstrap";
import "../assets/css/login.css";
import Api from "../redux/apis/resetpassword";
import { history } from "../history";
import queryString from "query-string";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};
const validPasswordRegex = RegExp(
    /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@#!$%^&+=]).*$/
);

class ResetPassword extends Component {
    state = {
        email: "",
        password: "",
        cpassword: "",
        errors: {
            password: "",
            cpassword: "",
        },
        isError: false,
        response: 0,
        rMessage: "",
    };

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
    }

    // Get encrypted email from query string and set in state variable.
    componentDidMount() {
        const qString = queryString.parse(window.location.search);
        if (qString != null && qString.Eamil != undefined) {
            this.setState({ email: qString.Eamil });
        }
    }
    //Change event for password
    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    //Change event for confirm password
    handleChangeCPassword = (event) => {
        this.setState({ cpassword: event.target.value });
    };

    // Geenral Change event from validation
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case "password":
                if (value.length == 0) {
                    errors.password = "Password is required.";
                } else {
                    errors.password = validPasswordRegex.test(value)
                        ? ""
                        : "Enter valid password";
                }

                break;
            case "cpassword":
                if (value.length == 0) {
                    errors.cpassword = "Confirm password is required";
                } else {
                    if (value != this.state.password) {
                        errors.cpassword = "Passwords don't match.";
                    } else {
                        errors.cpassword = "";
                    }
                }
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    };

    //Form submit
    handleSubmit = (event) => {
        this.setState({ wrongUser: false });
        let errors = this.state.errors;
        if (this.state.password.length == 0) {
            errors.password = "Password is required.";
        } else if (!validPasswordRegex.test(this.state.password)) {
            errors.password = "Enter valid password";
        }
        if (this.state.cpassword.length == 0) {
            errors.cpassword = "Confirm Password is required.";
        }
        this.setState({ errors: errors });
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            let model = {
                email: this.state.email,
                password: this.state.password,
            };
            Api.resetPassword(model)
                .then((res) => {
                    console.log(res);
                    this.setState({ rMessage: res.data.Message });
                    setTimeout(() => history.push("/login"), 5000);
                })
                .catch((error) => {
                    this.setState({ isError: true });
                });
        }
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="body-background">
                <section className="common-section vh-100">
                    <div className="container h-100">
                        <div className="main-block align-items-center justify-content-center h-100 d-flex">
                            <div className="login sub-block">
                                <div className="d-block"></div>
                                <div className="inner-block">
                                    <div className="block-1">
                                        <h1>Reset Password</h1>
                                    </div>
                                    <div className="block-2">
                                        <img
                                            src={require("../assets/img/logo.svg")}
                                            alt="logo"
                                            className="img-fluid"
                                        />
                                    </div>
                                    {this.state.rMessage.length > 0 && (
                                        <span className="success">
                                            {this.state.rMessage}
                                        </span>
                                    )}
                                    <Form
                                        onSubmit={this.handleSubmit}
                                        noValidate
                                    >
                                        <div className="content">
                                            <FormGroup className="login-ur">
                                                <input
                                                    type="text"
                                                    className="form-control light-border"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    type="password"
                                                    value={this.state.password}
                                                    onChange={
                                                        (this
                                                            .handleChangePassword,
                                                        this.handleChange)
                                                    }
                                                />
                                                {errors.password.length > 0 && (
                                                    <span className="error">
                                                        {errors.password}
                                                    </span>
                                                )}
                                                <img
                                                    src={require("../assets/img/warn.svg")}
                                                    className="error-img img-fluid"
                                                    alt="warn"
                                                />
                                            </FormGroup>

                                            <FormGroup className="login-ur">
                                                <input
                                                    type="text"
                                                    className="form-control light-border"
                                                    id="cpassword"
                                                    name="cpassword"
                                                    type="password"
                                                    placeholder="Confirm password"
                                                    value={this.state.cpassword}
                                                    onChange={
                                                        (this
                                                            .handleChangeCPassword,
                                                        this.handleChange)
                                                    }
                                                />
                                                {errors.cpassword.length >
                                                    0 && (
                                                    <span className="error">
                                                        {errors.cpassword}
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
                                                    value="Reset Password"
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
export default ResetPassword;
