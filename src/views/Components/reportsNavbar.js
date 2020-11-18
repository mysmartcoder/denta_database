import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./Buttons/Btnpurple/btnpurple";
import Userdropdown from "../Components/userdropdown";
import AppsDropdown from "./Appsdropdown";
import Location from "./location-popup";
import NavbarSearch from "./navbarsearch-popup";
class Navbar extends Component {
    state = {
        isModalOpen: false,
        isSearchModal: false,
        searchText: this.props.searchText,
        locationText: "",
        userData: {},
    };
    onModalClick = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    };
    onsearchModalClick = () => {
        this.setState({ isSearchModal: !this.state.isSearchModal });
    };

    onChangeSearchText = (e) => {
        this.setState({ searchText: e.target.value });
        this.props.onChangeSearchText(e.target.value);
    };
    onChangeSearch = (e) => {
        this.props.onChangeSearch(e);
    };

    onChangeLocationSearch = (text) => {
        this.setState({ locationText: text });
        this.props.onChangeLocationSearch(text);
    };

    // useEffect(() => {
    //     userData = localStorage.getItem("userData");
    //     console.log(userData);
    //     console.log("sfsdfs");
    // });
    componentDidMount() {
        this.setState({
            userData: JSON.parse(localStorage.getItem("userData")),
        });
    }

    nothing = () => {
        return false;
    };

    render() {
        return (
            <nav className="navbar navbar-expand navbar-light">
                <Link
                    to=""
                    onClick={() => this.props.mbtoggleSidebar()}
                    className="sidebar-toggle"
                    id="show-sidebar"
                >
                    <span className="navbar-toggler-icon"></span>
                </Link>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <div
                                className="nav-link location cursor-pointer"
                                onClick={
                                    this.state.userData.ISSubscription
                                        ? () => this.onModalClick()
                                        : () => this.nothing()
                                }
                            >
                                <img
                                    src={require("../../assets/img/location-pin.svg")}
                                    alt="location"
                                    className="img-fluid"
                                />{" "}
                                <span className="f-600 h5 mb-0 text-white">
                                    {this.state.locationText == "" &&
                                        this.props.selectedLocation}{" "}
                                </span>
                            </div>
                        </li>
                        <li className="searchbar">
                            <form className="navbar-search-block">
                                <input
                                    className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Search Record"
                                    aria-label="Search"
                                    value={this.state.searchText}
                                    onChange={this.onChangeSearchText}
                                    onKeyPress={this.onChangeSearch}
                                />
                                <Link
                                    to="javascript:void(0)"
                                    className="navbar-search"
                                >
                                    <img
                                        src={require("../../assets/img/search.svg")}
                                        className="img-fluid"
                                        alt="searchicon"
                                    />
                                </Link>
                            </form>
                        </li>
                    </ul>
                    <ul className="navbar-nav align-items-center second-inner-nav">
                        <li className="search-mobile">
                            <span
                                onClick={() => this.onsearchModalClick()}
                                id="search-menu"
                            >
                                <img
                                    src={require("../../assets/img/search.svg")}
                                    className="img-fluid"
                                    alt="searchicon"
                                />
                            </span>
                        </li>
                        {!this.state.userData.ISSubscription && (
                            <li className="acc-validity desktop">
                                {parseInt(this.props.totalRecord) > 100 && (
                                    <h4 className="mb-0 text-white f-700">
                                        {parseInt(this.props.totalRecord) - 100}{" "}
                                        Contacts left
                                    </h4>
                                )}

                                <p className="text-white f-600 mb-0 small-12">
                                    Free Account
                                </p>
                            </li>
                        )}
                        {!this.state.userData.ISSubscription && (
                            <li className="upgradeplan desktop">
                                <Button value="upgrade" />
                            </li>
                        )}
                        <li className="">
                            <AppsDropdown />
                        </li>
                        <li>
                            <Userdropdown />
                        </li>
                    </ul>
                </div>
                <Location
                    isModalOpen={this.state.isModalOpen}
                    onModalClick={() => this.onModalClick()}
                    onChangeLocationSearch={this.onChangeLocationSearch}
                />
                <NavbarSearch
                    isModalOpen={this.state.isSearchModal}
                    onModalClick={() => this.onsearchModalClick()}
                />
            </nav>
        );
    }
}

export default Navbar;
