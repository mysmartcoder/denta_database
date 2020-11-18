import React, { useState } from "react";
import { Modal, Form, FormGroup, Label, CustomInput } from "reactstrap";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Button from "../Buttons/Btnpurple/btngreen";
import Api from "../../../redux/apis/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = (props) => {
    const [selectedFile, setSelectedFile] = useState();
    const [error, setError] = useState("");
    const handleInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const onModalClick = () => {
        setSelectedFile();
        props.onModalClick();
    };

    const onClickRemove = () => {
        Api.removeProfileImage()
            .then((res) => {
                props.onModalClick();
                toast.success("Profile picture removed.");
                //setTimeout(() => {}, 3000);
            })
            .catch((error) => {
                toast.error("Something went wrong!");
            });
    };
    const handelSubmit = (event) => {
        event.preventDefault();
        setError("");
        const data = new FormData();
        if (
            selectedFile != null ||
            (selectedFile != "" && selectedFile != undefined)
        ) {
            data.append("file", selectedFile);
            Api.postProfileImage(data)
                .then((res) => {
                    props.onModalClick();
                    toast.success("Successfully uploaded image!");
                    setTimeout(() => {
                        props.reload();
                    }, 3000);
                })
                .catch((error) => {
                    toast.error("Something went wrong!");
                });
        } else {
            setError("Please select profile picture!");
        }
    };

    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                toggle={onModalClick}
                centered={true}
                className="wrap-small-modal popup-content main-block "
            >
                <div className="edit-profile">
                    <div className="sub-block myprofile-pop-up">
                        <Header
                            title="Add Profile Images"
                            oncloseLick={onModalClick}
                        />
                        <div className="inner-block">
                            <Form onSubmit={handelSubmit}>
                                <FormGroup
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group mb-0"
                                            : "myprofile-form-group mb-0"
                                    }
                                >
                                    <Label>
                                        Upload Image
                                        <span className="error-exp"> * </span>
                                    </Label>
                                    <CustomInput
                                        className="form-control light-border"
                                        type="file"
                                        id="exampleCustomRange"
                                        label="Select Image"
                                        onChange={handleInputChange}
                                    />
                                    {error != "" && (
                                        <span className="error">{error}</span>
                                    )}
                                </FormGroup>
                                <Footer
                                    onModalClick={onModalClick}
                                    handleerror={props.handleerror}
                                    value="save"
                                    isRemove={true}
                                    onClickRemove={onClickRemove}
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
export default EditProfile;
