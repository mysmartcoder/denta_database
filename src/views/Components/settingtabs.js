import React, { useState, useEffect } from "react";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Form,
    FormGroup,
    Col,
    Label,
    Row,
    Input,
} from "reactstrap";
import classnames from "classnames";
import InputForms from "./inputForm";
import Footer from "./myprofilepopup/popupfooter";
import Api from "../../redux/apis/setting";
import {
    validPhoneRegex,
    validateForm,
    validFaxRegex,
    validCharRegex,
    validZipCodeRegex,
    validEmailRegex,
    validPasswordRegex,
} from "../../config/regex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #17468f;
`;
const Settingtabs = (props) => {
    const [activeTab, setActiveTab] = useState("1");
    const [loader, setLoader] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const [userData, setUserData] = useState({
        Token: "",
        UserId: 0,
        FirstName: "",
        LastName: "",
        ImageUrl: "",
        AccountName: "",
        AccountId: 0,
        IsNPINumber: true,
    });
    // Start User Details
    const [userDetails, setUserDetails] = useState({
        UserId: 0,
        UserName: "",
        FirstName: "",
        LastName: "",
        Email: "",
        SecondaryEmail: "",
    });

    const [errors, setErrors] = useState({
        UserName: "",
        FirstName: "",
        LastName: "",
        Email: "",
        SecondaryEmail: "",
    });

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")));
        if (userData.UserId > 0) {
            Api.getUserDetails(userData.UserId)
                .then((res) => {
                    setUserDetails(res.data.Result);
                    setLoader(false);
                })
                .catch((error) => {});
        }
    }, [userData.UserId]);

    const handelChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        let errorValue = "";
        setUserDetails((userDetails) => ({
            ...userDetails,
            [name]: value,
        }));
        switch (name) {
            case "UserName":
                if (value.trim().length == 0) {
                    errorValue = "Username is required.";
                } else {
                    errorValue =
                        value.length > 50
                            ? "User Name allow maximum 50 characters only."
                            : "";
                }
                break;
            case "FirstName":
                if (value.length > 0) {
                    errorValue = validCharRegex.test(value)
                        ? ""
                        : "Enter only characters!";
                } else {
                    errorValue =
                        value.length == 0 ? "First name is required." : "";
                }
                break;
            case "LastName":
                if (value.length == 0) {
                    errorValue = "Last name is required.";
                } else {
                    errorValue = validCharRegex.test(value)
                        ? ""
                        : "Enter only characters.";
                }
                break;
            case "Email":
                if (value.length == 0) {
                    errorValue = "Email is required.";
                } else {
                    errorValue = validEmailRegex.test(value)
                        ? ""
                        : "Enter valid email.";
                }
                break;
            default:
                break;
        }
        setErrors((errors) => ({
            ...errors,
            [name]: errorValue,
        }));
    };

    const handelUserSubmit = (event) => {
        if (userDetails.Email.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["Email"]: "Email is required.",
            }));
        } else if (!validEmailRegex.test(userDetails.Email)) {
            setErrors((errors) => ({
                ...errors,
                ["Email"]: "Email is not valid!",
            }));
        }
        if (userDetails.FirstName.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["FirstName"]: "First name is required.",
            }));
        } else if (!validCharRegex.test(userDetails.FirstName)) {
            setErrors((errors) => ({
                ...errors,
                ["FirstName"]: "Enter only characters.",
            }));
        }
        if (userDetails.LastName.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["LastName"]: "Last name is required.",
            }));
        } else if (!validEmailRegex.test(userDetails.Email)) {
            setErrors((errors) => ({
                ...errors,
                ["LastName"]: "Enter only characters.",
            }));
        }
        if (userDetails.UserName.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["UserName"]: "Username is required",
            }));
        } else if (userDetails.UserName.length > 50) {
            setErrors((errors) => ({
                ...errors,
                ["UserName"]: "User Name allow maximum 50 characters only.",
            }));
        }
        event.preventDefault();
        if (validateForm(errors)) {
            setBtnLoader(true);
            Api.postUserDetails(userDetails)
                .then((res) => {
                    setBtnLoader(false);
                    toast.success("Successfully details updated!");
                })
                .catch((error) => {
                    setBtnLoader(false);
                    if (error.response) {
                        toast.error(error.response.data.Message);
                    }
                });
        }
    };

    // End user details
    //Start Confirm password
    const [userPassword, setUserPassword] = useState({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
    });
    const [passErrors, setPassErrors] = useState({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
    });
    const [cPasswordRes, setCPasswordRes] = useState("");
    const handelPasswordChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        let errorValue = "";
        setUserPassword((userPassword) => ({
            ...userPassword,
            [name]: value,
        }));
        switch (name) {
            case "CurrentPassword":
                if (value.trim().length == 0) {
                    errorValue = "Old password is required.";
                } else {
                    errorValue = !validPasswordRegex.test(value)
                        ? "Password must be a minimum of 8 characters long and contain an upper and lower case letter, a number, and a symbol."
                        : "";
                }
                break;
            case "NewPassword":
                if (value.trim().length == 0) {
                    errorValue = "Password is required.";
                } else {
                    errorValue = !validPasswordRegex.test(value)
                        ? "Password must be a minimum of 8 characters long and contain an upper and lower case letter, a number, and a symbol. "
                        : "";
                }
                break;
            case "ConfirmPassword":
                if (value.trim().length == 0) {
                    errorValue = "Confirm Password is required.";
                } else {
                    errorValue =
                        userPassword.NewPassword != value
                            ? "Confirm password doesn't match with password"
                            : "";
                }
                break;
            default:
                break;
        }
        setPassErrors((errors) => ({
            ...errors,
            [name]: errorValue,
        }));
    };

    const handelCPasswordSubmit = (event) => {
        setCPasswordRes("");

        if (userPassword.CurrentPassword.trim().length == 0) {
            setPassErrors((errors) => ({
                ...errors,
                ["CurrentPassword"]: "Old password is required.",
            }));
        } else if (!validPasswordRegex.test(userPassword.CurrentPassword)) {
            setPassErrors((errors) => ({
                ...errors,
                ["CurrentPassword"]:
                    "Password must be a minimum of 8 characters long and contain an upper and lower case letter, a number, and a symbol.",
            }));
        }
        if (userPassword.NewPassword.trim().length == 0) {
            setPassErrors((errors) => ({
                ...errors,
                ["NewPassword"]: "Password is required.",
            }));
        } else if (!validPasswordRegex.test(userPassword.NewPassword)) {
            setPassErrors((errors) => ({
                ...errors,
                ["NewPassword"]:
                    "Password must be a minimum of 8 characters long and contain an upper and lower case letter, a number, and a symbol.",
            }));
        }
        if (userPassword.ConfirmPassword.trim().length == 0) {
            setPassErrors((errors) => ({
                ...errors,
                ["ConfirmPassword"]: "Confirm Password is required.",
            }));
        } else if (userPassword.NewPassword != userPassword.ConfirmPassword) {
            setPassErrors((errors) => ({
                ...errors,
                ["ConfirmPassword"]:
                    "Confirm password doesn't match with password.",
            }));
        }
        event.preventDefault();
        if (validateForm(passErrors)) {
            setBtnLoader(true);
            Api.postChangePassword(userPassword)
                .then((res) => {
                    setBtnLoader(false);
                    toast.success(res.data.Message);
                })
                .catch((error) => {
                    setBtnLoader(false);
                    if (error.response) {
                        toast.error(error.response.data.Message);
                    }
                });
        }
    };
    //End Confirm password
    return (
        <div className="">
            <Nav
                tabs
                className="setting-tabs common-box-profile pb-0 common-box-sahdow"
            >
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                            toggle("1");
                        }}
                    >
                        General
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                            toggle("2");
                        }}
                    >
                        Change Password
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                            toggle("3");
                        }}
                    >
                        Notifications
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="common-box-sahdow">
                {loader ? (
                    <div className="full-loader">
                        <div className="loader-spinner">
                            <div className="sweet-loading">
                                <FadeLoader
                                    css={override}
                                    size={150}
                                    color={"#123abc"}
                                    loading={!this.state.loading}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <TabPane tabId="1">
                        <div className="common-box-profile">
                            <div className="main-block">
                                <Form onSubmit={handelUserSubmit}>
                                    <InputForms
                                        labelname=" User Name"
                                        className={
                                            errors.UserName.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="Johndoe1258"
                                        name="UserName"
                                        onChange={handelChange}
                                        value={userDetails.UserName}
                                    />
                                    {errors.UserName.length > 0 && (
                                        <span className="error">
                                            {errors.UserName}
                                        </span>
                                    )}
                                    <FormGroup
                                        className={
                                            props.iserror
                                                ? " error myprofile-form-group "
                                                : " myprofile-form-group"
                                        }
                                    >
                                        <Row form>
                                            <Col md={12}>
                                                <Label>
                                                    Name
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
                                                        className={
                                                            errors.FirstName
                                                                .length > 0
                                                                ? "form-control light-border error"
                                                                : "form-control light-border "
                                                        }
                                                        placeholder="John"
                                                        name="FirstName"
                                                        onChange={handelChange}
                                                        value={
                                                            userDetails.FirstName
                                                        }
                                                    />
                                                    <img
                                                        src={require("../../assets/img/warn.svg")}
                                                        className="error-img img-fluid"
                                                        alt="error"
                                                    />
                                                </div>
                                                {errors.FirstName.length >
                                                    0 && (
                                                    <span className="error">
                                                        {errors.FirstName}
                                                    </span>
                                                )}
                                            </Col>
                                            <Col md={6} xs={6}>
                                                <div className="position-relative error-center two-field">
                                                    <Input
                                                        type="text"
                                                        className={
                                                            errors.LastName
                                                                .length > 0
                                                                ? "form-control light-border error"
                                                                : "form-control light-border "
                                                        }
                                                        placeholder="Doe"
                                                        name="LastName"
                                                        onChange={handelChange}
                                                        value={
                                                            userDetails.LastName
                                                        }
                                                    />
                                                    <img
                                                        src={require("../../assets/img/warn.svg")}
                                                        className="error-img img-fluid"
                                                        alt="error"
                                                    />
                                                </div>
                                                {errors.LastName.length > 0 && (
                                                    <span className="error">
                                                        {errors.LastName}
                                                    </span>
                                                )}
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <InputForms
                                        labelname="Primary Email"
                                        className={
                                            errors.Email.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="email"
                                        name="Email"
                                        placeholder="johndoe@mycompany.com"
                                        onChange={handelChange}
                                        value={userDetails.Email}
                                    />
                                    {errors.Email.length > 0 && (
                                        <span className="error">
                                            {errors.Email}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Secondary Email"
                                        className={
                                            errors.SecondaryEmail.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="email"
                                        name="SecondaryEmail"
                                        placeholder="johndoe@mycompany.com"
                                        onChange={handelChange}
                                        value={userDetails.SecondaryEmail}
                                    />
                                    {errors.SecondaryEmail.length > 0 && (
                                        <span className="error">
                                            {errors.SecondaryEmail}
                                        </span>
                                    )}
                                    <Footer
                                        value="save Changes"
                                        handleerror={props.handleerror}
                                        loader={btnLoader}
                                    />
                                </Form>
                            </div>
                        </div>
                    </TabPane>
                )}

                <TabPane tabId="2">
                    <div className="common-box-profile">
                        <div className="main-block">
                            <Form onSubmit={handelCPasswordSubmit}>
                                <InputForms
                                    labelname="Old Password"
                                    className={
                                        passErrors.CurrentPassword.length > 0
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    type="password"
                                    placeholder="Old Password"
                                    onChange={handelPasswordChange}
                                    value={userPassword.CurrentPassword}
                                    name="CurrentPassword"
                                />

                                {passErrors.CurrentPassword.length > 0 && (
                                    <span className="error">
                                        {passErrors.CurrentPassword}
                                    </span>
                                )}
                                <InputForms
                                    labelname="New Password"
                                    className={
                                        passErrors.NewPassword.length > 0
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    type="password"
                                    placeholder="New Password"
                                    onChange={handelPasswordChange}
                                    value={userPassword.NewPassword}
                                    name="NewPassword"
                                />
                                {passErrors.NewPassword.length > 0 && (
                                    <span className="error">
                                        {passErrors.NewPassword}
                                    </span>
                                )}
                                <InputForms
                                    labelname="Confirm Password"
                                    className={
                                        passErrors.ConfirmPassword.length > 0
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handelPasswordChange}
                                    value={userPassword.ConfirmPassword}
                                    name="ConfirmPassword"
                                />
                                {passErrors.ConfirmPassword.length > 0 && (
                                    <span className="error">
                                        {passErrors.ConfirmPassword}
                                    </span>
                                )}
                                <Footer
                                    value="Update Password"
                                    handleerror={props.handleerror}
                                    loader={btnLoader}
                                />
                            </Form>
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <div className="common-box-profile notification-form">
                        <div className="main-block">
                            <Form>
                                <FormGroup className="myprofile-form-group">
                                    <div>
                                        <Label>Activity</Label>
                                    </div>
                                    <div className="switch-block d-flex align-items-center">
                                        <div className="d-inline-flex">
                                            <Label className="switch mb-0">
                                                <Input type="checkbox" />
                                                <div className="slider"></div>
                                            </Label>
                                        </div>
                                        <div className="d-inline-flex ml-2">
                                            <p>Email me when someone join</p>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="myprofile-form-group">
                                    <div>
                                        <Label>Application</Label>
                                    </div>
                                    <div className="switch-block d-flex align-items-center">
                                        <div className="d-inline-flex">
                                            <Label className="switch mb-0">
                                                <Input type="checkbox" />
                                                <div className="slider"></div>
                                            </Label>
                                        </div>
                                        <div className="d-inline-flex ml-2">
                                            <p>Weekly product updates</p>
                                        </div>
                                    </div>
                                </FormGroup>
                                <Footer value="save Changes" />
                            </Form>
                        </div>
                    </div>
                </TabPane>
            </TabContent>
            <ToastContainer hideProgressBar />
        </div>
    );
};

export default Settingtabs;
