import React from "react";
import { Link } from "react-router-dom";

const loginFooter = ({ styleClass, value, onClick }) => {
    return (
        <div className="common-footer">
            <div className="footer-links">
                <div className="text-center">
                    <p>
                        <span className="mr-2">
                            <img
                                src={require("../../../assets/img/logo_footer.svg")}
                                alt="logo"
                                className="img-fluid"
                            />
                        </span>
                        <span className="text-custom-light mr-2">
                            Powered by DrDDS
                        </span>
                        <span className=" f-600">
                            <Link
                                to="https://drdds.com/"
                                target="_blank"
                                className="text-custom-light-blue"
                            >
                                Learn More
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default loginFooter;
