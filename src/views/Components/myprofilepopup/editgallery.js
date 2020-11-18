import React, { useState } from "react";
import { Modal, Form, FormGroup, Label, CustomInput } from "reactstrap";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Button from "../Buttons/Btnpurple/btngreen";
import Api from "../../../redux/apis/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editgallery = (props) => {
    const [selectedFile, setSelectedFile] = useState();

    const handleInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handelSubmit = () => {
        const data = new FormData();
        data.append("file", selectedFile);
        Api.postImageGallery(data)
            .then((res) => {
                console.warn(res);
                props.onModalClick();
                toast.success("Successfully inserted image!");
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
                            title="Add Galley Images"
                            oncloseLick={props.onModalClick}
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
                                </FormGroup>
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
            <ToastContainer hideProgressBar />
        </div>
    );
};
export default Editgallery;
