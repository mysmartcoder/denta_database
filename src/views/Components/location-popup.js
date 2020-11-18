import React, { useState, useEffect } from "react";
import { Modal, Form, FormGroup, Row, Col, Label, Input } from "reactstrap";
import Button from "./Buttons/Btnpurple/btnpurple";
import ButtonGreen from "./Buttons/Btnpurple/btngreen";
import Api from "../../redux/apis/dashboard";
import { Multiselect } from "multiselect-react-dropdown";
const Location = (props) => {
    const [modal, setModal] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [location, setLocation] = useState({
        CityName: "",
        CountyCode: null,
        CountyName: "",
        Id: 0,
        Latitude: 0,
        Longitude: 0,
        StateCode: "",
        StateName: "",
        ZipClass: null,
        ZipCode: null,
    });
    const [ddlDocation, setddlDocation] = useState([]);

    const getLocationList = (searchText = "") => {
        Api.getLocation(searchText)
            .then((res) => {
                setLocation(res.data.Result);
                let locObj = [];
                res.data.Result.map((loc) => {
                    locObj.push({
                        key: loc.CityName + ", " + loc.StateCode,
                        value: loc.CityName + ", " + loc.StateName,
                    });
                });
                setddlDocation(locObj);
            })
            .catch((error) => {});
    };
    useEffect(() => {
        getLocationList("");
    }, 1);

    const onchangeLocationSearch = (e) => {
        getLocationList(e);
    };

    const onSelect = (selectList, selectObj) => {
        props.onChangeLocationSearch(selectList[0].key);
        props.onModalClick();
    };

    const onRemove = (selectList, removeObj) => {};
    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                toggle={props.onModalClick}
                centered={true}
                className="wrap-small-modal popup-content main-block"
            >
                <div className="">
                    <div className="sub-block">
                        <div className="inner-block">
                            <p className="h1 mb-3 f-600 text-capitalize">
                                Search Location
                            </p>
                            <Form>
                                <FormGroup
                                    className={
                                        props.iserror
                                            ? "error myprofile-form-group"
                                            : "myprofile-form-group"
                                    }
                                >
                                    <Label>
                                        Speciality
                                        <span className="error-exp"> * </span>
                                    </Label>
                                    <Multiselect
                                        options={ddlDocation}
                                        displayValue="value"
                                        className="form-control light-bord er"
                                        onSearch={onchangeLocationSearch}
                                        placeholder="Search Location"
                                        selectionLimit="1"
                                        onSelect={onSelect}
                                        onRemove={onRemove}
                                    />
                                </FormGroup>

                                {/* <div className="form-group mb-0">
                                    <input
                                        type="text"
                                        placeholder="Search Location"
                                        className="form-control light-bord er"
                                        onChange={onchangeLocationSearch}
                                    />
                                    <span
                                        to="javascript:void(0)"
                                        className="search-location cursor-pointer"
                                    >
                                        <img
                                            src={require("../../assets/img/search.svg")}
                                            className="img-fluid"
                                            alt="searchicon"
                                        />
                                    </span>
                                </div> */}
                            </Form>
                            {/* <div className="py-md-3 py-3 text-right">
                                <ButtonGreen
                                    type="button"
                                    onClick={props.onModalClick}
                                    value="Cancel"
                                    styleClass="mr-2"
                                />
                                <Button
                                    type="button"
                                    onClick={props.Onnext}
                                    value="Save"
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Location;
