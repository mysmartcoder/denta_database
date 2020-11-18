import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonImg from "./Buttons/Btnpurple/btnImg";
import { history } from "../../history";
class Sidebar extends Component {
    handleClick() {
        history.push("/customcreatereport");
    }
    render() {
        let location = this.props.router;
        let pathname = history.location.pathname;

        return (
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <ul>
                            <li className="">
                                <Link
                                    to=""
                                    className="d-flex align-items-center h4 mb-0 f-600"
                                >
                                    <div className="admin-blk-1 d-inline-flex mr-2">
                                        <img
                                            src={require("../../assets/img/logo.svg")}
                                            className="img-fluid"
                                            alt="logo"
                                        />
                                    </div>
                                    <div className="d-inline-flex admin-blk-2">
                                        Dental <br /> Database
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        <div
                            id="close-sidebar"
                            onClick={() => this.props.toggleSidebar()}
                        >
                            <img
                                src={require("../../assets/img/toggle-icons.svg")}
                                alt="menu"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                    <div className="text-center py-3 sidebar-padding show-on-hover">
                        <ButtonImg
                            styleClass="text-capitalize btn-full"
                            onClick={() => this.handleClick()}
                            value="Create report"
                            fill="#fff"
                            dimention="M20.265,9.6H11.733V1.067a1.067,1.067,0,0,0-2.133,0V9.6H1.067a1.067,1.067,0,0,0,0,2.133H9.6v8.533a1.067,1.067,0,1,0,2.133,0V11.733h8.533a1.067,1.067,0,1,0,0-2.133Zm0,0"
                        />
                    </div>
                    <div className="sidebar-menu py-4 d-flex flex-column bd-highlight mb-3">
                        <ul className="sidebar-links">
                            <li>
                                <a href="/dashboard">
                                    {/* <Link
                                    exact
                                    to="/dashboard"
                                    onClick={() =>
                                        this.setState({ path: "/dashboard" })
                                    }
                                    className={`${
                                        pathname == "/dashboard" &&
                                        !this.context.isPublicProfile
                                            ? "active"
                                            : ""
                                    }`}
                                > */}
                                    <span className="blk-1">
                                        <img
                                            src={require("../../assets/img/dashboard.svg")}
                                            className="img-fluid"
                                            alt="Dashboard"
                                        />
                                    </span>
                                    <span className="blk-2">Dashboard</span>
                                    <span className="tooltip-block">
                                        Dashboard
                                    </span>
                                </a>
                                {/* </Link> */}
                            </li>
                            <li>
                                <Link exact to="/">
                                    <span className="blk-1">
                                        <img
                                            src={require("../../assets/img/standard-reports.svg")}
                                            className="img-fluid"
                                            alt="reports"
                                        />
                                    </span>
                                    <span className="blk-2">
                                        Standard Reports
                                    </span>
                                    <span className="tooltip-block">
                                        Standard Reports
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    exact
                                    to="/dashboard/custom-report"
                                    onClick={() =>
                                        this.setState({
                                            path: "/dashboard/custom-report",
                                        })
                                    }
                                    className={`${
                                        pathname
                                            .toLowerCase()
                                            .includes("/custom-report")
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <span className="blk-1">
                                        <img
                                            src={require("../../assets/img/custom-reports.svg")}
                                            className="img-fluid"
                                            alt="custom reports"
                                        />
                                    </span>
                                    <span className="blk-2">
                                        Custom Reports
                                    </span>
                                    <span className="tooltip-block">
                                        Custom Reports
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
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
                            <span className="text-white powered ml-2">
                                Powered by DrDDS
                            </span>
                        </p>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Sidebar;
