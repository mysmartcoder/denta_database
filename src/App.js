import React, { useEffect } from "react";
import Loging from "./views/Login/login";
import Signuping from "./views/Signup/signup";
import Adminpanel from "./views/Adminpanel/adminpanel";
import { Router, Switch, Route } from "react-router-dom";
import SignupNotified from "./views/signupnotified";
import HoldMoment from "./views/holdmomnet";
import CustomCreatereport from "./views/customcreatereport";
import CustomCreatereportfilter from "./views/createcustomreportfilter";
import Accountsetup from "./views/accountsetup";
import ForgotPassword from "./views/forgotpassword";
import ResetPassword from "./views/resetpassword";
import { history } from "./history";
import Api from "./redux/apis/login";
import { reportColumn } from "./config/column";
function App() {
    //Get domain name
    let domain = window.location.hostname;
    // set company Id in local storage
    useEffect(() => {
        if (
            localStorage.getItem("reportColumn") == undefined ||
            localStorage.getItem("reportColumn") == null
        ) {
            debugger;
            localStorage.setItem("reportColumn", JSON.stringify(reportColumn));
        }

        if (
            localStorage.getItem("CompanyId") == undefined ||
            localStorage.getItem("CompanyId") == null
        ) {
            // call get company id API
            Api.getCompanyId(domain)
                .then((res) => {
                    localStorage.setItem("CompanyId", res.data.Result);
                })
                .catch((error) => {});
        }
    }, []);
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Loging} />
                <Route path="/login">
                    <Loging />
                </Route>
                <Route path="/signup">
                    <Signuping />
                </Route>
                <Route path="/hold-moment">
                    <HoldMoment />
                </Route>
                <Route path="/dashboard" component={Adminpanel} />
                {/* <Adminpanel />
+          </Route> */}
                {/* <Route path="/dashboard">
                    <Adminpanel />
                </Route> */}
                <Route path="/customcreatereport">
                    <CustomCreatereport />
                </Route>
                <Route path="/CustomCreatereportfilter">
                    <CustomCreatereportfilter />
                </Route>
                <Route path="/activation">
                    <Accountsetup />
                </Route>
                <Route path="/forgotpassword">
                    <ForgotPassword />
                </Route>
                <Route path="/signup-notified">
                    <SignupNotified />
                </Route>
                <Route path="/resetpassword">
                    <ResetPassword />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
