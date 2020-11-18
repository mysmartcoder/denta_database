import React, { useState, useEffect } from "react";
import { Modal, Form, FormGroup, Label } from "reactstrap";
import InputForms from "../inputForm";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Api from "../../../redux/apis/profile";
import {
    validPhoneRegex,
    validateForm,
    validFaxRegex,
    validWebSiteRegex,
    validZipCodeRegex,
    validEmailRegex,
} from "../../../config/regex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editlocation = (props) => {
    let openModel = props.isModalOpen;
    const [addressModel, setAddressModel] = useState({
        AddressInfoID: 0,
        ExactAddress: "",
        Address2: "",
        City: "",
        State: "",
        Country: "",
        ZipCode: "",
        EmailAddress: "",
        Phone: "",
        Fax: "",
        ContactType: 0,
        Location: "",
        TimeZoneId: 0,
        Mobile: "",
        Website: "",
        ExternalPMSId: "",
        InternalId: "",
        SchedulingLink: "",
        IsSyncS1p: "",
        StateList: [],
        CountryList: [],
        TimeZoneList: [],
        NpiNumber: "",
    });

    const [errors, setErrors] = useState({
        Location: "",
        ExactAddress: "",
        State: "",
        City: "",
        ZipCode: "",
        TimeZone: "",
        EmailAddress: "",
        Phone: "",
        Mobile: "",
        Website: "",
        Fax: "",
    });

    const handelChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        let errorValue = "";
        setAddressModel((addressModel) => ({
            ...addressModel,
            [name]: value,
        }));
        switch (name) {
            case "ExactAddress":
                if (value.trim().length == 0) {
                    errorValue = "Street Address is required.";
                } else {
                    errorValue =
                        value.length > 100
                            ? "Street Address allow maximum 100 characters only."
                            : "";
                }
                break;
            case "Location":
                if (value.length == 0) {
                    errorValue = "Location is required.";
                } else {
                    errorValue =
                        value.length > 25
                            ? "Please enter only 25 characters for Location."
                            : "";
                }
                break;
            case "City":
                if (value.length == 0) {
                    errorValue = "City is required.";
                } else {
                    errorValue = "";
                }
                break;
            case "ZipCode":
                if (value.length == 0) {
                    errorValue = "Zip Code is required.";
                } else {
                    errorValue = validZipCodeRegex.test(value)
                        ? ""
                        : "Enter valid Zip Code!";
                }
                break;

            case "EmailAddress":
                if (value.length == 0) {
                    errorValue = "Email is required.";
                } else {
                    errorValue = validEmailRegex.test(value)
                        ? ""
                        : "Enter valid email.";
                }
                break;
            case "Phone":
                if (value.length == 0) {
                    errorValue = "Phone is required.";
                } else {
                    errorValue = validPhoneRegex.test(value)
                        ? ""
                        : "Enter valid number.";
                }
                break;
            case "Mobile":
                if (value.length == 0) {
                    errorValue = "Mobile is required.";
                } else {
                    errorValue = validPhoneRegex.test(value)
                        ? ""
                        : "Enter valid number!";
                }
                break;
            case "Website":
                if (value.length > 0) {
                    errorValue = validWebSiteRegex.test(value)
                        ? ""
                        : "Enter valid Website.";
                }
                break;
            case "Fax":
                if (value.length > 0) {
                    errorValue = validFaxRegex.test(value)
                        ? ""
                        : "Enter valid Fax!";
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
    const handelSubmit = (event) => {
        let flagError = false;
        if (addressModel.ExactAddress.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["ExactAddress"]: "Street Address is required.",
            }));
            flagError = true;
        }
        if (addressModel.Location.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["Location"]: "Location is required.",
            }));
            flagError = true;
        }
        if (addressModel.State.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["State"]: "State is required.",
            }));
            flagError = true;
        }

        if (addressModel.City.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["City"]: "City is required.",
            }));
            flagError = true;
        }

        if (addressModel.ZipCode.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["ZipCode"]: "Zip Code is required.",
            }));
            flagError = true;
        }

        if (addressModel.TimeZoneId.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["TimeZone"]: "Time Zone is required.",
            }));
            flagError = true;
        }

        if (addressModel.EmailAddress.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["EmailAddress"]: "Email is required.",
            }));
            flagError = true;
        }
        if (addressModel.Phone.length == 0) {
            setErrors((errors) => ({
                ...errors,
                ["Phone"]: "Phone is required.",
            }));
            flagError = true;
        }
        event.preventDefault();
        if (validateForm(errors) && !flagError) {
            Api.postAddress(addressModel)
                .then((res) => {
                    openModel = false;
                    props.onModalClick();
                    toast.success("Successfully updated address!");
                    setTimeout(() => {
                        props.reload();
                    }, 3000);
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                });
        }
    };
    useEffect(() => {
        if (props.addressId != undefined && props.addressId != 0) {
            Api.getAddress(props.addressId)
                .then((res) => {
                    setAddressModel(res.data);
                })
                .catch((error) => {});
        } else {
            setAddressModel({
                AddressInfoID: 0,
                ExactAddress: "",
                Address2: "",
                City: "",
                State: "",
                Country: "",
                ZipCode: "",
                EmailAddress: "",
                Phone: "",
                Fax: "",
                ContactType: 0,
                Location: "",
                TimeZoneId: 0,
                Mobile: "",
                Website: "",
                ExternalPMSId: "",
                InternalId: "",
                SchedulingLink: "",
                IsSyncS1p: "",
                StateList: [],
                CountryList: [],
                TimeZoneList: [],
                NpiNumber: "",
            });
        }
    }, [props.addressId]);
    return (
        <div>
            <Modal
                isOpen={openModel}
                toggle={props.onModalClick}
                centered={true}
                className="wrap-small-modal popup-content main-block "
            >
                <div className="edit-profile">
                    <div className="sub-block myprofile-pop-up">
                        <Header
                            title="Add Location Details "
                            oncloseLick={props.onModalClick}
                        />
                        <div className="inner-block">
                            <Form
                                className="myprofile-form"
                                onSubmit={handelSubmit}
                            >
                                <div className="main-form-block">
                                    <InputForms
                                        labelname="Location"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="Location"
                                        name="Location"
                                        value={addressModel.Location}
                                        onChange={handelChange}
                                    />
                                    {errors.Location.length > 0 && (
                                        <span className="error">
                                            {errors.Location}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Street Address"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="ExactAddress"
                                        name="ExactAddress"
                                        value={addressModel.ExactAddress}
                                        onChange={handelChange}
                                    />
                                    {errors.ExactAddress.length > 0 && (
                                        <span className="error">
                                            {errors.ExactAddress}
                                        </span>
                                    )}
                                    <div className="myprofile-select">
                                        <FormGroup
                                            className={
                                                props.iserror
                                                    ? "error myprofile-form-group"
                                                    : "myprofile-form-group"
                                            }
                                        >
                                            <Label>
                                                State
                                                <span className="error-exp">
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </Label>
                                            <select
                                                className="form-control light-border"
                                                value={addressModel.State}
                                                name="State"
                                            >
                                                {addressModel.StateList &&
                                                    addressModel.StateList
                                                        .length > 0 &&
                                                    addressModel.StateList.map(
                                                        (state) => (
                                                            <option
                                                                key={
                                                                    state.StateCode
                                                                }
                                                                value={
                                                                    state.StateCode
                                                                }
                                                            >
                                                                {
                                                                    state.StateName
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        </FormGroup>
                                    </div>
                                    {errors.State.length > 0 && (
                                        <span className="error">
                                            {errors.State}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="City"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        onChange={handelChange}
                                        id="City"
                                        name="City"
                                        value={addressModel.City}
                                    />
                                    {errors.State.length > 0 && (
                                        <span className="error">
                                            {errors.State}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Zip"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="ZipCode"
                                        onChange={handelChange}
                                        value={addressModel.ZipCode}
                                        name="ZipCode"
                                    />
                                    {errors.ZipCode.length > 0 && (
                                        <span className="error">
                                            {errors.ZipCode}
                                        </span>
                                    )}
                                    <div className="myprofile-select">
                                        <FormGroup
                                            className={
                                                props.iserror
                                                    ? "error myprofile-form-group"
                                                    : "myprofile-form-group"
                                            }
                                        >
                                            <Label>
                                                Time Zone
                                                <span className="error-exp">
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </Label>
                                            <select
                                                className="form-control light-border"
                                                value={addressModel.TimeZoneId}
                                                name="TimeZoneId"
                                            >
                                                {addressModel.TimeZoneList &&
                                                    addressModel.TimeZoneList
                                                        .length > 0 &&
                                                    addressModel.TimeZoneList.map(
                                                        (timeZone) => (
                                                            <option
                                                                key={
                                                                    timeZone.TimeZoneId
                                                                }
                                                                value={
                                                                    timeZone.TimeZoneId
                                                                }
                                                            >
                                                                {
                                                                    timeZone.TimeZoneText
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        </FormGroup>
                                    </div>
                                    {errors.TimeZone.length > 0 && (
                                        <span className="error">
                                            {errors.TimeZone}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Email"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="EmailAddress"
                                        name="EmailAddress"
                                        value={addressModel.EmailAddress}
                                        onChange={handelChange}
                                    />
                                    {errors.EmailAddress.length > 0 && (
                                        <span className="error">
                                            {errors.EmailAddress}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Phone"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="Phone"
                                        name="Phone"
                                        value={addressModel.Phone}
                                        onChange={handelChange}
                                    />
                                    {errors.Phone.length > 0 && (
                                        <span className="error">
                                            {errors.Phone}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Mobile"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="Mobile"
                                        name="Mobile"
                                        value={addressModel.Mobile}
                                        onChange={handelChange}
                                    />
                                    {errors.Mobile.length > 0 && (
                                        <span className="error">
                                            {errors.Mobile}
                                        </span>
                                    )}

                                    <InputForms
                                        labelname="Website"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="Website"
                                        name="Website"
                                        value={addressModel.Website}
                                        onChange={handelChange}
                                    />
                                    {errors.Website.length > 0 && (
                                        <span className="error">
                                            {errors.Website}
                                        </span>
                                    )}

                                    <InputForms
                                        labelname="Fax"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="Fax"
                                        name="Fax"
                                        value={addressModel.Fax}
                                        onChange={handelChange}
                                    />
                                    {errors.Fax.length > 0 && (
                                        <span className="error">
                                            {errors.Fax}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Scheduling Link"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="SchedulingLink"
                                        name="SchedulingLink"
                                        value={addressModel.SchedulingLink}
                                        onChange={handelChange}
                                    />
                                    <InputForms
                                        labelname="Internal Id"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="InternalId"
                                        name="InternalId"
                                        value={addressModel.InternalId}
                                        onChange={handelChange}
                                    />
                                    <InputForms
                                        labelname="NPI Number"
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        id="ZipCode"
                                        value={addressModel.NpiNumber}
                                        name="NpiNumber"
                                        onChange={handelChange}
                                    />
                                </div>
                                <Footer
                                    onModalClick={props.onModalClick}
                                    handleerror={props.handleerror}
                                    value="save"
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default Editlocation;
