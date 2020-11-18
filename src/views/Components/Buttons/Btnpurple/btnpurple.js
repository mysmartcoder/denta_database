import React from "react";
import { Spinner } from "reactstrap";
const Button = (props) => {
    // { styleClass, value }
    return (
        <button
            className={`btn btn-c-purple ${props.styleClass}`}
            onClick={props.onClick}
            type={props.type}
        >
            {props.loader && <Spinner style={{ verticalAlign: "middle" }} />}
            {props.value}
        </button>
    );
};
export default Button;
