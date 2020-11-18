import axios from "axios";
import { API_URL } from "../../config/appConstatnt";
// main api class
class Api {
    // Forgot password API
    static forgotPassword = (email) => {
        return axios.post(
            API_URL +
                "/Verident/ForgotPassowrd?Email=" +
                email +
                "&From='Database'",
            ""
        );
    };
}
export default Api;
