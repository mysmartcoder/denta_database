import React, { Component } from "react";
import "../../assets/css/login.css";
import { FormGroup, Input, Label } from "reactstrap";

// Input component
class InputForms extends Component {
    render() {
        return (
            <FormGroup className={this.props.className}>
                <Label>
                    {this.props.labelname}
                    <span className="error-exp"> * </span>
                </Label>
                <Input
                    type={this.props.type}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    className="form-control light-border"
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                />
                <img
                    src={require("../../assets/img/warn.svg")}
                    className="error-img img-fluid"
                    alt="warn"
                />
            </FormGroup>
        );
    }
}
export default InputForms;
