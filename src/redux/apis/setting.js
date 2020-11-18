import axios from "axios";
import { API_URL, HEADER, HEADERMultipart } from "../../config/appConstatnt";
// Main api class
class Api {
    static getUserDetails = (id = 0) => {
        return axios.get(
            API_URL + "/database/UserDetails?UserId=" + id,
            HEADER
        );
    };

    static postUserDetails = (data) => {
        return axios.post(
            API_URL + "/database/UpdateUserDetails",
            data,
            HEADER
        );
    };

    static postChangePassword = (data) => {
        let obj = {
            CurrentPassword: data.CurrentPassword,
            NewPassword: data.NewPassword,
        };
        return axios.post(API_URL + "/UserProfile/ChangePassword", obj, HEADER);
    };
}

export default Api;
