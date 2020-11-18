import React, { useState, useEffect } from "react";
import { Modal, Form } from "reactstrap";
import InputForms from "../inputForm";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Api from "../../../redux/apis/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfessionalMembership = (props) => {
    const [modal, setModal] = useState(false);
    const [membership, setMembership] = useState("");

    const toggle = () => setModal(!modal);
    const handleChange = (event) => {
        setMembership(event.target.value);
    };
    const handelSubmit = (event) => {
        event.preventDefault();
        const obj = {
            UserId: props.userId,
            Membership: membership,
            IsDelete: false,
        };
        if (obj.UserId > 0 && obj.Membership.length > 0) {
            Api.postMembership(obj)
                .then((res) => {
                    props.onModalClick();
                    toast.success("Successfully updated website!");
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
                    <div className="sub-block  myprofile-pop-up">
                        <Header
                            title="Add Professional Membership"
                            oncloseLick={props.onModalClick}
                        />
                        <div className="inner-block">
                            <Form
                                className="myprofile-form"
                                onSubmit={handelSubmit}
                            >
                                <InputForms
                                    labelname="Enter Professional Memberships"
                                    value={membership}
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    type="text"
                                    id="memberships"
                                    onChange={handleChange}
                                />
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

export default EditProfessionalMembership;
