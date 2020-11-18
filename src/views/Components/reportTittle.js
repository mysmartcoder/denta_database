import React, { Component } from "react";
import Fields from "./field";
class reportTittle extends Component {
    columnChange = (field) => {
        debugger;
        this.props.columnChange(field);
    };
    render() {
        return (
            <div className="table-record-tittle">
                <div className="d-flex align-items-center h-100">
                    <div>
                        <p className="h2 text-custom-light-blue mb-0 f-700">
                            {this.props.tittle}
                        </p>
                    </div>
                    <div className="ml-auto">
                        <Fields
                            columnChange={this.columnChange}
                            fields={this.props.fields}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default reportTittle;
