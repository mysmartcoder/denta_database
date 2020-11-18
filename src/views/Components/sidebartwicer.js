import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";
import Button from "../Components/Buttons/Btnpurple/btnpurple";
import { reportColumn } from "../../config/column";
class Sidebartwicer extends Component {
    state = {
        isFilterShow: false,
        iscustomcratereport: false,
        isproperties: false,
        isfilterblk: false,
        isactivesearch: false,
        reportColumns: [],
        selectedColumn: [
            {
                tittle: "First Name",
                sortColumn: 1,
                isEnable: true,
            },
            {
                tittle: "Last Name",
                sortColumn: 2,
                isEnable: true,
            },
            {
                tittle: "Practice",
                sortColumn: 3,
                isEnable: true,
            },
        ],
        mainReportColumn: [],
    };
    updateColumnlist = () => {
        this.props.getColumnList(this.state.selectedColumn);
    };
    componentDidMount() {
        let objNew = reportColumn.splice(3, reportColumn.length);
        this.setState(
            {
                reportColumns: objNew,
                mainReportColumn: objNew,
            },
            this.updateColumnlist()
        );
        if (window.location.pathname === "/CustomCreatereportfilter") {
            this.setState({ isFilterShow: true });
            this.setState({ iscustomcratereport: false });
            this.setState({ isfilterblk: true });
        }
        if (window.location.pathname === "/customcreatereport") {
            this.setState({ iscustomcratereport: true });
        }
    }
    handlefilterclick = () => {
        this.setState({
            isactivesearch: !this.state.isactivesearch,
        });
    };

    handleFilter = () => {
        this.setState({
            isFilterShow: !this.state.isFilterShow,
        });
        this.setState({
            isproperties: !this.state.isproperties,
        });
    };
    handleFilterback = () => {
        this.setState({
            isFilterShow: !this.state.isFilterShow,
        });
        this.setState({
            isproperties: !this.state.isproperties,
        });
    };
    selectCol = (obj) => {
        let newObj = this.state.mainReportColumn.filter(
            (col) => col.tittle != obj.tittle
        );
        this.setState(
            {
                selectedColumn: [...this.state.selectedColumn, obj],
                mainReportColumn: newObj,
                reportColumns: newObj,
            },
            this.updateColumnlist()
        );
    };

