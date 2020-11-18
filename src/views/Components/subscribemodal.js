import React, { useState, useEffect } from "react";
import { Modal, Row, Col, ModalBody } from "reactstrap";
import Button from "./Buttons/Btnpurple/btngreen";
import { Link } from "react-router-dom";
const Subscribe = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    useEffect(() => {
        let getCurrentPath = window.location.pathname;
        if (getCurrentPath === "/dashboard/custom-report") {
            setTimeout(() => {
                setModal(true);
            }, 25000);
            setTimeout(() => {
                setModal(false);
            }, 30000);
        }
    }, []);
    return (
        <div>
            <Modal
                isOpen={modal}
                toggle={toggle}
                size="lg"
                className="wrap-midium-modal popup-content"
                centered={true}
            >
                <ModalBody>
                    <div className="main-block">
                        <div className="sub-block wrap-midium">
                            <div className="d-block">
                                <div className="inner-block">
                                    <Row className="align-items-center">
                                        <Col md={12}>
                                            <div className="text-right">
                                                <Link onClick={toggle}>
                                                    {" "}
                                                    <img
                                                        src={require("./../../assets/img/close.svg")}
                                                        alt="close"
                                                    />
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col
                                            md={{ size: 5, order: 1 }}
                                            sm={{ size: 6 }}
                                            xs={{ size: 12, order: 2 }}
                                        >
                                            <div className="content pb-0">
                                                <h1 className="f-600 ph-1">
                                                    Want to create custom
                                                    report?
                                                </h1>
                                                <p className="f-300 my-md-3 my-2">
                                                    You have to get a pro
                                                    version for create custom
                                                    data report. So, subscribe
                                                    now to access this
                                                    functionality from DrDDs
                                                    database.
                                                </p>
                                                <div className="pt-2 pt-md-3">
                                                    <Button
                                                        value="Subscribe Now"
                                                        styleClass="text-uppercase"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col
                                            md={{ size: 7, order: 2 }}
                                            sm={{ size: 6, order: 2 }}
                                            xs={{ size: 12, order: 1 }}
                                        >
                                            <div className="text-center">
                                                <div className="content-image">
                                                    <img
                                                        src={require("./../../assets/img/group7259.svg")}
                                                        alt="hold moment"
                                                        class="img-fluid pt-4 pt-md-0"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Subscribe;
