import React, { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    Label,
    Input,
    FormGroup,
} from "reactstrap";

import Button from "./Buttons/Btnpurple/btngreen";
const Fields = (props) => {
    const [dropdownOpen, setOpen] = useState(false);
    let fields = JSON.parse(localStorage.getItem("reportColumn"));
    const onFieldCheckBox = (field, e) => {
        e.preventDefault();
        let obj1 = fields.find((a) => a.isEnable == true);
        let obj = fields.find((a) => a.tittle == field.tittle);
        let updatedObj = { ...obj, isEnable: !obj.isEnable };
        fields = fields.map((fld) =>
            fld.tittle != field.tittle ? fld : updatedObj
        );
        debugger;
        localStorage.setItem("reportColumn", JSON.stringify(fields));
        props.columnChange(fields);
    };
    const toggle = () => setOpen(!dropdownOpen);
    const closeDropDown = () => {
        setOpen(false);
    };
    return (
        <Dropdown
            className="fields checkbox-custom"
            isOpen={dropdownOpen}
            toggle={toggle}
        >
            <DropdownToggle className="filter-drop">Fields</DropdownToggle>
            <DropdownMenu className="field-link-menu">
                <Form>
                    <div className="checklist-block">
                        <div className="category-selction-box">
                            <div className="category-drp">
                                <p className="cat-tittle my-3">
                                    Dashboard fields
                                </p>
                                {fields.map((field) => (
                                    <>
                                        {field.tittle != "" && (
                                            <FormGroup
                                                className="checkboxes-list"
                                                check
                                            >
                                                <Label
                                                    check
                                                    className="container-blk"
                                                >
                                                    <Input
                                                        type="checkbox"
                                                        checked={field.isEnable}
                                                        onChange={(e) => {
                                                            onFieldCheckBox(
                                                                field,
                                                                e
                                                            );
                                                        }}
                                                    />{" "}
                                                    {field.tittle}
                                                    <span className="checkmark"></span>
                                                </Label>
                                            </FormGroup>
                                        )}
                                    </>
                                ))}

                                {/* <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input type="checkbox" id="checkbox2" />{" "}
                                        Associated contacts
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input type="checkbox" id="checkbox3" />{" "}
                                        City
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input type="checkbox" id="checkbox4" />{" "}
                                        Company domain name
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input type="checkbox" id="checkbox5" />{" "}
                                        Phone number
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input type="checkbox" id="checkbox6" />{" "}
                                        State/Region
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input type="checkbox" id="checkbox7" />{" "}
                                        Street Address
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input type="checkbox" id="checkbox8" />{" "}
                                        Mailing Zip/Postal Code
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup> */}
                            </div>
                            {/* <div className="category-drp">
                                <p className="cat-tittle my-3">
                                    Social Media Information
                                </p>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input type="checkbox" id="checkbox9" />{" "}
                                        Check me out
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox10"
                                        />{" "}
                                        Check me out
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox11"
                                        />{" "}
                                        Company revenue
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox12"
                                        />{" "}
                                        Associated contacts
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox13"
                                        />{" "}
                                        City
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox14"
                                        />{" "}
                                        Company domain name
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox15"
                                        />{" "}
                                        Phone number
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox16"
                                        />{" "}
                                        State/Region
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox17"
                                        />{" "}
                                        Street Address
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="checkboxes-list" check>
                                    <Label check className="container-blk">
                                        <Input
                                            type="checkbox"
                                            id="checkbox18"
                                        />{" "}
                                        Mailing Zip/Postal Code
                                        <span className="checkmark"></span>
                                    </Label>
                                </FormGroup>
                            </div>
                       */}
                        </div>
                        <div className="apply-btn-block">
                            <Button value="Close" onClick={closeDropDown} />
                        </div>
                    </div>
                </Form>
            </DropdownMenu>
        </Dropdown>
    );
};

export default Fields;
