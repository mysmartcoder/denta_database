import React from "react";
import { Link } from "react-router-dom";

const Thead = (props) => {
    const tableheads = props.tableheads;

    const handelSort = (col) => {
        if (props.changeSortColumn != null) {
            props.changeSortColumn(col);
        }
    };
    const listItems = tableheads.map((tablehead) => (
        <>
            {tablehead.isEnable && (
                <th onClick={() => handelSort(tablehead.sortColumn)}>
                    {tablehead.tittle}
                    <span className="d-inline-block align-middle tittle-sort">
                        <Link>
                            <span className="d-flex my-1">
                                <img
                                    src={require("../../../assets/img/polygon5.png")}
                                    className="img-fluid"
                                    alt="uparrow"
                                />
                            </span>
                        </Link>
                        <Link>
                            <span className="d-flex my-1">
                                <img
                                    src={require("../../../assets/img/polygon6.png")}
                                    className="img-fluid"
                                    alt="downarrow"
                                />
                            </span>
                        </Link>
                    </span>
                </th>
            )}
        </>
    ));
    return <tr>{listItems}</tr>;
};
export default Thead;
