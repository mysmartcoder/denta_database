import React, { Component } from "react";
import Button from "../Components/Buttons/Btnpurple/btnpurple";
import { Link } from "react-router-dom";
import Footer from "../../views/Components/footer/loginfooter";
import { Form, FormGroup } from "reactstrap";
import "../../assets/css/login.css";
import { history } from "../../history";
import Api from "../../redux/apis/login";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};

class Loging extends Component {
    state = {
        iserror: false,
        username: "",
        password: "",
        companyId: 9,
        errors: {
            username: "",
            password: "",
        },
        wrongUser: false,
        loader: false,
        textType: "password",
    };

    //Check user is already login redirect to dashaboard
    componentDidMount() {
        if (
            localStorage.getItem("token") != undefined &&
            localStorage.getItem("token").length > 0
        ) {
            history.push("/dashboard");
        }
    }

    // // Change event for username
    // handleChangeUserName = (event) => {
    //     this.setState({ username: event.target.value });
    // };
    // // Change event for password
    // handleChangePassword = (event) => {
    //     this.setState({ password: event.target.value });
    // };

    //General change event for validation
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ name: value });
        let errors = this.state.errors;
        switch (name) {
            case "username":
                errors.username =
                    value.length == 0 ? "Please enter your username." : "";
                break;
            case "password":
                errors.password =
                    value.length == 0 ? "Please enter your password." : "";
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    };
    onChangeType = () => {
        if (this.state.textType == "password") {
            this.setState({ textType: "text" });
        } else {
            this.setState({ textType: "password" });
        }
    };
    //Form submit
    handleSubmit = (event) => {
        this.setState({ wrongUser: false });
        let errors = this.state.errors;
        if (this.state.username.length == 0) {
            errors.username = "Please enter your username.";
        }
        if (this.state.password.length == 0) {
            errors.password = "Please enter your password.";
        }
        this.setState({ errors: errors });
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            this.setState({ loader: true });
            let userModel = {
                Username: this.state.username,
                Password: this.state.password,
                CompanyId: this.state.companyId,
            };
            Api.logInPost(userModel)
                .then((res) => {
                    this.setState({ loader: false });
                    localStorage.setItem("token", res.data.Result.Token);
                    localStorage.setItem(
                        "userData",
                        JSON.stringify(res.data.Result)
                    );
                    history.push("/dashboard");
                })
                .catch((error) => {
                    this.setState({ wrongUser: true, loader: false });
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
                                        <h1>Sign In</h1>
                                    </div>
                                    <div className="block-2">
                                        <img
                                            src={require("../../assets/img/logo.svg")}
                                            alt="logo"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <span className="error">
                                        {this.state.wrongUser && (
                                            <span className="error">
                                                Invalid Username and Password
                                            </span>
                                        )}
                                    </span>
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
                                                    id="username"
                                                    name="username"
                                                    placeholder="User Name / Email Address"
                                                    value={
                                                        this.state.username ||
                                                        ""
                                                    }
                                                    onChange={
                                                        (this
                                                            .handleChangeUserName,
                                                        this.handleChange)
                                                    }
                                                />
                                                {errors.username.length > 0 && (
                                                    <span className="error">
                                                        {errors.username}
                                                    </span>
                                                )}
                                                <img
                                                    src={require("../../assets/img/warn.svg")}
                                                    className="error-img img-fluid"
                                                    alt="warn"
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                className={
                                                    this.state.iserror
                                                        ? "login-password error"
                                                        : "login-password"
                                                }
                                            >
                                                <input
                                                    type={this.state.textType}
                                                    className="form-control light-border"
                                                    id="exampleInputPassword1"
                                                    name="password"
                                                    placeholder="Enter Password"
                                                    value={
                                                        this.state.password ||
                                                        ""
                                                    }
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
                                                <span className="input-icon">
                                                    <Link
                                                        onClick={
                                                            this.onChangeType
                                                        }
                                                    >
                                                        <img
                                                            src={require("../../assets/img/eye.svg")}
                                                            alt="views"
                                                            className="img-fluid"
                                                        />
                                                    </Link>
                                                </span>
                                            </FormGroup>
                                            <div className="forget-link text-right link-purple">
                                                <Link
                                                    to="/forgotpassword"
                                                    className="h5 f-600"
                                                >
                                                    Forgot Password
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="account-btn-block">
                                            <div className="btn-block">
                                                <Button
                                                    type="submit"
                                                    styleClass="btn-full"
                                                    value="Sign In"
                                                    loader={this.state.loader}
                                                />
                                            </div>
                                            <div className="text-center pt-3">
                                                <p className="text-custom-light">
                                                    <span>
                                                        Don't have an account?
                                                    </span>
                                                    <span className="ml-2">
                                                        <Link
                                                            to="/signup"
                                                            className="text-uppercase text-custom-light-blue f-600"
                                                        >
                                                            Sign Up
                                                        </Link>
                                                    </span>
                                                </p>
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
export default Loging;
