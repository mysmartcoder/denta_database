import React, { useState } from "react";
import { Modal, Form } from "reactstrap";
import Button from "./Buttons/Btnpurple/btnpurple";
import ButtonGreen from "./Buttons/Btnpurple/btngreen";
const SaveMOdal = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [reportName, setReportName] = useState("");
    const [error, setError] = useState("");

    const handelChange = (e) => {
        setReportName(e.target.value);
        setError("");
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (reportName.length == 0) {
            setError("Please enter report name!");
        } else {
            props.getReportName(reportName);
            props.onModalClick();
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
                <div className="">
                    <div className="sub-block">
                        <div className="inner-block">
                            <p className="h1 mb-2 f-600 text-capitalize">
                                Save Custom Report
                            </p>
                            <p className="mb-3 f-300">
                                This custom report will be saved to your
                                reports.
                            </p>
                            <Form onSubmit={onSubmit} noValidate>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={reportName}
                                        placeholder="Custom Practice report"
                                        className={
                                            error.length > 0
                                                ? "error form-control light-border"
                                                : "form-control light-border"
                                        }
                                        onChange={handelChange}
                                    />
                                </div>
                                {error.length > 0 && (
                                    <span className="error"> {error}</span>
                                )}
                                <div className="py-md-3 py-1 text-right">
                                    <ButtonGreen
                                        type="button"
                                        onClick={props.onModalClick}
                                        value="Cancel"
                                        styleClass="mr-2"
                                    />
                                    <Button type="submit" value="Save" />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SaveMOdal;
