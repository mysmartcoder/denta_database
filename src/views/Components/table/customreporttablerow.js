import React, { Component } from "react";
import TDropdown from "./Tdropdown";
import Drp from "./customreportdrpdown";
import { Link } from "react-router-dom";
import { history } from "../../../history";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "reactstrap";

import Api from "../../../redux/apis/report";
import { ExcelPath } from "../../../config/appConstatnt";
class CustomReportTableRow extends Component {
    downlinks = [
        {
            title: "Run",
            imgsrc: require("../../../assets/img/file-drp.svg"),
            isClick: true,
            function: () => this.onRunReport(),
        },
        {
            title: "Edit",
            imgsrc: require("../../../assets/img/edit.svg"),
            className: "edit_row",
            isClick: true,
            function: () => this.onedit(),
        },
        {
            title: "Export List",
            imgsrc: require("../../../assets/img/export.svg"),
            isClick: true,
            function: () => this.onExportRecord(),
        },
        {
            title: "Delete",
            imgsrc: require("../../../assets/img/bin.svg"),
            isClick: true,
            function: () => this.onDeleteReport(),
        },
    ];

    state = {
        isedit: true,
        reportText: "",
        report: this.props.reportRecord,
        isDeleted: false,
    };

    onRunReport = () => {
        window.location.href =
            "/dashboard?reportId=" + this.props.reportRecord.ReportId;
    };

    onDeleteReport = () => {
        //  e.preventDefault();
        if (window.confirm("Are you sure you want to delete?")) {
            Api.deleteReportById(this.props.reportRecord.ReportId)
                .then((res) => {
                    toast.success("Report deleted successfully");
                    this.setState({ isDeleted: true });
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                });
        }
    };
    onExportRecord = () => {
        {
            Api.createExcelById(this.props.reportRecord.ReportId)
                .then((response) => {
                    window.open(ExcelPath + response.data.Result, "_blank");
                })
                .catch((error) => console.log(error));
        }
    };
    onedit = () => {
        this.setState({
            isedit: !this.state.isedit,
            reportText: this.props.reportRecord.ReportName,
        });
    };
    componentDidMount = () => {
        this.setState({
            report: this.props.reportRecord,
            reportText: this.props.reportRecord.ReportName,
        });
    };
    handelChangeReport = (e) => {
        e.preventDefault();
        this.setState({ reportText: e.target.value });
    };
    onSave = () => {
        let reportName = this.state.reportText;
        if (reportName.length == 0) {
            toast.error("Report name is required");
            return;
        }
        let obj = {
            ReportId: this.props.reportRecord.ReportId,
            ReportName: this.state.reportText,
            ReportOn: "",
            UserId: 0,
            AccountId: 0,
            ReportFilter: [],
            ReportDisplayFields: [],
        };
        Api.createUpdateReport(obj)
            .then((res) => {
                let report = this.props.reportRecord;
                report.ReportName = this.state.reportText;
                this.setState({ report: report }, this.onedit());
                toast.success("Successfully updated name!");
            })
            .catch((error) => {
                toast.error("Something went wrong");
            });
    };

    render() {
        return (
            <>
                <ToastContainer hideProgressBar />
                {!this.state.isDeleted && (
                    <tr className={this.state.isedit ? "row-ed" : "row-ed"}>
                        <TDropdown
                            downlinks={this.downlinks}
                            styleClass={
                                this.state.isedit ? "drop-show" : "drop-hide"
                            }
                        />
                        <td
                            className={
                                this.state.isedit
                                    ? "edit-cl replace-drp-links-hide"
                                    : "edit-cl edit replace-drp-links-show"
                            }
                        >
                            <div className="show-blk last-td">
                                <Link
                                    className="false-row"
                                    onClick={() => this.onSave()}
                                >
                                    <img
                                        src={require("./../../../assets/img/drp-true.svg")}
                                        className="true img-fluid"
                                        alt="true"
                                    />
                                </Link>
                                <Link
                                    href="javascript:void(0);"
                                    className="true-row ml-1"
                                    onClick={() => this.onedit()}
                                >
                                    <img
                                        src={require("./../../../assets/img/drp-false.svg")}
                                        className="true img-fluid"
                                        alt="false"
                                    />
                                </Link>
                            </div>
                        </td>

                        <td
                            className={
                                this.state.isedit
                                    ? "form-td edit-cl "
                                    : "form-td edit-cl edit"
                            }
                            //onClick={() => this.Onprofile()}
                        >
                            <span className="hidden">
                                {this.props.reportRecord.ReportName}
                            </span>
                            <span className="show-blk">
                                <span className="form-group mb-0">
                                    <input
                                        type="text"
                                        class="form-control light-border"
                                        id={this.props.reportRecord.ReportId}
                                        name={this.props.reportRecord.ReportId}
                                        value={this.state.reportText}
                                        placeholder="Report name"
                                        onChange={this.handelChangeReport}
                                    />
                                </span>
                            </span>
                        </td>
                        {/* <td>{this.props.reportRecord.Recorded}</td>
                        <td className="text-green">
                            {this.props.reportRecord.NewContacts}
                        </td>
                        <td
                            className={
                                this.state.isedit
                                    ? "form-td edit-cl drpalter "
                                    : "form-td edit-cl drpalter edit"
                            }
                        >
                            <span className="hidden">
                                {this.props.reportRecord.AlertFrequency}
                            </span>
                            <span className="show-blk">
                                <Drp />
                            </span>
                        </td> */}
                        <td>{this.props.reportRecord.CreatedBy}</td>
                        <td>{this.props.reportRecord.CreatedOn}</td>
                    </tr>
                )}
            </>
        );
    }
}

export default CustomReportTableRow;
