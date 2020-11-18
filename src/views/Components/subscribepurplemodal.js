import React, { useState, useEffect } from "react";
import { Modal, Row, Col, ModalBody } from "reactstrap";
import Button from "./Buttons/Btnpurple/btnpurple";
import { Link } from "react-router-dom";
const Subscribepurple = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        let getCurrentPath = window.location.pathname;
        if (getCurrentPath === "/dashboard/custom-report") {
            setTimeout(() => {
                setModal(true);
            }, 10000);
            setTimeout(() => {
                setModal(false);
            }, 15000);
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
                    <div className="main-block purple-blk">
                        <div className="sub-block wrap-midium">
                            <div className="d-block">
                                <div className="inner-block">
                                    <Row className="align-items-center">
                                        <Col md={12}>
                                            <div className="text-right">
                                                <Link onClick={toggle}>
                                                    {" "}
                                                    <img
                                                        src={require("./../../assets/img/white-close.svg")}
                                                        alt="close"
                                                    />
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col
                                            md={{ size: 6, order: 1 }}
                                            sm={{ size: 7 }}
                                            xs={{ size: 12, order: 2 }}
                                        >
                                            <div className="content">
                                                <h1 className="f-600 ph-1 mb-3">
                                                    Want to see more data from
                                                    DrDDS <br /> database?
                                                </h1>
                                                <p className="f-300 my-md-3 mt-2">
                                                    You have to get a pro
                                                    version for more data. So,
                                                    subscribe now to access more
                                                    data from DrDDs database.{" "}
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
                                            md={{ size: 6, order: 2 }}
                                            sm={{ size: 5, order: 2 }}
                                            xs={{ size: 12, order: 1 }}
                                        >
                                            <div className="text-center">
                                                <div className="content-image mb-0">
                                                    <img
                                                        src={require("./../../assets/img/subscribe-purple.svg")}
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

export default Subscribepurple;
