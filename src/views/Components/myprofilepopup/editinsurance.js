import React, { useState, useEffect } from "react";
import { Modal, Form } from "reactstrap";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Insurence from "./insurencecheckbox";
import Api from "../../../redux/apis/profile";
import { Col, Row, FormGroup, Label, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editinsurencedetail = (props) => {
    const [insurance, setInsurance] = useState([
        {
            InsuranceId: 0,
            Name: "",
            IsActiveted: false,
            LocationId: 0,
        },
    ]);
    useEffect(() => {
        Api.getInsurance()
            .then((res) => {
                setInsurance(res.data.Result);
            })
            .catch((error) => {});
    }, [props.userId]);

    const handleCheck = (event) => {
        let id = event.target.id;
        let obj = insurance.find((a) => a.InsuranceId == id);
        let updatedObj = { ...obj, IsActiveted: !obj.IsActiveted };
        setInsurance(
            insurance.map((ins) => (ins.InsuranceId != id ? ins : updatedObj))
        );
    };

    const handelSubmit = (event) => {
        event.preventDefault();

        Api.postInsurance(insurance)
            .then((res) => {
                debugger;
                props.onModalClick();
                toast.success("Successfully insurance updated!");
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
                    <div className="sub-block myprofile-pop-up insurence">
                        <Header
                            title="Add or Edit Insurance Details"
                            oncloseLick={props.onModalClick}
                        />
                        <div className="inner-block">
                            <Form
                                className="myprofile-form checkbox-custom"
                                onSubmit={handelSubmit}
                            >
                                <Row form>
                                    {insurance.map((insurance) => (
                                        <Col md={6} xs={6}>
                                            <FormGroup className="checkboxes-list mb-0">
                                                <Label
                                                    check
                                                    className="container-blk"
                                                >
                                                    <Input
                                                        type="checkbox"
                                                        checked={
                                                            insurance.IsActiveted
                                                        }
                                                        id={
                                                            insurance.InsuranceId
                                                        }
                                                        onChange={handleCheck}
                                                    />{" "}
                                                    {insurance.Name}
                                                    <span className="checkmark"></span>
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    ))}
                                </Row>
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

export default Editinsurencedetail;
