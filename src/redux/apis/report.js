import axios from "axios";
import { API_URL, HEADER } from "../../config/appConstatnt";
// main api class
class Api {
    // Report create or update API
    static createUpdateReport = (payload) => {
        return axios.post(API_URL + "/database/Report", payload, HEADER);
    };
    static getReports = (payload) => {
        return axios.post(API_URL + "/database/Reports", payload, HEADER);
    };
    static getReportById = (id) => {
        return axios.get(API_URL + "/database/Report?ReportId=" + id, HEADER);
    };
    static deleteReportById = (id) => {
        return axios.get(
            API_URL + "/database/DeleteReport?ReportId=" + id,
            HEADER
        );
    };
    static createExcelById = (id) => {
        return axios.get(
            API_URL + "/database/CreateExcel?ReportId=" + id,
            HEADER
        );
    };
}
export default Api;
