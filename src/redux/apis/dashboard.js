import axios from "axios";
import { API_URL } from "../../config/appConstatnt";
// main api class
export const HEADER = {
    headers: {
        access_token: localStorage.getItem("token"),
        "Content-Type": "application/json",
        CompanyId: localStorage.getItem("CompanyId"),
    },
};
class Api {
    // Get Location API
    static getLocation = (searchText) => {
        return axios.get(
            API_URL + "/database/GetLocation?Location=" + searchText,
            HEADER
        );
    };
    // API for get database listing
    static getDashboardList = (data) => {
        let model = {
            SearchLocation: data.SearchLocation,
            SortColumn: data.SortColumn,
            SortDirection: data.SortDirection,
            PageIndex: data.PageIndex,
            PageSize: data.PageSize,
            SearchText: data.SearchText,
            SearchText: data.SearchText,
            ReportId: data.ReportId,
        };
        return axios.post(
            API_URL + "/database/GetDashboardListing",
            model,
            HEADER
        );
    };
}
export default Api;
