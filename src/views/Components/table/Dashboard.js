import React, { Component } from "react";
import Pagination from "./pagination";
import CommonTable from "./commonTable";
import ReportTittle from "../reportTittle";
import Api from "../../../redux/apis/dashboard";
// const tablehead = [
//     {
//         tittle: "",
//         sortColumn: 1,
//         isEnable: true,
//     },
//     {
//         tittle: "First Name",
//         sortColumn: 1,
//         isEnable: true,
//     },
//     {
//         tittle: "Last Name",
//         sortColumn: 2,
//         isEnable: true,
//     },
//     {
//         tittle: "Practice",
//         sortColumn: 3,
//         isEnable: true,
//     },
//     {
//         tittle: "Specialty",
//         sortColumn: 4,
//         isEnable: true,
//     },
//     {
//         tittle: "city",
//         sortColumn: 5,
//         isEnable: true,
//     },
//     {
//         tittle: "Phone No",
//         sortColumn: 6,
//         isEnable: true,
//     },
//     {
//         tittle: "Email Address",
//         sortColumn: 7,
//         isEnable: true,
//     },
//     {
//         tittle: "Postal Code",
//         sortColumn: 8,
//         isEnable: true,
//     },

//     // {
//     // tittle:'Company Revenue'
//     // }
// ];
const downlinks = [
    {
        id: 1,
        title: "Suggest Update",
        imgsrc: require("../../../assets/img/eye-border.svg"),
    },
    {
        id: 2,
        title: "view",
        link: "/dashboard/myprofile",
        imgsrc: require("../../../assets/img/eye-border.svg"),
    },
];

class Dashboard extends Component {
    state = {
        isOpenSidebar: true,
    };
    changeSortColumn = (col) => {
        this.props.changeSortColumn(col);
    };
    onPageIndexChange = (pageSize, pageIndex) => {
        this.props.onPageIndexChange(pageSize, pageIndex);
    };
    columnChange = (fields) => {
        debugger;
        this.props.columnChange(fields);
    };
    render() {
        return (
            <div className="main-table-block table-section dashboard-common">
                <ReportTittle
                    tittle=" Record List"
                    fields={this.props.tablehead}
                    columnChange={this.columnChange}
                />
                <CommonTable
                    tableHead={this.props.tablehead}
                    downlinks={downlinks}
                    tablevalue={this.props.tablevalue}
                    changeSortColumn={this.changeSortColumn}
                />
                <Pagination
                    onPageIndexChange={this.onPageIndexChange}
                    totalRecord={this.props.totalRecord}
                />
            </div>
        );
    }
}

export default Dashboard;
