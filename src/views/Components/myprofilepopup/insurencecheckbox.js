import React from "react";
import { Col, Row, FormGroup, Label, Input } from "reactstrap";

const Insurencebox = (props) => {
    const insurance = props.insurance;
    console.log(insurance);
    const listItems = insurance.map((insurance) => (
        <Col md={6} xs={6}>
            <FormGroup className="checkboxes-list mb-0">
                <Label check className="container-blk">
                    <Input
                        type="checkbox"
                        checked={insurance.IsActiveted}
                        id={insurance.InsuranceId}
                    />{" "}
                    {insurance.Name}
                    <span className="checkmark"></span>
                </Label>
            </FormGroup>
        </Col>
    ));
    return <Row form>{listItems}</Row>;
};

export default Insurencebox;
