import React, { Component } from "react";
import Thead from "./tableHead";
import Pagination from "./pagination";
import ReportTittle from "./../reportTittle";
import CustomReportTableRow from "./customreporttablerow";
import API from "../../../redux/apis/report";
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #17468f;
`;
const tablehead = [
    {
        tittle: "",
        sortColumn: 0,
        isEnable: true,
    },
    {
        tittle: "Record Tittle",
        sortColumn: 1,
        isEnable: true,
    },
    // {
    //     tittle: "Recorded",
    //     sortColumn: 2,
    //     isEnable: true,
    // },
    // {
    //     tittle: "New Contacts",
    //     sortColumn: 3,
    //     isEnable: true,
    // },
    // {
    //     tittle: "Alert Frequency",
    //     sortColumn: 0,
    //     isEnable: true,
    // },
    {
        tittle: "Created By",
        sortColumn: 4,
        isEnable: true,
    },
    {
        tittle: "Created On",
        sortColumn: 5,
        isEnable: true,
    },
];

class Customreports extends Component {
    state = {
        reportObj: {
            SortColumn: 1,
            SortDirection: 1,
            UserId: 0,
            AccountId: 0,
            PageIndex: 1,
            PageSize: 15,
        },
        reportList: [],
        totalRecord: 0,
        loader: true,
    };

    componentDidMount = () => {
        this.getReportList();
    };

    onPageIndexChange = (pageSize, pageIndex) => {
        let { reportObj } = this.state;
        reportObj.PageIndex = pageIndex;
        reportObj.PageSize = pageSize;
        this.setState({ reportObj: reportObj }, this.getReportList);
    };

    changeSortColumn = (col) => {
        let { reportObj } = this.state;
        if (reportObj.SortColumn == col) {
            if (reportObj.SortDirection == 1) {
                reportObj.SortDirection = 2;
            } else {
                reportObj.SortDirection = 1;
            }
        } else {
            reportObj.SortDirection = 1;
        }
        reportObj.SortColumn = col;
        this.setState({ reportObj: reportObj }, this.getReportList());
    };

    getReportList = () => {
        API.getReports(this.state.reportObj)
            .then((res) => {
                this.setState({
                    loader: false,
                    totalRecord: res.data.Result[0].TotalRecord,
                    reportList: res.data.Result,
                });
            })
            .catch((error) => {
                this.setState({ loader: false });
            });
    };

    render() {
        return (
            <>
                {this.state.loader ? (
                    <div className="full-loader">
                        <div className="loader-spinner">
                            <div className="sweet-loading">
                                <FadeLoader
                                    css={override}
                                    size={150}
                                    color={"#123abc"}
                                    loading={!this.state.loading}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="main-table-block table-section dashboard-common  custom-report-section">
                        <ReportTittle tittle="Custom Reports List" />
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <Thead
                                        changeSortColumn={this.changeSortColumn}
                                        tableheads={tablehead}
                                    />
                                </thead>
                                <tbody>
                                    {this.state.reportList.length > 0 &&
                                        this.state.reportList.map((report) => (
                                            <CustomReportTableRow
                                                reportRecord={report}
                                            />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            onPageIndexChange={this.onPageIndexChange}
                            totalRecord={this.state.totalRecord}
                        />
                    </div>
                )}
            </>
        );
    }
}

export default Customreports;
