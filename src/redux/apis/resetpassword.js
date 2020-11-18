import axios from "axios";
import { API_URL } from "../../config/appConstatnt";
// main api class
class Api {
    // Reset password API
    static resetPassword = (payload) => {
        let model = {
            Email: payload.email,
            Password: payload.password,
        };
        return axios.post(API_URL + "/Verident/ResetPassword", model);
    };
}
export default Api;
