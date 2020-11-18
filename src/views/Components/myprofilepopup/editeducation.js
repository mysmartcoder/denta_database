import React, { useState, useEffect } from "react";
import { Modal, Form, FormGroup, Label } from "reactstrap";
import InputForms from "../inputForm";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Api from "../../../redux/apis/profile";
import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editwebsitelink = (props) => {
    const [university, setUniversity] = useState([
        {
            id: "",
            text: "",
        },
    ]);
    const [education, setEducation] = useState({
        Id: 0,
        Institute: "",
        Specialisation: "",
        YearAttended: "",
    });
    const [value, setValue] = useState("");
    const year = new Date().getFullYear();
    const years = Array.from(new Array(50), (val, index) => year - index);
    useEffect(() => {
        if (props.educationId > 0) {
            Api.getEducation(props.educationId)
                .then((res) => {
                    setEducation(res.data);
                    Api.getSearchUniversityNames(res.data.Institute)
                        .then((res) => {
                            setUniversity(res.data);
                        })
                        .catch((error) => {});
                })
                .catch((error) => {});
        }
    }, [props.educationId]);

    const handelSearch = (searchText) => {
        if (searchText.length > 0) {
            Api.getSearchUniversityNames(searchText)
                .then((res) => {
                    setUniversity(res.data);
                })
                .catch((error) => {});
        }
    };
    const onSelect = (seleList, selectItem) => {
        setEducation((education) => ({
            ...education,
            ["Institute"]: selectItem.text,
        }));
    };
    const onRemove = (seleList, selectItem) => {
        setEducation((education) => ({
            ...education,
            ["Institute"]: "",
        }));
    };

    const handelChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        let errorValue = "";
        setEducation((education) => ({
            ...education,
            [name]: value,
        }));
    };
    const handelSubmit = (event) => {
        Api.postEducation(education)
            .then((res) => {
                console.log(res);
                props.onModalClick();
                if (education.Id > 0) {
                    toast.success("Successfully updated Education!");
                } else {
                    toast.success("Successfully inserted Education!");
                }
                setTimeout(() => {
                    props.reload();
                }, 3000);
            })
            .catch((error) => {
                toast.error("Something went wrong");
            });
    };
    // const handelChangeIntuition = (event) => {
    //     setValue(event.target.value);
    //     if (event.target.value.length > 0) {
    //         Api.getSearchUniversityNames(event.target.value)
    //             .then((res) => {
    //                 setUniversity(res.data);
    //             })
    //             .catch((error) => {});
    //     }
    // };

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
                            title="Edit Education Details"
                            oncloseLick={props.onModalClick}
                        />

                        <div className="inner-block">
                            <Form
                                className="myprofile-form"
                                onSubmit={handelSubmit}
                            >
                                <div className="myprofile-select">
                                    <FormGroup
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                    >
                                        <Label>
                                            Intuition Attended
                                            <span className="error-exp">
                                                {" "}
                                                *{" "}
                                            </span>
                                        </Label>
                                        <Multiselect
                                            options={university}
                                            displayValue="text"
                                            placeholder="Select Intuition"
                                            onSearch={handelSearch}
                                            selectionLimit="1"
                                            onSelect={onSelect}
                                            onRemove={onRemove}
                                        />
                                        <img
                                            src={require("../../../assets/img/warn.svg")}
                                            className="error-img img-fluid"
                                            alt="warn"
                                        />
                                    </FormGroup>
                                </div>
                                {/* 
                                <InputForms
                                    labelname="Intuition Attended"
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    onChange={handelChangeIntuition}
                                    type="text"
                                    placeholder="Boston University, Goldman School of Dental Medicine"
                                    id="link1"
                                /> */}
                                <InputForms
                                    labelname="Field of study/Degree"
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                    type="text"
                                    placeholder="Bachelor Of Dental Surgery [BDS] (Prosthodontics)"
                                    id="link2"
                                    value={education.Specialisation}
                                    name="Specialisation"
                                    onChange={handelChange}
                                />
                                <div className="myprofile-select">
                                    <FormGroup
                                        className={
                                            props.iserror
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                    >
                                        <Label>
                                            Last Year Attended / Graduated
                                            <span className="error-exp">
                                                {" "}
                                                *{" "}
                                            </span>
                                        </Label>
                                        <select
                                            className="form-control light-border"
                                            value={education.YearAttended}
                                            name="YearAttended"
                                            onChange={handelChange}
                                        >
                                            {years.map((year, index) => {
                                                return (
                                                    <option
                                                        key={year}
                                                        value={year}
                                                    >
                                                        {year}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </FormGroup>
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
