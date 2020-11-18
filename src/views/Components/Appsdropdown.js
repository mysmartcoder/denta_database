import React, { useState } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { RecordLincURL, OCRURL, VeridentURL } from "../../config/appConstatnt";
const AppsDropdown = (props) => {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
    return (
        <div className="">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="apps">
                <DropdownToggle tag="a" className="apps-link">
                    <img
                        src={require("../../assets/img/app.svg")}
                        className="img-fluid"
                        alt="app"
                    />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag="a" href={OCRURL} target="_blank">
                        <span>
                            <img
                                src={require("../../assets/img/apps-1.svg")}
                                className="img-fluid"
                                alt="apps-1"
                            />
                        </span>
                        <div>Referral</div>
                    </DropdownItem>
                    <DropdownItem tag="a" href={VeridentURL} target="_blank">
                        <span>
                            <img
                                src={require("../../assets/img/apps-2.png")}
                                className="img-fluid"
                                alt="apps-2"
                            />
                        </span>
                        <div>Insurance</div>
                    </DropdownItem>
                    <DropdownItem tag="a" href={RecordLincURL} target="_blank">
                        <span href={RecordLincURL}>
                            <img
                                src={require("../../assets/img/apps-3.png")}
                                className="img-fluid"
                                alt="apps-3"
                            />
                        </span>
                        <div>Recordlinc</div>
                    </DropdownItem>
                    <DropdownItem></DropdownItem>
                    {/* <DropdownItem tag="a">
                        <span>
                            <img
                                src={require("../../assets/img/apps-4.png")}
                                className="img-fluid"
                                alt="apps-4"
                            />
                        </span>
                        <div>Dentagraphics</div>
                    </DropdownItem> */}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default AppsDropdown;
