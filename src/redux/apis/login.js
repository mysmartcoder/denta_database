import axios from "axios";
import { API_URL } from "../../config/appConstatnt";
// main api class
class Api {
    // API for get Company id
    static getCompanyId = (url) => {
        return axios.get(API_URL + "/Verident/CompanyId?strDomain=" + url);
    };
    // Log in API
    static logInPost = (payload) => {
        let UserModel = {
            Username: payload.Username,
            Password: payload.Password,
            CompanyId: localStorage.getItem("CompanyId"),
        };
        return axios.post(API_URL + "/Verident/Login", UserModel);
    };
}
export default Api;
