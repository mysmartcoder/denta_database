import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../Components/sidebar";
import Navbar from "../Components/reportsNavbar";
import Customreport from "../Components/table/custom-reports";
import Dashboard from "../Components/table/Dashboard";
import CarouselPopup from "../Components/carouselpopup";
import Welcomepopup from "../Components/welcomepopup";
import Subscribe from "../Components/subscribemodal";
import Subscribepurple from "../Components/subscribepurplemodal";
import Myprofile from "./myprofile";
import Setting from "./setting";
import Loader from "react-loader";
import Billingdetail from "./billingdetail";
import qs from "query-string";
import Api from "../../redux/apis/dashboard";
import reporApi from "../../redux/apis/report";
import { css } from "@emotion/core";
import { history } from "../../../src/history";
import FadeLoader from "react-spinners/FadeLoader";
import { reportColumn } from "../../config/column";
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #17468f;
`;

class Adminpanel extends Component {
    state = {
        isOpenSidebar: true,
        searchText: "",
        dashboardFilter: {
            SearchLocation: "",
            SortColumn: 1,
            SortDirection: 1,
            PageIndex: 1,
            PageSize: 50,
            SearchText: "",
            ReportId: 0,
        },
        totalRecord: 0,
        tablevalue: [],
        isloader: false,
        selectedLocation: "",
        userData: {},
        tablehead: [],
    };

    toggleSidebar = () => {
        this.setState({
            isOpenSidebar: !this.state.isOpenSidebar,
        });
    };

    mbtoggleSidebar = () => {
        this.setState({
            isOpenSidebar: !this.state.isOpenSidebar,
        });
    };
    columnChange = (fields) => {
        this.setState({ tablehead: fields }, this.getDashBoardList());
        localStorage.setItem("reportColumn", JSON.stringify(fields));
    };
    onChangeSearchText = (text) => {
        this.setState({ searchText: text });
        let { dashboardFilter } = this.state;
        dashboardFilter.SearchText = text;
        this.setState(
            { dashboardFilter: dashboardFilter },
            this.getDashBoardList()
        );
    };
    onChangeLocationSearch = (locationText) => {
        let { dashboardFilter } = this.state;
        dashboardFilter.SearchLocation = locationText;
        this.setState(
            { dashboardFilter: dashboardFilter },
            this.getDashBoardList()
        );
    };
    componentDidMount = () => {
        const qsObj = qs.parse(window.location.search);
        if (
            qsObj != null &&
            (qsObj.reportId != undefined) & (qsObj.reportId > 0)
        ) {
            let objColumn = [];
            let { dashboardFilter } = this.state;
            dashboardFilter.ReportId = qsObj.reportId;
            reporApi
                .getReportById(qsObj.reportId)
                .then((res) => {
                    let reportFields = [];
                    // debugger;
                    reportFields = res.data.Result.ReportDisplayFields;
                    if (reportFields != null && reportFields.length > 0) {
                        reportColumn.map((col) => {
                            if (
                                reportFields.find(
                                    (a) => a.FieldDisplayName == col.tittle
                                ) ||
                                col.tittle == ""
                            ) {
                                objColumn.push(col);
                            } else {
                                col.isEnable = false;
                                objColumn.push(col);
                            }
                        });
                    }
                    this.setState(
                        {
                            dashboardFilter: dashboardFilter,
                            tablehead: objColumn,
                        },
                        this.getDashBoardList()
                    );
                    localStorage.setItem(
                        "reportColumn",
                        JSON.stringify(reportColumn)
                    );
                })
                .catch((error) => {});
        } else {
            this.setState(
                {
                    tablehead: reportColumn,
                },
                this.getDashBoardList()
            );
            console.log(reportColumn);
            localStorage.setItem("reportColumn", JSON.stringify(reportColumn));
        }
        this.setState({
            userData: JSON.parse(localStorage.getItem("userData")),
        });
    };

    getDashBoardList = () => {
        Api.getDashboardList(this.state.dashboardFilter)
            .then((res) => {
                console.log();
                let tablevalue = [];
                this.setState({
                    totalRecord: res.data.Result[0].TotalRecord,
                    isloader: true,
                });
                let { dashboardFilter } = this.state;
                if (dashboardFilter.SearchLocation == "") {
                    let location =
                        res.data.Result[0].City +
                        ", " +
                        res.data.Result[0].State;
                    this.setState({ selectedLocation: location });
                }
                res.data.Result.map((res) => {
                    let objBodyData = [];
                    let { tablehead } = this.state;
                    tablehead.map((m) => {});
                    let objData = tablehead
                        .filter((a) => a.isEnable == true)
                        .map((a) => a.tittle);

                    if (objData.includes("First Name")) {
                        objBodyData.push(res.FirstName);
                    }
                    if (objData.includes("Last Name")) {
                        objBodyData.push(res.LastName);
                    }
                    if (objData.includes("Practice")) {
                        objBodyData.push(res.PracticeName);
                    }
                    if (objData.includes("Specialty")) {
                        objBodyData.push(res.Specialities);
                    }
                    if (objData.includes("City")) {
                        objBodyData.push(res.City);
                    }
                    if (objData.includes("Phone No")) {
                        objBodyData.push(res.Phone);
                    }
                    if (objData.includes("Email Address")) {
                        objBodyData.push(res.Email);
                    }
                    if (objData.includes("Postal Code")) {
                        objBodyData.push(res.ZipCode);
                    }
                    tablevalue.push({
                        isDropDownAvailabe: true,
                        userId: res.UserId,
                        tdData: objBodyData,
                    });
                });
                this.setState({ tablevalue: tablevalue });
            })
            .catch((error) => {
                this.setState({ tablevalue: [], isloader: true });
            });
    };

    onPageIndexChange = (pageSize, pageIndex) => {
        let { dashboardFilter } = this.state;
        dashboardFilter.PageIndex = pageIndex;
        dashboardFilter.PageSize = pageSize;
        this.setState(
            { dashboardFilter: dashboardFilter },
            this.getDashBoardList()
        );
    };

    changeSortColumn = (col) => {
        let { dashboardFilter } = this.state;
        if (dashboardFilter.SortColumn == col) {
            if (dashboardFilter.SortDirection == 1) {
                dashboardFilter.SortDirection = 2;
            } else {
                dashboardFilter.SortDirection = 1;
            }
        } else {
            dashboardFilter.SortDirection = 1;
        }
        dashboardFilter.SortColumn = col;
        this.setState(
            { dashboardFilter: dashboardFilter },
            this.getDashBoardList()
        );
    };
    render() {
        return (
            <>
                {!this.state.isloader ? (
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
                    <div
                        className={
                            this.state.isOpenSidebar
                                ? "page-wrapper chiller-theme toggled"
                                : "page-wrapper chiller-theme"
                        }
                    >
                        <Sidebar
                            toggleSidebar={() => this.toggleSidebar()}
                            closeSidebar={() => this.closeSidebar()}
                            pathname={history.location.pathname}
                        />
                        <div
                            className="sidebar-last-open-link cursor-pointer"
                            onClick={() => this.toggleSidebar()}
                        >
                            <p>
                                <i className="fa fa-chevron-right"></i>
                            </p>
                        </div>
                        <div className="page-content dashboard-common">
                            <div className="main-body">
                                <div>
                                    <Navbar
                                        mbtoggleSidebar={() =>
                                            this.toggleSidebar()
                                        }
                                        onChangeSearchText={
                                            this.onChangeSearchText
                                        }
                                        onChangeSearch={this.onChangeSearch}
                                        onChangeLocationSearch={
                                            this.onChangeLocationSearch
                                        }
                                        selectedLocation={
                                            this.state.selectedLocation
                                        }
                                        totalRecord={this.state.totalRecord}
                                    />
                                </div>
                                <div className="information-btn text-center pt-3">
                                    <ul>
                                        {!this.state.userData
                                            .ISSubscription && (
                                            <li>
                                                <button className="btn btn-c-purple">
                                                    upgrade
                                                </button>
                                            </li>
                                        )}
                                        <li>
                                            <p className="text-custom-light-blue h5 f-600 mb-0 pt-2">
                                                Free Account 27 Contacts left
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <Switch>
                                    <Route exact path="/dashboard">
                                        <Dashboard
                                            columnChange={this.columnChange}
                                            tablehead={this.state.tablehead}
                                            searchText={this.state.searchText}
                                            onPageIndexChange={
                                                this.onPageIndexChange
                                            }
                                            changeSortColumn={
                                                this.changeSortColumn
                                            }
                                            tablevalue={this.state.tablevalue}
                                            totalRecord={this.state.totalRecord}
                                        />
                                        {/* </Loader> */}
                                    </Route>
                                    <Route path="/dashboard/custom-report">
                                        <Customreport />
                                        {/* <Subscribe
                                            isissubscribe={
                                                this.state.issubscribe
                                            }
                                        />
                                        <Subscribepurple
                                            issubscribepurple={
                                                this.state.issubscribepurple
                                            }
                                        /> */}
                                    </Route>
                                    <Route exact path="/dashboard/myprofile">
                                        <Myprofile />
                                    </Route>
                                    <Route exact path="/dashboard/setting">
                                        <Setting />
                                    </Route>
                                    <Route exact path="/dashboard/billing">
                                        <Billingdetail />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
export default Adminpanel;
