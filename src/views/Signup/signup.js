import React, { Component } from "react";
import Button from "../Components/Buttons/Btnpurple/btnpurple";
import { Link } from "react-router-dom";
import Footer from "../../views/Components/footer/loginfooter";
import "../../assets/css/login.css";
import { FormGroup, Input, Row, Col, Label, Form } from "reactstrap";
import InputForms from "../Components/inputForm";
import Api from "../../redux/apis/signup";
import { history } from "../../history";
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validPasswordRegex = RegExp(
    /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@#!$%^&+=]).*$/
);
const validPhoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

const validCharRegex = RegExp(/^[a-zA-Z]+$/);

class Signuping extends Component {
    state = {
        iserror: false,
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        password: "",
        cpassword: "",
        companyId: 9,
        rMessage: "",
        loader: false,
        errors: {
            email: "",
            phone: "",
            firstname: "",
            lastname: "",
            password: "",
            cpassword: "",
        },
    };

    constructor(props) {
        super(props);
        this.checkboxHandler = this.checkboxHandler.bind(this);
    }
    // Change event for email
    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    };
    // Change event for password
    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };
    // Change event for confirm password
    handleChangeCPassword = (event) => {
        this.setState({ cpassword: event.target.value });
    };
    // Change event for first name
    handleChangeFirstName = (event) => {
        this.setState({ firstname: event.target.value });
    };
    // Change event for last name
    handleChangeLastName = (event) => {
        this.setState({ lastname: event.target.value });
    };
    // Change event for phone
    handleChangePhone = (event) => {
        this.setState({ phone: event.target.value });
    };

    checkboxHandler(e) {
        this.setState({
            checked: e.target.checked,
        });
    }

    //General change event for validation
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case "email":
                if (value.length == 0) {
                    errors.email = "Email is required.";
                } else {
                    errors.email = validEmailRegex.test(value)
                        ? ""
                        : "Email is not valid!";
                }
                break;
            case "phone":
                if (value.length == 0) {
                    errors.phone = "Phone number is required.";
                } else {
                    errors.phone = validPhoneRegex.test(value)
                        ? ""
                        : "Phone number is not valid!";
                }
                break;
            case "firstname":
                if (value.length > 0) {
                    errors.firstname = validCharRegex.test(value)
                        ? ""
                        : "Enter only characters!";
                } else {
                    errors.firstname =
                        value.length == 0 ? "First Name is required." : "";
                }
                break;
            case "lastname":
                if (value.length == 0) {
                    errors.lastname = "Last Name is required.";
                } else {
                    errors.lastname = validCharRegex.test(value)
                        ? ""
                        : "Enter only characters.";
                }
                break;
            case "password":
                if (value.length == 0) {
                    errors.password = "Password is required.";
                } else {
                    errors.password = validPasswordRegex.test(value)
                        ? ""
                        : "Enter valid password";
                }

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

    // Form submit
    handleSubmit = (event) => {
        let errors = this.state.errors;
        this.setState({ rMessage: "" });

        if (this.state.email.length == 0) {
            errors.email = "Email is required.";
        } else if (!validEmailRegex.test(this.state.email)) {
            errors.email = "Email is not valid!";
        }
        if (this.state.phone.length == 0) {
            errors.phone = "Phone number is required.";
        } else if (!validPhoneRegex.test(this.state.phone)) {
            errors.phone = "Phone number is not valid!";
        }
        if (this.state.firstname.length == 0) {
            errors.firstname = "First Name is required.";
        } else if (!validCharRegex.test(this.state.firstname)) {
            errors.firstname = "Enter only characters!";
        }
        if (this.state.lastname.length == 0) {
            errors.lastname = "Last Name is required.";
        } else if (!validCharRegex.test(this.state.lastname)) {
            errors.lastname = "Enter only characters!";
        }
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
        // API call to Check email valid or not
        if (validateForm(this.state.errors)) {
            this.setState({ loader: true });
            Api.getCheckEmail(this.state.email)
                .then((res) => {
                    if (res.data.Result != -1) {
                        errors.email = res.data.Message;
                        this.setState({ errors: errors, loader: false });
                    } else {
                        let userModel = {
                            email: this.state.email,
                            phone: this.state.phone,
                            firstname: this.state.firstname,
                            lastname: this.state.lastname,
                            password: this.state.password,
                        };
                        // Sing up api call
                        Api.signUpPost(userModel)
                            .then((res) => {
                                this.setState({ loader: false });
                                if (res.data.Result == "-1") {
                                } else {
                                    this.setState({
                                        rMessage:
                                            "Please check your email for a confirmation email to login to your account.",
                                    });
                                    setTimeout(
                                        () => history.push("/login"),
                                        10000
                                    );
                                }
                            })
                            .catch((error) => {
                                this.setState({
                                    rMessage: "Something went wrong",
                                    loader: false,
                                });
                            });
                    }
                })
                .catch((error) => {
                    this.setState({ loader: false });
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
                                        <h1>Sign Up</h1>
                                        <p className="text-custom-light">
                                            Create your account in 3 simple
                                            steps and <br />
                                            <span className="text-custom-light-blue">
                                                No credit card required
                                            </span>
                                        </p>
                                        {this.state.rMessage.length > 0 && (
                                            <p className="error">
                                                {this.state.rMessage}
                                            </p>
                                        )}
                                    </div>
                                    <div className="block-2">
                                        <img
                                            src={require("../../assets/img/logo.svg")}
                                            alt="logo"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <Form
                                        onSubmit={this.handleSubmit}
                                        noValidate
                                    >
                                        <div className="content">
                                            <FormGroup
                                                className={
                                                    this.state.iserror
                                                        ? " error"
                                                        : " "
                                                }
                                            >
                                                <Row form>
                                                    <Col md={12}>
                                                        <Label>
                                                            What is your name ?
                                                            <span className="error-exp">
                                                                {" "}
                                                                *{" "}
                                                            </span>
                                                        </Label>
                                                    </Col>
                                                    <Col md={6} xs={6}>
                                                        <div className="position-relative error-center two-field">
                                                            <Input
                                                                type="text"
                                                                className="form-control light-border"
                                                                placeholder="John"
                                                                name="firstname"
                                                                value={
                                                                    this.state
                                                                        .firstname ||
                                                                    ""
                                                                }
                                                                onChange={
                                                                    (this
                                                                        .handleChangeFirstName,
                                                                    this
                                                                        .handleChange)
                                                                }
                                                            />
                                                            {errors.firstname
                                                                .length > 0 && (
                                                                <span className="error">
                                                                    {
                                                                        errors.firstname
                                                                    }
                                                                </span>
                                                            )}
                                                            <img
                                                                src={require("../../assets/img/warn.svg")}
                                                                className="error-img img-fluid"
                                                                alt="error"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={6} xs={6}>
                                                        <div className="position-relative error-center two-field">
                                                            <Input
                                                                type="text"
                                                                className="form-control light-border"
                                                                placeholder="Doe"
                                                                name="lastname"
                                                                value={
                                                                    this.state
                                                                        .lastname ||
                                                                    ""
                                                                }
                                                                onChange={
                                                                    (this
                                                                        .handleChangeLastName,
                                                                    this
                                                                        .handleChange)
                                                                }
                                                            />
                                                            {errors.lastname
                                                                .length > 0 && (
                                                                <span className="error">
                                                                    {
                                                                        errors.lastname
                                                                    }
                                                                </span>
                                                            )}
                                                            <img
                                                                src={require("../../assets/img/warn.svg")}
                                                                className="error-img img-fluid"
                                                                alt="error"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <InputForms
                                                labelname="What is your email address?"
                                                type="email"
                                                placeholder="Johndoe@mycompany.com"
                                                id="email"
                                                name="email"
                                                value={this.state.email || ""}
                                                onChange={
                                                    (this.handleChangeEmail,
                                                    this.handleChange)
                                                }
                                            />
                                            {errors.email.length > 0 && (
                                                <span className="error">
                                                    {errors.email}
                                                </span>
                                            )}
                                            <FormGroup
                                                className={
                                                    this.state.iserror
                                                        ? " error"
                                                        : " "
                                                }
                                            >
                                                <Row form>
                                                    <Col md={12}>
                                                        <Label>
                                                            What is your
                                                            password ?
                                                            <span className="error-exp">
                                                                {" "}
                                                                *{" "}
                                                            </span>
                                                        </Label>
                                                    </Col>
                                                    <Col md={6} xs={6}>
                                                        <div className="position-relative error-center two-field">
                                                            <Input
                                                                type="text"
                                                                className="form-control light-border"
                                                                placeholder="Password"
                                                                name="password"
                                                                value={
                                                                    this.state
                                                                        .password ||
                                                                    ""
                                                                }
                                                                type="password"
                                                                onChange={
                                                                    (this
                                                                        .handleChangePassword,
                                                                    this
                                                                        .handleChange)
                                                                }
                                                            />
                                                            {errors.password
                                                                .length > 0 && (
                                                                <span className="error">
                                                                    {
                                                                        errors.password
                                                                    }
                                                                </span>
                                                            )}
                                                            <img
                                                                src={require("../../assets/img/warn.svg")}
                                                                className="error-img img-fluid"
                                                                alt="error"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={6} xs={6}>
                                                        <div className="position-relative error-center two-field">
                                                            <Input
                                                                type="text"
                                                                className="form-control light-border"
                                                                placeholder="Confirm Password"
                                                                name="cpassword"
                                                                type="password"
                                                                value={
                                                                    this.state
                                                                        .cpassword ||
                                                                    ""
                                                                }
                                                                onChange={
                                                                    (this
                                                                        .handleChangeCPassword,
                                                                    this
                                                                        .handleChange)
                                                                }
                                                            />
                                                            {errors.cpassword
                                                                .length > 0 && (
                                                                <span className="error">
                                                                    {
                                                                        errors.cpassword
                                                                    }
                                                                </span>
                                                            )}
                                                            <img
                                                                src={require("../../assets/img/warn.svg")}
                                                                className="error-img img-fluid"
                                                                alt="error"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                            <InputForms
                                                labelname="What is your phone number? "
                                                type="text"
                                                placeholder="(201) 555-5678"
                                                id="phone number"
                                                name="phone"
                                                value={this.state.phone || ""}
                                                onChange={
                                                    (this.handleChangePhone,
                                                    this.handleChange)
                                                }
                                            />
                                            {errors.phone.length > 0 && (
                                                <span className="error">
                                                    {errors.phone}
                                                </span>
                                            )}
                                            <div className="terms-and-privacy-blk">
                                                <div className="">
                                                    <p className="text-custom-light">
                                                        By Signing up, you agree
                                                        with our{" "}
                                                        <Link
                                                            to="https://drdds.com/database-list/terms"
                                                            target="_blank"
                                                            className="text-custom-light-blue f-600"
                                                        >
                                                            <i>
                                                                Terms of
                                                                Services
                                                            </i>
                                                        </Link>{" "}
                                                        and
                                                        <Link
                                                            to="https://drdds.com/database-list/privacy"
                                                            target="_blank"
                                                            className="text-custom-light-blue f-600 ml-2"
                                                        >
                                                            <i>
                                                                Privacy Policy
                                                            </i>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="account-btn-block">
                                            <div className="btn-block">
                                                <Button
                                                    styleClass="btn-full"
                                                    value="Complete sign up"
                                                    type="submit"
                                                    loader={this.state.loader}
                                                />
                                            </div>
                                            <div className="text-center pt-3">
                                                <p className="text-custom-light">
                                                    <span>
                                                        Already have an account?
                                                    </span>
                                                    <span className="ml-1">
                                                        <Link
                                                            to="/"
                                                            className="text-uppercase text-custom-light-blue f-600"
                                                        >
                                                            Sign In
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

    // Check API valid or not function.
    checkemail(email) {
        Api.getCheckEmail(email)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {});
    }
}
export default Signuping;
