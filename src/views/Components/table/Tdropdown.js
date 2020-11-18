import React, { useState } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

const Tdropdown = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const downlinks = props.downlinks;
    const userId = props.userId;

    const listItems = downlinks.map((downlink) => (
        <DropdownItem
            tag="a"
            className={downlink.className}
            href={
                downlink.link != undefined
                    ? downlink.link + "?id=" + userId
                    : "javascript:void(0);"
            }
            onClick={() => {
                if (downlink.isClick) {
                    downlink.function();
                }
            }}
        >
            <img src={downlink.imgsrc} alt="menu" className="img-fluid" />{" "}
            {downlink.title}{" "}
        </DropdownItem>
    ));

    return (
        <td className={`${props.styleClass}`}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle tag="a">
                    <img
                        src={require("../../../assets/img/menu_gray.svg")}
                        alt="menu"
                        className="img-fluid  drpimg"
                    />
                </DropdownToggle>
                <DropdownMenu>{listItems}</DropdownMenu>
            </Dropdown>
        </td>
    );
};

export default Tdropdown;
