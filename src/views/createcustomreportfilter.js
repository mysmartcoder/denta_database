import React, { Component } from "react";
import CreateNav from "./Components/create-reportNav";
import Sidebartwicer from "./Components/sidebartwicer";
import Thead from "./Components/table/tableHead";
import TDropdown from "./Components/table/Tdropdown";
import Pagination from "./Components/table/pagination";
import Button from "./Components/Buttons/Btnpurple/btnpurple";
import ButtonGreen from "./Components/Buttons/Btnpurple/btngreen";
import Api from "../redux/apis/report";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../history";
const downlinks = [
    {
        id: 1,
        title: "view Details",
        imgsrc: require("../assets/img/eye-border.svg"),
    },
];

class CustomCreatereportfilter extends Component {
    state = {
        isOpenSidefilter: true,
        tableHeads: [],
        tablevalue: [],
        objReport: {},
        displayColumn: [],
    };

    togglehandleSidebar = () => {
        this.setState({
            isOpenSidefilter: !this.state.isOpenSidefilter,
        });
    };

    componentDidMount() {
        this.setState({
            objReport: JSON.parse(localStorage.getItem("objReport")),
        });
    }

    getColumnList = (tHead) => {
        console.log(tHead);
        let tdData = [];
        tHead.map((td) => {
            tdData.push(td.tittle);
        });
        let tbody = [
            {
                isDropDownAvailabe: false,
                tdData: tdData,
            },
        ];
        this.setState({
            tableHeads: tHead,
            tablevalue: tbody,
            displayColumn: tHead,
        });
    };
    mbtogglehandleSidebar = () => {
        this.setState({
            isOpenSidefilter: !this.state.isOpenSidefilter,
        });
    };

    getReportName = (reportName) => {
        let obj = {
            ReportId: 0,
            ReportName: reportName,
            ReportOn: this.state.objReport.FilterOn,
            UserId: 0,
            AccountId: 0,
            ReportFilter: [],
            ReportDisplayFields: [],
        };
        obj.ReportFilter.push({
            ReportId: 0,
            FilterOn: "adddress.city",
            FilterValue: this.state.objReport.selectedCity,
            IsSpeciality: false,
        });

        this.state.objReport.selectedSpe.map((spe) => {
            obj.ReportFilter.push({
                ReportId: 0,
                FilterOn: "Specialities",
                FilterValue: spe,
                IsSpeciality: true,
            });
        });

        this.state.displayColumn.map((col) => {
            obj.ReportDisplayFields.push({
                ReportId: 0,
                FieldDisplayName: col.tittle,
                ReportField: col.tittle,
                SortOrder: col.sortColumn,
            });
        });

        Api.createUpdateReport(obj)
            .then((res) => {
                toast.success("Successfully updated address!");
                setTimeout(() => {
                    localStorage.removeItem("objReport");
                    history.push("/dashboard");
                }, 3000);
            })
            .catch((error) => {
                toast.error("Something went wrong");
            });
    };

    render() {
        return (
            <div>
                <div
                    className={
                        this.state.isOpenSidefilter
                            ? "page-wrapper chiller-theme properties left-slide"
                            : "page-wrapper chiller-theme toggled properties"
                    }
                >
                    <CreateNav getReportName={this.getReportName} />
                    <Sidebartwicer
                        mbtogglehandleSidebar={() =>
                            this.mbtogglehandleSidebar()
                        }
                        getColumnList={this.getColumnList}
                    />
                    <div className="page-content-twicer">
                        <div className="main-body">
                            <div className="main-table-block table-section create-custom-report">
                                <div className="table-record-tittle">
                                    <div className="d-flex align-items-center flex-column flex-sm-row h-100">
                                        <div>
                                            <p className="h2 text-custom-light-blue mb-0 f-700">
                                                Custom Practice Report
                                            </p>
                                        </div>
                                        <div className="btn-custom-block">
                                            <div className="btn-custom group">
                                                <Button
                                                    styleClass="text-capitalize d-md-none mx-1"
                                                    value="Menu"
                                                    onClick={() =>
                                                        this.togglehandleSidebar()
                                                    }
                                                />
                                                {/* <ButtonGreen
                                                    styleClass="text-capitalize mx-1"
                                                    value="Undo"
                                                /> */}
                                                <Button
                                                    styleClass="text-capitalize mx-1"
                                                    value="Export"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive ">
                                    <table className="table table-hover">
                                        <thead>
                                            <Thead
                                                tableheads={
                                                    this.state.tableHeads
                                                }
                                            />
                                        </thead>
                                        <tbody>
                                            {this.state.tablevalue.map(
                                                (clm, index) => (
                                                    <tr key={index}>
                                                        {clm.tdData.map(
                                                            (data, index) => (
                                                                <React.Fragment>
                                                                    <td
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {data}
                                                                    </td>
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                        {clm.isDropDownAvailabe && (
                                                            <TDropdown
                                                                downlinks={
                                                                    downlinks
                                                                }
                                                            />
                                                        )}
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination />
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer hideProgressBar />
            </div>
        );
    }
}
export default CustomCreatereportfilter;
