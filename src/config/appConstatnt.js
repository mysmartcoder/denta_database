// Local
export const API_URL = "http://localhost:56697/api";
export const RecordLincURL = "http://localhost:2298/";
export const OCRURL = "http://localhost:2298/";
export const VeridentURL = "https://verident.drdds.com";
export const ExcelPath = "http://localhost:2298/RecordExcelFiles/";

// // QA server
// export const API_URL = "https://qa.recordlinc.com/rlapi/api";
// export const RecordLincURL = "https://qa.recordlinc.com/";
// export const OCRURL = "http://referqa.oneclickreferral.com/";
// export const VeridentURL = "http://verident.recordlinc.com/";
// export const ExcelPath = "https://qa.recordlinc.com/RecordExcelFiles/";

export const HEADER = {
    headers: {
        access_token: localStorage.getItem("token"),
        "Content-Type": "application/json",
        CompanyId: localStorage.getItem("CompanyId"),
    },
};
export const HEADERMultipart = {
    headers: {
        access_token: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
        CompanyId: localStorage.getItem("CompanyId"),
    },
};
