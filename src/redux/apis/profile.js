import axios from "axios";
import { API_URL, HEADER, HEADERMultipart } from "../../config/appConstatnt";
// Main api class
class Api {
    // Get user details API
    static userData = (userId) => {
        return axios.get(API_URL + "/Profile/Get?UserId=" + userId, HEADER);
    };

    static postUserData = (data) => {
        return axios.post(API_URL + "/Profile/EditPersonalInfo", data, HEADER);
    };

    static specialties = (spe) => {
        return axios.get(
            API_URL + "/Common/GetSpecialty?Specialty=" + spe,
            HEADER
        );
    };

    static getAddress = (id) => {
        return axios.get(API_URL + "/Profile/GetAddress?id=" + id, HEADER);
    };

    static postAddress = (model) => {
        let address = {
            AddressInfoID: model.AddressInfoID,
            ExactAddress: model.ExactAddress,
            Address2: model.Address2,
            City: model.City,
            State: model.State,
            Country: model.Country,
            ZipCode: model.ZipCode,
            EmailAddress: model.EmailAddress,
            Phone: model.Phone,
            Fax: model.Fax,
            ContactType: model.ContactType,
            Location: model.Location,
            TimeZoneId: model.TimeZoneId,
            Mobile: model.Mobile,
            Website: model.Website,
            ExternalPMSId: model.ExternalPMSId,
            InternalId: model.InternalId,
            SchedulingLink: model.SchedulingLink,
            IsSyncS1p: model.IsSyncS1p,
        };
        return axios.post(API_URL + "/Profile/AddAddress", address, HEADER);
    };

    static updateDesciption = (data) => {
        let model = {
            Text: data,
        };
        return axios.post(API_URL + "/Profile/AddDescription", model, HEADER);
    };

    static getSocialMedia = () => {
        return axios.get(API_URL + "/Profile/GetSocialMedia", HEADER);
    };

    static postSocialMedia = (model) => {
        let obj = {
            FacebookUrl: model.FacebookUrl,
            LinkedinUrl: model.LinkedinUrl,
            TwitterUrl: model.TwitterUrl,
            GoogleplusUrl: model.GoogleplusUrl,
            YoutubeUrl: model.YoutubeUrl,
            PinterestUrl: model.PinterestUrl,
            BlogUrl: model.BlogUrl,
            InstagramUrl: model.InstagramUrl,
            YelpUrl: model.FacebookUrl,
        };
        return axios.post(API_URL + "/Profile/AddSocialMedia", obj, HEADER);
    };

    static getWebSiteDetail = (id) => {
        return axios.get(
            API_URL + "/Profile/GetWebSiteDetail?Id=" + id,
            HEADER
        );
    };

    static postWebSiteDetail = (data) => {
        let model = {
            SecondaryWebsiteId: data.SecondaryWebsiteId,
            SecondaryWebsiteurl: data.SecondaryWebsiteurl,
        };
        return axios.post(API_URL + "/Profile/AddWebSite", model, HEADER);
    };

    static deleteEducation = (id) => {
        return axios.post(
            API_URL + "/Profile/RemoveWebsite?id=" + id,
            null,
            HEADER
        );
    };

    static getSearchUniversityNames = (search) => {
        return axios.get(
            API_URL +
                "/Profile/SearchUniversityNames?UniversityNames=" +
                search,
            HEADER
        );
    };

    static getEducation = (id) => {
        return axios.get(
            API_URL + "/Profile/GetEducationDetails?id=" + id,
            HEADER
        );
    };

    static postEducation = (model) => {
        let obj = {
            Id: model.Id,
            Institute: model.Institute,
            Specialisation: model.Specialisation,
            YearAttended: model.YearAttended,
        };
        return axios.post(
            API_URL + "/Profile/AddEducationAndTraining",
            obj,
            HEADER
        );
    };

    static deleteEducation = (id) => {
        return axios.post(
            API_URL + "Profile/RemoveEduction?id=" + id,
            null,
            HEADER
        );
    };

    static getInsurance = () => {
        return axios.get(API_URL + "/database/GetInsurance", HEADER);
    };

    static postInsurance = (data) => {
        return axios.post(API_URL + "/database/MemberInsurance", data, HEADER);
    };

    static postImageGallery = (data) => {
        return axios.post(
            API_URL + "/database/UploadGalleryImage",
            data,
            HEADERMultipart
        );
    };

    static postProfileImage = (data) => {
        return axios.post(
            API_URL + "/UserProfile/UploadProfileImage",
            data,
            HEADERMultipart
        );
    };

    static postMembership = (data) => {
        return axios.post(
            API_URL + "/database/ManageProfessionalMembership",
            data,
            HEADER
        );
    };

    static postMembership = (data) => {
        return axios.post(
            API_URL + "/database/ManageProfessionalMembership",
            data,
            HEADER
        );
    };
    static getProcedure = () => {
        return axios.get(API_URL + "/database/GetProcedures", HEADER);
    };
    static postProcedure = (data) => {
        return axios.post(API_URL + "/database/InsertProcedures", data, HEADER);
    };

    static removeProfileImage = () => {
        return axios.post(
            API_URL + "/Profile/RemoveDoctorProfileImage",
            null,
            HEADER
        );
    };
}
export default Api;
