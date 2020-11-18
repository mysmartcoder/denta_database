import React, { Component } from "react";
import Thead from "./tableHead";
import TDropdown from "./Tdropdown";

class commonTable extends Component {
    changeSortColumn = (col) => {
        debugger;
        if (this.props.changeSortColumn != null) {
            this.props.changeSortColumn(col);
        }
    };
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <Thead
                            tableheads={this.props.tableHead}
                            changeSortColumn={this.changeSortColumn}
                        />
                    </thead>
                    <tbody>
                        {this.props.tablevalue.length == 0 && (
                            <tr style={{ textAlign: "center" }}>
                                <td colSpan="9">No record found!</td>
                            </tr>
                        )}
                        {this.props.tablevalue.map((clm, index) => (
                            <tr key={index}>
                                {clm.isDropDownAvailabe && (
                                    <TDropdown
                                        downlinks={this.props.downlinks}
                                        userId={clm.userId}
                                    />
                                )}
                                {clm.tdData.map((data, index) => (
                                    <React.Fragment>
                                        <td key={index}>{data}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default commonTable;
