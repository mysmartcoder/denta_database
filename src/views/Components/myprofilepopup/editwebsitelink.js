import React, { useState, useEffect } from "react";
import { Modal, Form } from "reactstrap";
import InputForms from "../inputForm";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Api from "../../../redux/apis/profile";
import { validWebSiteRegex } from "../../../config/regex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editwebsitelink = (props) => {
    const [modal, setModal] = useState(false);
    const [webSite, setWebSite] = useState({
        SecondaryWebsiteId: 0,
        UserId: 0,
        SecondaryWebsiteurl: "",
        IsPrimary: false,
    });
    const [errors, setErrors] = useState("");
    const label =
        "Website Link " + (props.websiteNo > 0 ? props.websiteNo : "");
    useEffect(() => {
        setErrors("");
        if (
            props.secondaryWebsiteId != undefined &&
            props.secondaryWebsiteId != 0
        ) {
            Api.getWebSiteDetail(props.secondaryWebsiteId)
                .then((res) => {
                    setWebSite(res.data);
                })
                .catch((error) => {});
        } else {
            //setWebSite({ webSite });
        }
    }, [props.secondaryWebsiteId]);

    const handelChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        let errorValue = "";
        setWebSite((webSite) => ({
            ...webSite,
            [name]: value,
        }));
        if (value.length == 0) {
            errorValue = "Website is required.";
        } else {
            errorValue = validWebSiteRegex.test(value)
                ? ""
                : "Enter valid website.";
        }
        setErrors(errorValue);
    };

    const handelSubmit = (event) => {
        event.preventDefault();
        let errorValue = "";
        if (webSite.SecondaryWebsiteurl.length == 0) {
            errorValue = "Website is required.";
        } else {
            errorValue = validWebSiteRegex.test(webSite.SecondaryWebsiteurl)
                ? ""
                : "Enter valid website.";
        }
        setErrors(errorValue);
        if (errorValue.length == 0) {
            Api.postWebSiteDetail(webSite)
                .then((res) => {
                    props.onModalClick();
                    if (webSite.SecondaryWebsiteId > 0) {
                        toast.success("Successfully updated website!");
                    } else {
                        toast.success("Successfully added website!");
                    }
                    setTimeout(() => {
                        props.reload();
                    }, 3000);
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                });
        }
    };
    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                toggle={props.onModalClick}
                centered={true}
                className="wrap-small-modal popup-content main-block "
            >
                <div className="edit-profile">
                    <div className="sub-block myprofile-pop-up">
                        <Header
                            title={
                                (props.websiteNo > 0 ? "Edit" : "Add") +
                                " Website Link"
                            }
                            oncloseLick={props.onModalClick}
                        />
                        <div className="inner-block">
                            <Form
                                className="myprofile-form"
                                onSubmit={handelSubmit}
                            >
                                <div className="editwebsite main-form-block">
                                    <InputForms
                                        labelname={label}
                                        className={
                                            errors.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://www.drdds.com"
                                        id="email"
                                        name="SecondaryWebsiteurl"
                                        value={webSite.SecondaryWebsiteurl}
                                        onChange={handelChange}
                                    />
                                    {errors.length > 0 && (
                                        <span className="error">{errors}</span>
                                    )}
                                </div>
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
export default Editwebsitelink;