    removeCol = (obj) => {
        if (this.state.selectedColumn.length > 1) {
            let newObj = this.state.selectedColumn.filter(
                (col) => col.tittle != obj.tittle
            );
            this.setState(
                {
                    selectedColumn: newObj,
                    mainReportColumn: [...this.state.mainReportColumn, obj],
                    reportColumns: [...this.state.mainReportColumn, obj],
                },
                this.updateColumnlist()
            );
        }
    };
    searchReportColumn = (e) => {
        let columns = [];
        let reportColumns = this.state.mainReportColumn;
        if (e.target.value.length > 0) {
            for (let i = 0; i < reportColumns.length; i++) {
                if (
                    reportColumns[i].tittle
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .includes(
                            e.target.value.toLowerCase().replace(/\s/g, "")
                        )
                ) {
                    columns.push(reportColumns[i]);
                }
                this.setState({ reportColumns: columns });
            }
        } else {
            this.setState({ reportColumns: reportColumn });
        }
    };
    render() {
        return (
            <div className="sidebar-twicer ">
                <div className="sidebar-main-block">
                    {this.state.iscustomcratereport && (
                        <div className="sidebar-twicer-pad">
                            <div className="py-5">
                                <h5 className="text-white f-600">
                                    What do you want to report on?
                                </h5>
                            </div>
                        </div>
                    )}
                    {this.state.isfilterblk && (
                        <div>
                            <div className="sidebar-twicer-pad">
                                <div className="filter-btn-block">
                                    <div
                                        className={
                                            this.state.isactivesearch
                                                ? "filter-search-side active"
                                                : "filter-search-side"
                                        }
                                    >
                                        <Form className="property-search-block filter-property position-relative">
                                            <input
                                                className="form-control mr-sm-2"
                                                type="search"
                                                placeholder="Filter Property"
                                                aria-label=""
                                            />
                                            <span
                                                to="javascript:void(0)"
                                                className="property-search-link"
                                                onClick={() =>
                                                    this.handlefilterclick()
                                                }
                                            >
                                                <img
                                                    src={require("../../assets/img/property-search.svg")}
                                                    className="img-fluid"
                                                    alt="searchicon"
                                                />
                                            </span>
                                        </Form>
                                    </div>
                                    <div
                                        className={
                                            this.state.isactivesearch
                                                ? "filter-show-side"
                                                : "filter-show-side active"
                                        }
                                    >
                                        <Button
                                            styleClass="btn-full btn-light-blue-transparent"
                                            value="filter(1)"
                                            onClick={() =>
                                                this.handlefilterclick()
                                            }
                                        />
                                    </div>
                                    <span
                                        className="filter-close"
                                        onClick={() =>
                                            this.props.mbtogglehandleSidebar()
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 21.171 21.171"
                                            id="filter_close"
                                        >
                                            <g
                                                id="close"
                                                transform="translate(17.736 -4.265)"
                                            >
                                                <g
                                                    id="Group_5849"
                                                    data-name="Group 5849"
                                                    transform="translate(-17.158 4.843)"
                                                >
                                                    <path
                                                        id="Path_1717"
                                                        data-name="Path 1717"
                                                        d="M11.156,10.047l8.706-8.706a.785.785,0,0,0-1.11-1.11L10.046,8.937,1.34.231A.785.785,0,1,0,.23,1.341l8.706,8.706L.23,18.754a.785.785,0,0,0,1.11,1.11l8.706-8.706,8.706,8.706a.785.785,0,1,0,1.11-1.11Z"
                                                        transform="translate(0 -0.001)"
                                                        stroke="#fff"
                                                        fill="#ffffff"
                                                        stroke-width="1"
                                                    ></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="border-blk"></div>
                        </div>
                    )}
                    {this.state.isFilterShow && (
                        <div className="">
                            <div className="sidebar-track">
                                <div className="slide-first">
                                    <div className="sidebar-twicer-pad">
                                        <div className="single-data-box px-0">
                                            <h5 className="text-white f-700 mb-2">
                                                Properties
                                            </h5>
                                            <p className="text-white mb-0">
                                                Add properties to build this
                                                report with the data you want.
                                            </p>
                                        </div>

                                        <div className="single-data-box mt-0 px-0">
                                            <h5 className="text-white f-600 mb-2">
                                                Selected Properties
                                            </h5>
                                            <ul className="property-list">
                                                {this.state.selectedColumn &&
                                                    this.state.selectedColumn.map(
                                                        (scol) => (
                                                            <li
                                                                onClick={() =>
                                                                    this.removeCol(
                                                                        scol
                                                                    )
                                                                }
                                                            >
                                                                <p className="mb-0 small-14">
                                                                    {
                                                                        scol.tittle
                                                                    }
                                                                </p>
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        </div>
                                        <Button
                                            styleClass="btn-full"
                                            value="Add practice property"
                                            onClick={() => this.handleFilter()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {this.state.isproperties && (
                        <div className="property-inner">
                            <div className="sidebar-twicer-pad">
                                <div className="mt-3 back-btn">
                                    <Link
                                        className="text-white h5"
                                        id="slid_close"
                                        onClick={() => this.handleFilterback()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="12"
                                            viewBox="0 0 23.875 18.609"
                                        >
                                            <g
                                                id="arrow-2"
                                                transform="translate(0.5 0.616)"
                                            >
                                                <g
                                                    id="Group_5818"
                                                    data-name="Group 5818"
                                                    transform="translate(0)"
                                                >
                                                    <path
                                                        id="Path_1678"
                                                        data-name="Path 1678"
                                                        d="M25.414,139.748h0l7.371-7.336a1.411,1.411,0,0,1,1.99,2l-4.949,4.925H46.464a1.411,1.411,0,0,1,0,2.821H29.828l4.949,4.925a1.411,1.411,0,0,1-1.99,2l-7.371-7.336h0A1.412,1.412,0,0,1,25.414,139.748Z"
                                                        transform="translate(-25 -132)"
                                                        fill="#fff"
                                                        stroke="#ffffff"
                                                        stroke-width="1"
                                                    />
                                                </g>
                                            </g>
                                        </svg>{" "}
                                        Back
                                    </Link>
                                </div>
                                <Form className=" property-search-block mt-4">
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Find a Property"
                                        aria-label=""
                                        onKeyUp={this.searchReportColumn}
                                    />
                                    <Link
                                        to="javascript:void(0)"
                                        className="property-search-link"
                                    >
                                        <img
                                            src={require("../../assets/img/property-search.svg")}
                                            className="img-fluid"
                                            alt="searchicon"
                                        />
                                    </Link>
                                    <Link
                                        className="property-menu-blk"
                                        to="javascript:void(0);"
                                    >
                                        <img
                                            src={require("../../assets/img/drp.svg")}
                                            className="img-fluid"
                                            alt="searchicon"
                                        />
                                    </Link>
                                </Form>
                            </div>
                            <div className="single-data-box px-0 mt-0">
                                {/* <div className="sidebar-twicer-pad property-tittle">
                                    <h5 className="text-white f-600 my-3">
                                        Practice Information
                                    </h5>
                                </div> */}
                                <ul className="property-list-block py-3 ">
                                    {this.state.reportColumns.length > 0 &&
                                        this.state.reportColumns.map(
                                            (col, i) => (
                                                <li>
                                                    <Link
                                                        onClick={() =>
                                                            this.selectCol(col)
                                                        }
                                                    >
                                                        {col.tittle}
                                                    </Link>
                                                </li>
                                            )
                                        )}

                                    {/* <li>
                                        <Link to="javascript:void(0);">
                                            Associated contacts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0);">
                                            City
                                        </Link>
                                    </li> */}
                                </ul>
                                {/* <div className="sidebar-twicer-pad property-tittle">
                                    <h5 className="text-white f-600 my-3">
                                        Social Media Information
                                    </h5>
                                </div>
                                <ul className="property-list-block py-3 ">
                                    <li>
                                        <Link to="javascript:void(0);">
                                            Company revenue
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0);">
                                            Associated contacts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0);">
                                            City
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0);">
                                            Company domain name
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0);">
                                            Phone number
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="javascript:void(0);">
                                            Postal code
                                        </Link>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                    )}
                </div>
                <div className="sidebar-twicer-footer">
                    <div className="sidebar-padding">
                        <div className="side-bar-footer">
                            <p>
                                <span className="">
                                    <img
                                        src={require("../../assets/img/logo_footer.svg")}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </span>
                                <span className="text-white ml-2">
                                    Powered by DrDDS
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Sidebartwicer;
