import React, { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { history } from "../../history";
const UserDropdown = (props) => {
    const [dropdownOpen, setOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const Onmyprofile = () => {
        history.push("/dashboard/myprofile");
    };
    const Onsetting = () => {
        history.push("/dashboard/setting");
    };
    const Onbilling = () => {
        history.push("/dashboard/billing");
    };

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")));
    }, {});

    const logOut = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        history.push("/login");
    };

    const toggle = () => setOpen(!dropdownOpen);

    return (
        <div className="">
            <Dropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                className="user-dropdown"
            >
                <DropdownToggle tag="a">
                    <div className="user-img">
                        <img src={userData.ImageUrl} className="img-fluid" />
                    </div>
                    <div className="user-name">
                        <h5 className="mb-1 f-600 text-white">
                            {userData.FirstName + " " + userData.LastName}
                        </h5>
                    </div>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem className="bg-custom-purple" tag="a">
                        <div className="user-img">
                            <img
                                src={userData.ImageUrl}
                                className="img-fluid"
                            />
                        </div>
                        <div className="d-inline-block">
                            <h5 className="mb-0 f-600 text-white">
                                {userData.FirstName + " " + userData.LastName}
                            </h5>
                        </div>
                    </DropdownItem>
                    <DropdownItem tag="a" onClick={Onmyprofile}>
                        <div className="d-flex align-items-center">
                            <span className="img-blk-drp">
                                <img
                                    src={userData.ImageUrl}
                                    className="img-fluid"
                                />
                            </span>
                            <span className="drp-links">Profile</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem tag="a" onClick={Onsetting}>
                        <div className="d-flex align-items-center">
                            <span className="img-blk-drp">
                                <img
                                    src={require("../../assets/img/setting.svg")}
                                    className="img-fluid"
                                    alt="setting"
                                />
                            </span>
                            <span className="drp-links">Settings</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem tag="a" onClick={Onbilling}>
                        <div className="d-flex align-items-center">
                            <span className="img-blk-drp">
                                <img
                                    src={require("../../assets/img/pay.svg")}
                                    className="img-fluid"
                                    alt="pay"
                                />
                            </span>
                            <span className="drp-links">Billings</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem tag="a">
                        <div
                            onClick={logOut}
                            className="d-flex align-items-center"
                        >
                            <span className="img-blk-drp">
                                <img
                                    src={require("../../assets/img/off.svg")}
                                    className="img-fluid"
                                    alt="off"
                                />
                            </span>
                            <span className="drp-links">LogOut</span>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default UserDropdown;
