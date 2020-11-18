import React, { Component } from "react";
import { Link } from "react-router-dom";

class Pagination extends Component {
    state = {
        pageSize: 15,
        pageSizeText: "",
        PageIndex: 1,
        userData: {},
        isNext: true,
        isPrev: false,
    };
    componentDidMount() {
        let startIndex = 0;
        let endIndex = 0;
        let endIndexNo = this.state.PageIndex * this.state.pageSize;
        startIndex = endIndexNo - this.state.pageSize + 1;
        this.props.totalRecord <= endIndexNo
            ? (endIndex = this.props.totalRecord)
            : (endIndex = endIndexNo);

        this.setState({
            pageSizeText: startIndex + "-" + endIndex,
            userData: JSON.parse(localStorage.getItem("userData")),
        });
        if (this.props.totalRecord <= 50) {
            this.setState({
                isNext: false,
            });
        }
    }
    handelPageChange = (e) => {
        this.setState({ PageIndex: 1, pageSize: parseInt(e.target.value) });
        this.props.onPageIndexChange(e.target.value, 1);
        let startIndex = 0;
        let endIndex = 1 * parseInt(e.target.value);
        startIndex = endIndex - parseInt(e.target.value) + 1;
        this.setState({ pageSizeText: startIndex + "-" + endIndex });
    };
    changePageIndexPrev = () => {
        if (this.state.PageIndex >= 1) {
            this.setState({ isPrev: false });
        }
        if (this.state.PageIndex > 1) {
            let startIndex = 0;
            let endIndex = 0;
            this.setState(
                { PageIndex: this.state.PageIndex - 1, isNext: true },
                () => {
                    endIndex = this.state.PageIndex * this.state.pageSize;
                    startIndex = endIndex - this.state.pageSize + 1;
                    this.setState({
                        pageSizeText: startIndex + "-" + endIndex,
                    });
                    this.props.onPageIndexChange(
                        this.state.pageSize,
                        this.state.PageIndex
                    );
                }
            );
        }
    };

    changePageIndexNext = () => {
        if (
            (!this.state.userData.ISSubscription && this.state.PageIndex > 1) ||
            this.props.totalRecord > this.state.PageIndex * this.state.pageSize
        ) {
            this.setState({ isNext: false });
        }

        if (
            this.props.totalRecord >
            this.state.PageIndex * this.state.pageSize
        ) {
            let startIndex = 0;
            let endIndex = 0;
            this.setState(
                { PageIndex: this.state.PageIndex + 1, isPrev: true },
                () => {
                    endIndex = this.state.PageIndex * this.state.pageSize;
                    startIndex = endIndex - this.state.pageSize + 1;
                    this.setState({
                        pageSizeText: startIndex + "-" + endIndex,
                    });
                    this.props.onPageIndexChange(
                        this.state.pageSize,
                        this.state.PageIndex
                    );
                }
            );
        }
    };
    render() {
        return (
            <div className="padding-side">
                {this.props.totalRecord > 0 && (
                    <div
                        className="d-flex justify-content-end align-items-center
                     py-3 flex-column  flex-sm-row"
                    >
                        <div className="rows-per-page">
                            <h4 className="mb-0 mr-2 text-custom-light">
                                Rows per page :
                            </h4>
                            <div className="users-row-select">
                                <div className="form-group mb-0 ">
                                    <select
                                        className="form-control"
                                        onChange={this.handelPageChange}
                                        id="exampleFormControlSelect1"
                                    >
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <ul className="pagination align-items-center">
                            <li className="page-item">
                                <Link
                                    className={
                                        this.state.isPrev
                                            ? "page-link active"
                                            : "page-link"
                                    }
                                    // to="javascript:void(0);"
                                    onClick={
                                        this.state.isPrev
                                            ? this.changePageIndexPrev
                                            : () => false
                                    }
                                    aria-label="Previous"
                                >
                                    <i
                                        className="fa fa-angle-left "
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            </li>
                            <li className="page-item">
                                <h4 className="mb-0">
                                    {this.state.pageSizeText} of{" "}
                                    {this.props.totalRecord}
                                </h4>
                            </li>
                            <li className="page-item">
                                <Link
                                    className={
                                        this.state.isNext
                                            ? "page-link active"
                                            : "page-link"
                                    }
                                    onClick={
                                        this.state.isNext
                                            ? this.changePageIndexNext
                                            : () => false
                                    }
                                    aria-label="Next"
                                >
                                    <i
                                        className="fa fa-angle-right "
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default Pagination;
