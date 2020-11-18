import React, { useState, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import Customcarousel from "./carousel";
const CarouselPopup = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    useEffect(() => {
        let getCurrentPath = window.location.pathname;
        if (getCurrentPath === "/dashboard") {
            setTimeout(() => {
                setModal(true);
            }, 8000);
            setTimeout(() => {
                setModal(false);
            }, 25000);
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
                            <div className="d-block carousel-block">
                                <div className="inner-block">
                                    <div className="block-carousel relative">
                                        <Customcarousel />
                                        <div className="close-btn d-inline-flex ml-auto carousel-close">
                                            <img
                                                src={require("../../assets/img/close.svg")}
                                                onClick={toggle}
                                                alt="close"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default CarouselPopup;
