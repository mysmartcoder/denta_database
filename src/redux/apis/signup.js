import axios from "axios";
import { API_URL } from "../../config/appConstatnt";
// main api class
class Api {
    // Sign up API
    static signUpPost = (payload) => {
        let UserModel = {
            Email: payload.email,
            Phone: payload.phone,
            PracticeName: "",
            Speciality: [],
            FirstName: payload.firstname,
            LastName: payload.lastname,
            NpiNumber: "",
            Password: payload.password,
            CompanyId: 3,
        };
        return axios.post(API_URL + "/Verident/SignUp", UserModel);
    };
    // Email check API
    static getCheckEmail = (email) => {
        return axios.get(
            API_URL + "/Verident/CheckEmailExists?Email=" + email,
            ""
        );
    };
    // Account activation API
    static accountActivation = (email) => {
        return axios.get(
            API_URL + "/Verident/AccountActivation?Email=" + email,
            ""
        );
    };
}
export default Api;
