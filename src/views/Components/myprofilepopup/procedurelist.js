import React, { useState, useEffect } from "react";
import { Modal, Form, Table, Label, Input } from "reactstrap";
import InputForms from "../inputForm";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Api from "../../../redux/apis/profile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditProcedureList = (props) => {
    const [modal, setModal] = useState(false);
    const [procedure, setProcedure] = useState({
        ProcedureId: 0,
        ProcedureName: "",
        CostPercentage: 0,
        StandardFees: 0,
        Ischeck: false,
    });

    const toggle = () => setModal(!modal);

    useEffect(() => {
        Api.getProcedure()
            .then((res) => {
                setProcedure(res.data.Result);
            })
            .catch((error) => {});
    }, [props.userId]);

    const handelSubmit = (event) => {
        event.preventDefault();

        // const obj = {
        //     UserId: props.userId,
        //     Membership: membership,
        //     IsDelete: false,
        // };
        // if (obj.UserId > 0 && obj.Membership.length > 0) {
        //     Api.postMembership(obj)
        //         .then((res) => {
        //             console.log(res.data);
        //         })
        //         .catch((error) => {
        //             // this.setState({
        //             //     rMessage: "Something went wrong",
        //             // });
        //         });
        // }
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
                            title="Add Professional Membership"
                            oncloseLick={props.onModalClick}
                        />
                        <div className="inner-block">
                            <Form
                                className="myprofile-form"
                                onSubmit={handelSubmit}
                            >
                                <Table borderless responsive>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Procedures Name</th>
                                            <th>Insurance Cost Ratio</th>
                                            <th>Standard Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {procedure != null &&
                                            procedure.length > 0 &&
                                            procedure.map((pro) => (
                                                <tr>
                                                    <td>
                                                        <Label
                                                            check
                                                            className="container-blk"
                                                        >
                                                            <Input
                                                                type="checkbox"
                                                                checked={
                                                                    pro.Ischeck
                                                                }
                                                                id={
                                                                    pro.ProcedureId
                                                                }
                                                            />
                                                            <span className="checkmark"></span>
                                                        </Label>
                                                    </td>
                                                    <td>{pro.ProcedureName}</td>
                                                    <td>
                                                        {pro.CostPercentage}
                                                    </td>
                                                    <td>{pro.StandardFees}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
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

export default EditProcedureList;
