import React, { Component } from "react";
import { history } from "../../history";
import { Row, Col, Form, Label, Input, FormGroup } from "reactstrap";
import ButtonGreenImg from "./Buttons/Btnpurple/btngreenimg";
import proApi from "../../redux/apis/profile";
import InputForms from "../Components/inputForm";
import dasApi from "../../redux/apis/dashboard";
import { Multiselect } from "multiselect-react-dropdown";

class ChooseData extends Component {
    state = {
        isShow: false,
        specialties: [],
        location: {
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
        },
        searchText: "",
        ddlDocation: [],
        selectedCity: "",
        FilterOn: "",
        selectedSpe: [],
        showContent: 0,
        errorMessage: {
            selectedCity: "",
            filterOn: "",
            selectedSpe: "",
        },
    };
    setGender(event) {
        this.setState({ isShow: true });
    }
    handleClick() {
        let flagError = false;
        let { errorMessage } = this.state;
        if (this.state.selectedCity.length == 0) {
            flagError = true;
            errorMessage.selectedCity = "Please select city.";
        }
        if (this.state.FilterOn.length == 0) {
            flagError = true;
            errorMessage.filterOn = "Please select any type.";
        }
        if (this.state.selectedSpe.length == 0) {
            flagError = true;
            errorMessage.selectedSpe = "Please select at least one speciality.";
        }
        this.setState({ errorMessage: errorMessage });
        let objReport = {
            selectedCity: this.state.selectedCity,
            FilterOn: this.state.FilterOn,
            selectedSpe: this.state.selectedSpe,
        };
        if (!flagError) {
            localStorage.setItem("objReport", JSON.stringify(objReport));
            history.push("/CustomCreatereportfilter");
        }
    }

    handleOnChange = (e) => {
        this.setState({ FilterOn: e.target.value });
    };

    onchangeLocationSearch = (e) => {
        this.getLocationList(e);
    };
    componentDidMount() {
        proApi
            .specialties()
            .then((res) => {
                this.setState({ specialties: res.data });
            })
            .catch((error) => {});
        this.getLocationList("");
    }
    getLocationList(text) {
        dasApi
            .getLocation(text)
            .then((res) => {
                let locObj = [];
                res.data.Result.map((loc) => {
                    locObj.push({
                        key: loc.CityName + ", " + loc.StateCode,
                        value: loc.CityName + ", " + loc.StateName,
                    });
                });
                this.setState({
                    ddlDocation: locObj,
                });
            })
            .catch((error) => {});
    }

    handelSpeChange = (spe) => {
        let selectedSpe = this.state.selectedSpe;
        if (selectedSpe.find((a) => a == spe.Value)) {
            let spcIndex = selectedSpe.findIndex((a) => a == spe.Value);
            selectedSpe.splice(spcIndex, 1);
        } else {
            selectedSpe = [...selectedSpe, spe.Value];
        }
        this.setState({ selectedSpe: selectedSpe });
    };

    onSelect = (selectList, selectObj) => {
        this.setState({ selectedCity: selectObj.key });
    };

    onRemove = (selectList, removeObj) => {
        this.setState({ selectedCity: "" });
    };

    render() {
        const { specialties, errorMessage } = this.state;
        return (
            <div className="">
                <div className="d-flex align-items-center py-4">
                    <h5 className="mb-0 f-600">Choose a data set</h5>
                </div>
                <div className="dataset-list">
                    <Form>
                        <Row>
                            <Col md={6}>
                                <div>
                                    <FormGroup
                                        className={"myprofile-form-group"}
                                    >
                                        <Label>
                                            Selecte city
                                            <span className="error-exp">
                                                {" "}
                                                *{" "}
                                            </span>
                                        </Label>
                                        <Multiselect
                                            options={this.state.ddlDocation}
                                            displayValue="value"
                                            className="form-control light-bord er"
                                            onSearch={
                                                this.onchangeLocationSearch
                                            }
                                            placeholder="Search Location"
                                            selectionLimit="1"
                                            onSelect={this.onSelect}
                                            onRemove={this.onRemove}
                                        />
                                    </FormGroup>
                                </div>
                                {errorMessage.selectedCity.length > 0 && (
                                    <span className="error">
                                        {errorMessage.selectedCity}
                                    </span>
                                )}
                            </Col>
                            <Col md={12}>
                                <div
                                    id="main-radio"
                                    onChange={this.setGender.bind(this)}
                                >
                                    <div
                                        className="form-check form-check-inline dataset-element-radio"
                                        onChange=""
                                    >
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="inlineRadio1"
                                            value="Contacts"
                                            onChange={this.handleOnChange}
                                        />
                                        <label
                                            className="form-check-label label-blk"
                                            for="inlineRadio1"
                                        >
                                            Contacts
                                            <span className="data-set-ele-img">
                                                <img
                                                    src={require("../../assets/img/contact.svg")}
                                                    alt="img-1"
                                                    className="img-fluid"
                                                />
                                            </span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline dataset-element-radio">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="inlineRadio4"
                                            value="Practices"
                                            onChange={this.handleOnChange}
                                        />
                                        <label
                                            className="form-check-label label-blk"
                                            for="inlineRadio4"
                                        >
                                            Practices
                                            <span className="data-set-ele-img">
                                                <img
                                                    src={require("../../assets/img/hospital.svg")}
                                                    alt="img-4"
                                                    className="img-fluid"
                                                />
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </Col>
                            {errorMessage.filterOn.length > 0 && (
                                <div>
                                    <span className="error">
                                        {errorMessage.filterOn}
                                    </span>
                                </div>
                            )}
                            <Col md={12}>
                                <div
                                    className={
                                        this.state.isShow
                                            ? "sub-categories-radio d-block"
                                            : "sub-categories-radio d-none"
                                    }
                                    id="subcategoriesradio"
                                >
                                    {specialties.length > 0 &&
                                        specialties.map((spe) => (
                                            <div className="form-check form-check-inline dataset-element">
                                                <Label
                                                    check
                                                    className="container-blk"
                                                >
                                                    <Input
                                                        type="checkbox"
                                                        onChange={() =>
                                                            this.handelSpeChange(
                                                                spe
                                                            )
                                                        }
                                                        name={spe.Value}
                                                    />{" "}
                                                    {spe.Text}
                                                    <span className="data-set-ele-img">
                                                        <img
                                                            src={require("../../assets/img/dental.svg")}
                                                            alt="img-5"
                                                            className="img-fluid"
                                                        />
                                                    </span>
                                                    <span className="checkmark"></span>
                                                </Label>
                                            </div>
                                        ))}
                                    {errorMessage.selectedSpe.length > 0 && (
                                        <span className="error">
                                            {errorMessage.selectedSpe}
                                        </span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="pt-5  text-center text-md-right">
                                    <div className="mr-0 mr-md-5">
                                        <ButtonGreenImg
                                            styleClass="btn-c-green btn-with-img text-capitalize"
                                            onClick={() => this.handleClick()}
                                            fill="#fff"
                                            dimention="M23.13 8.748l-.002-.002-7.371-7.335a1.41 1.41 0 0 0-1.99 2l4.948 4.925H2.08a1.41 1.41 0 1 0 0 2.821h16.636l-4.948 4.925a1.41 1.41 0 1 0 1.99 2l7.371-7.336.001-.001a1.412 1.412 0 0 0 0-1.997z"
                                            value="next"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}
export default ChooseData;
