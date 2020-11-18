import React, { useState, useEffect, Component } from "react";
import { Modal, Form, FormGroup, Row, Col, Label, Input } from "reactstrap";
import InputForms from "../inputForm";
import Header from "./popupheader";
import { Multiselect } from "multiselect-react-dropdown";
import Footer from "./popupfooter";
import Api from "../../../redux/apis/profile";
import {
    validCharRegex,
    validEmailRegex,
    validPhoneRegex,
    validateForm,
} from "../../../config/regex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Editprofile = (props) => {
    const [userInfo, setUserInfo] = useState({
        UserId: 0,
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Description: "",
        OfficeName: "",
        Title: "",
        ImageName: "",
        Email: "",
        Phone: "",
        City: "",
        State: "",
        ZipCode: "",
        DentrixProviderId: "",
        PublicProfile: "",
        WebsiteURL: "",
        TeamMemberUserId: 0,
        Location: "",
        IsTDO: false,
        ProfileComplete: 0,
        Profilepercentage: "",
        RemainList: "",
        Institute: "",
        MemberShip: "",
        EncryptUserId: "",
        LocationId: 0,
        Salutation: "",
        specialtyIds: "",
        GallaryPath: "",
        lstBanner: [],
        lstGallary: [],
        lstInsurance: [],
        lstDoctorAddressDetails: [],
        lstDoctorSortedAddressDetails: [],
        lstEducationandTraining: [],
        lstProfessionalMemberships: [],
        lstSpeacilitiesOfDoctor: [],
        lstProcedure: [],
        licensedetails: [],
        objLicense: {},
        ObjProfileSection: {},
        lstDoctorAddressDetailsByAddressInfoID: [],
        lstGetSocialMediaDetailByUserId: [],
        lstEducationandTrainingForDoctorById: [],
        lstProfessionalMembershipForDoctorById: [],
        lstsecondarywebsitelist: [],
        lstTimeZone: [],
        lstTeamMemberDetailsForDoctor: [],
        IsRewardPatner: false,
    });

    const [errors, setErrors] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        specialty: "",
    });
    const [specialtyList, setSpecialtyList] = useState([]);
    let seletedSpecialtyList = [];

    useEffect(() => {
        Api.userData(props.userInfo.UserId)
            .then((user) => {
                setUserInfo(user.data);
                Api.specialties()
                    .then((res) => {
                        setSpecialtyList(res.data);
                        console.log(res.data);
                        debugger;
                        if (user.data.lstSpeacilitiesOfDoctor.length > 0) {
                            user.data.lstSpeacilitiesOfDoctor.map((spe) => {
                                for (let i = 0; i < res.data.length; i++) {
                                    if (spe.SpecialtyId == res.data[i].Value) {
                                        seletedSpecialtyList.push(res.data[i]);
                                    }
                                }
                            });
                        }
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
        console.log(seletedSpecialtyList);
    }, [props.userInfo.UserId]);

    // useEffect(() => {
    //     Api.specialties()
    //         .then((res) => {
    //             debugger;
    //             setSpecialtyList(res.data);
    //             if (userInfo.lstSpeacilitiesOfDoctor.length > 0) {
    //                 userInfo.lstSpeacilitiesOfDoctor.map((spe) => {
    //                     for (let i = 0; i < res.data.length; i++) {
    //                         if (spe.SpecialtyId == res.data[i].Value) {
    //                             seletedSpecialtyList.push(res.data[i]);
    //                         }
    //                     }
    //                 });
    //             }
    //         })
    //         .catch((error) => {});
    // }, [userInfo.lstSpeacilitiesOfDoctor]);

    const handleChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        let errorValue = "";
        setUserInfo((userInfo) => ({
            ...userInfo,
            [name]: value,
        }));
        switch (name) {
            case "Email":
                if (value.length == 0) {
                    errorValue = "Email is required.";
                } else {
                    errorValue = validEmailRegex.test(value)
                        ? ""
                        : "Email is not valid!";
                }
                break;
            case "Phone":
                if (value.length == 0) {
                    errorValue = "Phone number is required.";
                } else {
                    errorValue = validPhoneRegex.test(value)
                        ? ""
                        : "Phone number is not valid!";
                }
                break;
            case "FirstName":
                if (value.length > 0) {
                    errorValue = validCharRegex.test(value)
                        ? ""
                        : "Enter only characters!";
                } else {
                    errorValue =
                        value.length == 0 ? "First Name is required." : "";
                }
                break;
            case "LastName":
                if (value.length == 0) {
                    errorValue = "Last Name is required.";
                } else {
                    errorValue = validCharRegex.test(value)
                        ? ""
                        : "Enter only characters.";
                }
                break;
            default:
                break;
        }
        setErrors((errors) => ({
            ...errors,
            [name]: errorValue,
        }));
        // this.setState({ userInfo, [name]: value });
        // this.setState({ errors, [name]: value });
    };

    //Form submit
    const handleSubmit = (event) => {
        if (userInfo.Email.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["Email"]: "Email is required.",
            }));
        } else if (!validEmailRegex.test(userInfo.Email)) {
            setErrors((errors) => ({
                ...errors,
                ["Email"]: "Email is not valid!",
            }));
        }
        if (userInfo.Phone.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["Phone"]: "Phone number is required.",
            }));
        } else if (!validPhoneRegex.test(userInfo.Phone)) {
            setErrors((errors) => ({
                ...errors,
                ["Phone"]: "Phone number is not valid!",
            }));
        }
        if (userInfo.FirstName.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["FirstName"]: "First Name is required.",
            }));
        } else if (!validCharRegex.test(userInfo.FirstName)) {
            setErrors((errors) => ({
                ...errors,
                ["FirstName"]: "Enter only characters!",
            }));
        }
        if (userInfo.LastName.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["LastName"]: "Last Name is required.",
            }));
        } else if (!validCharRegex.test(userInfo.LastName)) {
            setErrors((errors) => ({
                ...errors,
                ["LastName"]: "Enter only characters!",
            }));
        }
        event.preventDefault();
        if (validateForm(errors)) {
            Api.postUserData(userInfo)
                .then((res) => {
                    props.onModalClick();
                    toast.success("Successfully profile updated!");
                    setTimeout(() => {
                        props.reload();
                    }, 3000);
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                });
        }
    };

    const onSelect = (selectList, selectObj) => {
        console.log(selectList);
    };

    const onRemove = (selectList, removeObj) => {};
    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                toggle={props.onModalClick}
                centered={true}
                className="wrap-small-modal popup-content main-block "
            >
                <div className="edit-profile">
                    <div className="sub-block  myprofile-pop-up">
                        <Header
                            title="Edit Personal Informations"
                            oncloseLick={props.onModalClick}
                        />
                        <div className="inner-block editpersonalinformation">
                            <Form
                                className="myprofile-form"
                                onSubmit={handleSubmit}
                            >
                                <FormGroup
                                    className={
                                        props.iserror
                                            ? " error myprofile-form-group"
                                            : "myprofile-form-group"
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
                                                        props.iserror
                                                            ? "form-control light-border error"
                                                            : "form-control light-border "
                                                    }
                                                    placeholder="first name"
                                                    name="FirstName"
                                                    value={userInfo.FirstName}
                                                    onChange={handleChange}
                                                />
                                                <img
                                                    src={require("../../../assets/img/warn.svg")}
                                                    className="error-img img-fluid"
                                                />
                                            </div>
                                            {errors.FirstName.length > 0 && (
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
                                                        props.iserror
                                                            ? "form-control light-border error"
                                                            : "form-control light-border "
                                                    }
                                                    placeholder="last name"
                                                    name="LastName"
                                                    value={userInfo.LastName}
                                                    onChange={handleChange}
                                                />
                                                <img
                                                    src={require("../../../assets/img/warn.svg")}
                                                    className="error-img img-fluid"
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
                                    labelname="Email Address"
                                    name="Email"
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    type="text"
                                    placeholder="xyz@email.com"
                                    id="EmailAddress"
                                    onChange={handleChange}
                                    value={userInfo.Email}
                                />
                                {errors.Email.length > 0 && (
                                    <span className="error">
                                        {errors.Email}
                                    </span>
                                )}
                                <InputForms
                                    labelname="Contact Number"
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    name="Phone"
                                    type="text"
                                    placeholder="(987)765-4321"
                                    id="number"
                                    onChange={handleChange}
                                    value={userInfo.Phone}
                                />
                                {errors.Phone.length > 0 && (
                                    <span className="error">
                                        {errors.Phone}
                                    </span>
                                )}

                                <FormGroup
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                >
                                    <Label>
                                        Speciality
                                        <span className="error-exp"> * </span>
                                    </Label>
                                    <Multiselect
                                        options={specialtyList}
                                        displayValue="Text"
                                        selectedValues={seletedSpecialtyList}
                                        placeholder="Select Specialty"
                                        onSelect={onSelect}
                                        onRemove={onRemove}
                                    />
                                    {errors.specialty.length > 0 && (
                                        <span className="error">
                                            {errors.specialty}
                                        </span>
                                    )}

                                    <img
                                        src={require("../../../assets/img/warn.svg")}
                                        className="error-img img-fluid"
                                        alt="warn"
                                    />
                                </FormGroup>
                                <Footer
                                    onModalClick={props.onModalClick}
                                    handleerror={props.handleerror}
                                    value="save changes"
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
            <ToastContainer hideProgressBar />
        </div>
    );
};

export default Editprofile;
