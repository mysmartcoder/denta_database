import React, { useState, useEffect } from "react";
import { Modal, Row, Col, ModalBody } from "reactstrap";
import Button from "./Buttons/Btnpurple/btngreen";
import { Link } from "react-router-dom";
const Welcome = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    useEffect(() => {
        let getCurrentPath = window.location.pathname;
        if (getCurrentPath === "/dashboard") {
            setTimeout(() => {
                setModal(true);
            }, 1000);

            setTimeout(() => {
                setModal(false);
            }, 7000);
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
                                        <Col
                                            lg={{ size: 6, order: 1 }}
                                            md={{ size: 7, order: 1 }}
                                            sm={{ size: 7 }}
                                            xs={{ size: 12, order: 2 }}
                                        >
                                            <div className="content p-0">
                                                <h1 className="f-600 ph-1">
                                                    Hello there!
                                                </h1>
                                                <p className="f-300 mt-md-3 mt-2">
                                                    Looks like you haven't
                                                    completed your account set
                                                    up. Why don't you check your
                                                    inbox for our email?
                                                </p>
                                                <h5 className="text-custom-light my-2 mt-md-3">
                                                    <span>Can't find it?</span>
                                                    <span>
                                                        <Link className="text-custom-light-blue f-600 ml-2">
                                                            Resend email
                                                        </Link>
                                                    </span>
                                                </h5>
                                                <div className="pt-2 pt-md-3">
                                                    <Button
                                                        value="OK, GOT IT"
                                                        onClick={toggle}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col
                                            lg={{ size: 5, offset: 1 }}
                                            md={{ size: 5, order: 2 }}
                                            sm={{ size: 5, order: 2 }}
                                            xs={{ size: 12, order: 1 }}
                                        >
                                            <div className="text-center">
                                                <div className="content-image">
                                                    <img
                                                        src={require("./../../assets/img/mail-icon.svg")}
                                                        alt="hold  moment"
                                                        className="img-fluid pt-4 pt-md-0"
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

export default Welcome;
