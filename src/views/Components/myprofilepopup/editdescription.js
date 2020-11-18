import React, { useState, useEffect } from "react";
import { Modal, Form } from "reactstrap";
import InputForms from "../inputForm";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Api from "../../../redux/apis/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Editdescription = (props) => {
    const [modal, setModal] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
        setDescription(props.description);
    }, [props.description]);

    const toggle = () => setModal(!modal);

    const handleChange = (event) => {
        setDescription(event.target.value);
    };
    const handelSubmit = (event) => {
        event.preventDefault();
        Api.updateDesciption(description)
            .then((res) => {
                props.onModalClick();
                toast.success("Successfully updated description!");
                setTimeout(() => {
                    props.reload();
                }, 3000);
            })
            .catch((error) => {
                toast.error("Something went wrong");
            });
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
                            title="Description"
                            oncloseLick={props.onModalClick}
                        />

                        <div className="inner-block">
                            <Form
                                className="myprofile-form"
                                onSubmit={handelSubmit}
                            >
                                <InputForms
                                    labelname="Enter Description"
                                    value={description.replace(
                                        /<br\/>/gi,
                                        "\n"
                                    )}
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    type="textarea"
                                    placeholder="https://www.drdds.com"
                                    id="email"
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

export default Editdescription;
