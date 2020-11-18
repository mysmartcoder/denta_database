import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { withRouter } from "react-router";
import ProfileTitle from "../Components/myprofiletitle";
import InformationRow from "../Components/informationrow";
import Sociallink from "../Components/sociallink";
import List from "../Components/profile-list";
import Editpersonalinformation from "../Components/myprofilepopup/editpersonalinformations";
import EditWebsite from "../Components/myprofilepopup/editwebsitelink";
import Editlocation from "../Components/myprofilepopup/editlocation";
import EditEducation from "../Components/myprofilepopup/editeducation";
import Editdescription from "../Components/myprofilepopup/editdescription";
import EditProfessionalMembership from "../Components/myprofilepopup/professionalmembership";
import Editsociallink from "../Components/myprofilepopup/editsocaillink";
import Editinsurence from "../Components/myprofilepopup/editinsurance";
import EditGallery from "../Components/myprofilepopup/editgallery";
import EditProfile from "../Components/myprofilepopup/editProfile";
import EditProcedureList from "../Components/myprofilepopup/procedurelist";
import Api from "../../redux/apis/profile";
import "../../assets/css/profile.css";
import Loader from "react-loader";
import qs from "query-string";
import { RecordLincURL } from "../../config/appConstatnt";
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
import renderHTML from "react-render-html";
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #17468f;
`;

class Myprofile extends Component {
    state = {
        isSaveShow: false,
        isModalOpen: false,
        iserror: false,
        iswebsite: false,
        isRemove: false,
        islocation: false,
        iseducation: false,
        issocial: false,
        isloader: false,
        isDescription: false,
        isMembership: false,
        isinsurence: false,
        isColleagues: false,
        isgallery: false,
        isProfile: false,
        isprocedureList: false,
        addressId: 0,
        educationId: 0,
        secondaryWebsiteId: 0,
        websiteNo: 0,
        userData: JSON.parse(localStorage.getItem("userData")),
        userInfo: {
            UserId: 0,
            FirstName: "",
            MiddleName: "",
            LastName: "",
            Description: "",
            OfficeName: "",
            Title: "",
            ImageName: "",
            Email: "",
            Phone: "",
            City: "",
            State: "",
            ZipCode: "",
            DentrixProviderId: "",
            PublicProfile: "",
            WebsiteURL: "",
            TeamMemberUserId: 0,
            Location: "",
            IsTDO: false,
            ProfileComplete: 0,
            Profilepercentage: "",
            RemainList: "",
            Institute: "",
            MemberShip: "",
            EncryptUserId: "",
            LocationId: 0,
            Salutation: "",
            specialtyIds: "",
            GallaryPath: "",
            lstBanner: [],
            lstGallary: [],
            lstInsurance: [],
            lstDoctorAddressDetails: [],
            lstDoctorSortedAddressDetails: [],
            lstEducationandTraining: [],
            lstProfessionalMemberships: [],
            lstSpeacilitiesOfDoctor: [],
            lstProcedure: [],
            licensedetails: [],
            objLicense: {},
            ObjProfileSection: {},
            lstDoctorAddressDetailsByAddressInfoID: [],
            lstGetSocialMediaDetailByUserId: [],
            lstEducationandTrainingForDoctorById: [],
            lstProfessionalMembershipForDoctorById: [],
            lstsecondarywebsitelist: [],
            lstTimeZone: [],
            lstTeamMemberDetailsForDoctor: [],
            IsRewardPatner: false,
        },
    };
    handleerror = () => {
        this.setState({
            iserror: !this.state.iserror,
        });
    };
    componentWillMount() {
        const qsObj = qs.parse(window.location.search);
        if (qsObj != null && (qsObj.id != undefined) & (qsObj.id > 0)) {
            let userdata = this.state.userData;
            userdata.UserId = qsObj.id;
            this.setState({ userData: userdata, isColleagues: true });
        }
        Api.userData(this.state.userData.UserId)
            .then((res) => {
                if (res.data.ImageName.length == 0) {
                    this.setState({ isRemove: false });
                }
                this.setState({ userInfo: res.data, isloader: true });
            })
            .catch((error) => {});
    }

    onModalClick = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    };
    onWebsitelink = (id, no) => {
        this.setState({
            iswebsite: !this.state.iswebsite,
            secondaryWebsiteId: id,
            websiteNo: no,
        });
    };
    onProcedureList = () => {
        this.setState({ isprocedureList: !this.state.isprocedureList });
    };
    onLocation = (id) => {
        this.setState({ islocation: !this.state.islocation, addressId: id });
    };
    oneducationLink = (id) => {
        this.setState({
            iseducation: !this.state.iseducation,
            educationId: id,
        });
    };
    onsocialLink = () => {
        this.setState({ issocial: !this.state.issocial });
    };
    reloadPage = () => {
        window.location.reload();
    };

    onDescriptionlink = () => {
        this.setState({ isDescription: !this.state.isDescription });
    };
    onMembershiplink = () => {
        this.setState({ isMembership: !this.state.isMembership });
    };
    onInsurencelink = () => {
        this.setState({ isinsurence: !this.state.isinsurence });
    };
    onGallerylink = () => {
        this.setState({ isgallery: !this.state.isgallery });
    };
    onProfileImageLink = () => {
        this.setState({ isProfile: !this.state.isProfile });
    };

    render() {
        const { userInfo } = this.state;
        return (
            <>
                {!this.state.isloader ? (
                    <div className="full-loader">
                        <div className="loader-spinner">
                            <div className="sweet-loading">
                                <FadeLoader
                                    css={override}
                                    size={150}
                                    color={"#123abc"}
                                    loading={!this.state.loading}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <div className="py-3">
                            <h2 className="text-custom-light-blue mb-0 f-700">
                                Profile Details
                            </h2>
                        </div>
                        <div className="personal-info">
                            <div className="common-box-profile common-box-sahdow">
                                <div className="d-flex">
                                    <ProfileTitle title="Personal Information" />
                                    {!this.state.isColleagues && (
                                        <div className="edit-click ml-auto">
                                            <ul className="profile-link-list">
                                                <li className="link">
                                                    <div
                                                        className="round-links"
                                                        onClick={() =>
                                                            this.onModalClick()
                                                        }
                                                    >
                                                        <img
                                                            src={require("../../assets/img/edit-2.svg")}
                                                            className="img-fluid round-links-image"
                                                            alt="edit"
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="profile-information">
                                    <div className="position-relative d-flex align-items-center">
                                        <div className="profile-image d-inline-flex">
                                            <div>
                                                <img
                                                    src={userInfo.ImageName}
                                                    className="img-fluid profile-use-image"
                                                />
                                                <div
                                                    className="profile-camera"
                                                    onClick={
                                                        this.onProfileImageLink
                                                    }
                                                >
                                                    <img
                                                        src={require("../../assets/img/camera.svg")}
                                                        className="img-fluid profile-camera-img"
                                                        alt="camera-img"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-data d-inline-flex flex-column">
                                            <div className="profile-user-name">
                                                <h5 className="mb-0 f-700">
                                                    {userInfo.FirstName +
                                                        " " +
                                                        userInfo.LastName}
                                                </h5>
                                            </div>
                                            <div className="profile-work-profession">
                                                <p className="text-purple">
                                                    {userInfo.lstSpeacilitiesOfDoctor &&
                                                        userInfo
                                                            .lstSpeacilitiesOfDoctor
                                                            .length > 0 &&
                                                        userInfo.lstSpeacilitiesOfDoctor.map(
                                                            (
                                                                Speacilty,
                                                                i,
                                                                arr
                                                            ) => (
                                                                <span>
                                                                    {
                                                                        Speacilty.SpecialtyDescription
                                                                    }
                                                                    {i !=
                                                                    arr.length -
                                                                        1
                                                                        ? ", "
                                                                        : ""}
                                                                </span>
                                                            )
                                                        )}
                                                </p>
                                            </div>
                                            <div className="profile-contact-details">
                                                <ul className="profile-contact-list">
                                                    {userInfo.Email !=
                                                        undefined &&
                                                        userInfo.Email.length >
                                                            0 && (
                                                            <li className="profile-contact-element">
                                                                <Link>
                                                                    <span className="img-svg mr-2">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="18"
                                                                            height="14"
                                                                            viewBox="0 0 18 14"
                                                                        >
                                                                            <g>
                                                                                <g>
                                                                                    <path
                                                                                        fill="#6fb938"
                                                                                        d="M.37 1.58c2.436 2.063 6.71 5.692 7.967 6.824.168.152.35.23.537.23a.795.795 0 0 0 .536-.229c1.257-1.133 5.532-4.762 7.967-6.825a.37.37 0 0 0 .052-.51A1.468 1.468 0 0 0 16.27.5H1.479c-.453 0-.877.208-1.16.57a.37.37 0 0 0 .051.51z"
                                                                                    />
                                                                                </g>
                                                                                <g>
                                                                                    <path
                                                                                        fill="#6fb938"
                                                                                        d="M17.533 2.698a.368.368 0 0 0-.394.053c-2.701 2.29-6.149 5.226-7.234 6.203-.608.55-1.453.55-2.063 0C6.685 7.91 2.814 4.62.609 2.75A.37.37 0 0 0 0 3.033v9.299a1.48 1.48 0 0 0 1.479 1.479h14.79a1.48 1.48 0 0 0 1.479-1.48V3.034a.37.37 0 0 0-.215-.335z"
                                                                                    />
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                    <span>
                                                                        {userInfo.Email !=
                                                                            undefined && (
                                                                            <a
                                                                                href={
                                                                                    "mailto:" +
                                                                                    userInfo.Email
                                                                                }
                                                                            >
                                                                                {
                                                                                    userInfo.Email
                                                                                }
                                                                            </a>
                                                                        )}
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        )}
                                                    {userInfo.Phone !=
                                                        undefined &&
                                                        userInfo.Phone.length >
                                                            0 && (
                                                            <li className="profile-contact-element ">
                                                                <Link>
                                                                    <span className="img-svg mr-2">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="17"
                                                                            viewBox="0 0 16 17"
                                                                        >
                                                                            <g>
                                                                                <g>
                                                                                    <path
                                                                                        fill="#6fb938"
                                                                                        d="M15.61 12.29l-2.241-2.242c-.801-.8-2.162-.48-2.482.56-.24.721-1.041 1.121-1.762.961-1.601-.4-3.763-2.482-4.163-4.163-.24-.72.24-1.522.96-1.762 1.041-.32 1.362-1.681.56-2.482L4.242.92C3.601.36 2.64.36 2.079.92L.558 2.442C-.963 4.043.718 8.287 4.48 12.05c3.763 3.763 8.007 5.524 9.608 3.923l1.522-1.521c.56-.64.56-1.602 0-2.162z"
                                                                                    />
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                    <span>
                                                                        {userInfo.Phone !=
                                                                            undefined && (
                                                                            <a
                                                                                href={
                                                                                    "tel:" +
                                                                                    userInfo.Phone
                                                                                }
                                                                            >
                                                                                {
                                                                                    userInfo.Phone
                                                                                }
                                                                            </a>
                                                                        )}
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="location-info my-3">
                            <div className="common-box-profile common-box-sahdow">
                                <div className="d-flex">
                                    <ProfileTitle title="Location Details" />
                                    {!this.state.isColleagues && (
                                        <div className="edit-click ml-auto">
                                            <ul className="profile-link-list">
                                                <li className="link">
                                                    <div
                                                        className="round-links"
                                                        onClick={() =>
                                                            this.onLocation(0)
                                                        }
                                                    >
                                                        <img
                                                            src={require("../../assets/img/more-2.svg")}
                                                            className="img-fluid round-links-image"
                                                            alt="more"
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="location-details">
                                    {userInfo.lstDoctorAddressDetails &&
                                        userInfo.lstDoctorAddressDetails
                                            .length > 0 &&
                                        userInfo.lstDoctorAddressDetails.map(
                                            (address) => (
                                                <div className="edit-click ml-auto location">
                                                    {!this.state
                                                        .isColleagues && (
                                                        <ul className="profile-link-list location">
                                                            <li className="link">
                                                                <div
                                                                    className="round-links"
                                                                    onClick={() =>
                                                                        this.onLocation(
                                                                            address.AddressInfoID
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src={require("../../assets/img/edit-2.svg")}
                                                                        className="img-fluid round-links-image"
                                                                        alt="edit"
                                                                    />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    )}
                                                    <ul className="table-column-data">
                                                        <InformationRow
                                                            title="Location"
                                                            data={
                                                                address.Location
                                                            }
                                                        />
                                                        <InformationRow
                                                            title="Contact Number"
                                                            data={address.Phone}
                                                        />
                                                        <InformationRow
                                                            title="Street Address"
                                                            data={
                                                                address.ExactAddress
                                                            }
                                                        />
                                                        <InformationRow
                                                            title="City"
                                                            data={address.City}
                                                        />
                                                        <InformationRow
                                                            title="State"
                                                            data={address.State}
                                                        />
                                                        <InformationRow
                                                            title="Zip"
                                                            data={
                                                                address.ZipCode
                                                            }
                                                        />
                                                        <InformationRow
                                                            title="NPI Number "
                                                            data={
                                                                address.NpiNumber
                                                            }
                                                        />
                                                    </ul>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        </div>
                        {((userInfo.lstsecondarywebsitelist &&
                            userInfo.lstsecondarywebsitelist.length > 0) ||
                            !this.state.isColleagues) && (
                            <div className="website-info my-3">
                                <div className="common-box-profile common-box-sahdow">
                                    <div className="d-flex">
                                        <ProfileTitle title="Website" />
                                        {!this.state.isColleagues && (
                                            <div className="edit-click ml-auto">
                                                <ul className="profile-link-list">
                                                    <li className="link">
                                                        <div
                                                            className="round-links"
                                                            onClick={() =>
                                                                this.onWebsitelink(
                                                                    0,
                                                                    0
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={require("../../assets/img/more-2.svg")}
                                                                className="img-fluid round-links-image"
                                                                alt="more"
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="location-details">
                                        <ul className="table-column-data">
                                            {userInfo.lstsecondarywebsitelist &&
                                                userInfo.lstsecondarywebsitelist
                                                    .length > 0 &&
                                                userInfo.lstsecondarywebsitelist.map(
                                                    (website, index) => (
                                                        <li className="column-data-element">
                                                            <p className="website_para">
                                                                <span className="column-1">
                                                                    Website Link{" "}
                                                                    {index + 1}{" "}
                                                                    :
                                                                </span>
                                                                <span className="column-2">
                                                                    <a
                                                                        href={
                                                                            website.SecondaryWebsiteurl
                                                                        }
                                                                        target="_blank"
                                                                        className="website-link"
                                                                    >
                                                                        {
                                                                            website.SecondaryWebsiteurl
                                                                        }
                                                                    </a>
                                                                </span>
                                                            </p>
                                                            <div className="edit-click ml-auto location">
                                                                <ul className="profile-link-list">
                                                                    {!this.state
                                                                        .isColleagues && (
                                                                        <li className="link">
                                                                            <div
                                                                                className="round-links"
                                                                                onClick={() =>
                                                                                    this.onWebsitelink(
                                                                                        website.SecondaryWebsiteId,
                                                                                        index +
                                                                                            1
                                                                                    )
                                                                                }
                                                                            >
                                                                                <img
                                                                                    src={require("../../assets/img/edit-2.svg")}
                                                                                    className="img-fluid round-links-image"
                                                                                    alt="edit"
                                                                                />
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="social-info my-3">
                            <div className="common-box-profile common-box-sahdow">
                                <div className="d-flex">
                                    <ProfileTitle title="Social Media" />
                                    {!this.state.isColleagues && (
                                        <div className="edit-click ml-auto">
                                            <ul className="profile-link-list">
                                                <li className="link">
                                                    <div
                                                        className="round-links"
                                                        onClick={() =>
                                                            this.onsocialLink()
                                                        }
                                                    >
                                                        <img
                                                            src={require("../../assets/img/edit-2.svg")}
                                                            className="img-fluid round-links-image"
                                                            alt="edit"
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="social-links-block">
                                    <ul className="social-link-list">
                                        {userInfo.lstGetSocialMediaDetailByUserId &&
                                            userInfo
                                                .lstGetSocialMediaDetailByUserId[0]
                                                .FacebookUrl && (
                                                <Sociallink
                                                    img="facebook.svg"
                                                    alt="facebook"
                                                />
                                            )}

                                        {userInfo.lstGetSocialMediaDetailByUserId &&
                                            userInfo
                                                .lstGetSocialMediaDetailByUserId[0]
                                                .TwitterUrl && (
                                                <Sociallink
                                                    img="twit.svg"
                                                    alt="twiter"
                                                />
                                            )}

                                        {userInfo.lstGetSocialMediaDetailByUserId &&
                                            userInfo
                                                .lstGetSocialMediaDetailByUserId[0]
                                                .InstagramUrl && (
                                                <Sociallink
                                                    img="insta.svg"
                                                    alt="instagram"
                                                />
                                            )}

                                        {userInfo.lstGetSocialMediaDetailByUserId &&
                                            userInfo
                                                .lstGetSocialMediaDetailByUserId[0]
                                                .LinkedinUrl && (
                                                <Sociallink
                                                    img="linkdn.svg"
                                                    alt="linkdln"
                                                />
                                            )}

                                        {userInfo.lstGetSocialMediaDetailByUserId &&
                                            userInfo
                                                .lstGetSocialMediaDetailByUserId[0]
                                                .YoutubeUrl && (
                                                <Sociallink
                                                    img="youtube.svg"
                                                    alt="youtube"
                                                />
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {(userInfo.Description != null ||
                            !this.state.isColleagues) && (
                            <div className="description-info my-3">
                                <div className="common-box-profile common-box-sahdow">
                                    <div className="d-flex">
                                        <ProfileTitle title="Description" />
                                        {!this.state.isColleagues && (
                                            <div className="edit-click ml-auto">
                                                <ul className="profile-link-list">
                                                    <li className="link">
                                                        <div
                                                            className="round-links"
                                                            onClick={() =>
                                                                this.onDescriptionlink()
                                                            }
                                                        >
                                                            <img
                                                                src={require("../../assets/img/edit-2.svg")}
                                                                className="img-fluid round-links-image"
                                                                alt="edit"
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="dscription">
                                        <p className="text-custom-light">
                                            {renderHTML(userInfo.Description)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {((userInfo.lstEducationandTraining &&
                            userInfo.lstEducationandTraining.length > 0) ||
                            !this.state.isColleagues) && (
                            <div className="education-info my-3">
                                <div className="common-box-profile common-box-sahdow">
                                    <div className="d-flex">
                                        <ProfileTitle title="Education Details" />
                                        {!this.state.isColleagues && (
                                            <div className="edit-click ml-auto">
                                                <ul className="profile-link-list">
                                                    <li className="link">
                                                        <div
                                                            className="round-links"
                                                            onClick={() =>
                                                                this.oneducationLink(
                                                                    0
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={require("../../assets/img/more-2.svg")}
                                                                className="img-fluid round-links-image"
                                                                alt="more"
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="education-details">
                                        <Table borderless responsive>
                                            <thead>
                                                <tr>
                                                    <th>Intuition Attended</th>
                                                    <th>
                                                        Field of study/Degree
                                                    </th>
                                                    <th>
                                                        Last Year Attended /
                                                        Graduated
                                                    </th>
                                                    {!this.state
                                                        .isColleagues && (
                                                        <th>Actions</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userInfo
                                                    .lstEducationandTraining
                                                    .length > 0 &&
                                                    userInfo.lstEducationandTraining.map(
                                                        (edu, index) => (
                                                            <tr>
                                                                <td>
                                                                    {
                                                                        edu.Institute
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        edu.Specialisation
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        edu.YearAttended
                                                                    }
                                                                </td>
                                                                {!this.state
                                                                    .isColleagues && (
                                                                    <td>
                                                                        <span
                                                                            className="link"
                                                                            onClick={() =>
                                                                                this.oneducationLink(
                                                                                    edu.Id
                                                                                )
                                                                            }
                                                                        >
                                                                            EDIT
                                                                        </span>
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        )
                                                    )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        )}
                        {((userInfo.lstProfessionalMemberships &&
                            userInfo.lstProfessionalMemberships.length > 0) ||
                            !this.state.isColleagues) && (
                            <div className="professional-info my-3">
                                <div className="common-box-profile common-box-sahdow">
                                    <div className="d-flex">
                                        <ProfileTitle title="Professional Membership" />
                                        {!this.state.isColleagues && (
                                            <div className="edit-click ml-auto">
                                                <ul className="profile-link-list">
                                                    <li className="link">
                                                        <div
                                                            className="round-links"
                                                            onClick={() =>
                                                                this.onMembershiplink()
                                                            }
                                                        >
                                                            <img
                                                                src={require("../../assets/img/more-2.svg")}
                                                                className="img-fluid round-links-image"
                                                                alt="more"
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="membership-details">
                                        <ul className="membership-list">
                                            {userInfo.lstProfessionalMemberships
                                                .length > 0 &&
                                                userInfo.lstProfessionalMemberships.map(
                                                    (meb, index) => (
                                                        <List
                                                            styleClass="membership-list-element"
                                                            title={
                                                                meb.Membership
                                                            }
                                                        />
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {((userInfo.lstInsurance &&
                            userInfo.lstInsurance.length > 0) ||
                            !this.state.isColleagues) && (
                            <div className="insurance-info my-3">
                                <div className="common-box-profile common-box-sahdow">
                                    <div className="d-flex">
                                        <ProfileTitle title="Insurance Details" />
                                        {!this.state.isColleagues && (
                                            <div className="edit-click ml-auto">
                                                <ul className="profile-link-list">
                                                    <li className="link">
                                                        <div
                                                            className="round-links"
                                                            onClick={() =>
                                                                this.onInsurencelink()
                                                            }
                                                        >
                                                            <img
                                                                src={require("../../assets/img/more-2.svg")}
                                                                className="img-fluid round-links-image"
                                                                alt="more"
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="insurence-details">
                                        <ul className="insurance-list">
                                            {userInfo.lstInsurance.length > 0 &&
                                                userInfo.lstInsurance.map(
                                                    (Insurance, index) => (
                                                        <List
                                                            styleClass="insurance-list-element"
                                                            title={
                                                                Insurance.Name
                                                            }
                                                        />
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {((userInfo.lstProcedure &&
                            userInfo.lstProcedure.length > 0) ||
                            !this.state.isColleagues) && (
                            <div className="procedure-info my-3">
                                <div className="common-box-profile common-box-sahdow">
                                    <div className="d-flex">
                                        <ProfileTitle title="Procedure List" />
                                        {!this.state.isColleagues && (
                                            <div className="edit-click ml-auto">
                                                <ul className="profile-link-list">
                                                    <li className="link">
                                                        <div
                                                            className="round-links"
                                                            onClick={() =>
                                                                this.onProcedureList()
                                                            }
                                                        >
                                                            <img
                                                                src={require("../../assets/img/edit-2.svg")}
                                                                className="img-fluid round-links-image"
                                                                alt="edit"
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="procedure-details">
                                        <ul className="procedure-list">
                                            {userInfo.lstProcedure.length > 0 &&
                                                userInfo.lstProcedure.map(
                                                    (procedure, index) => (
                                                        <List
                                                            styleClass="procedure-list-element"
                                                            title={
                                                                procedure.ProcedureName
                                                            }
                                                        />
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {((userInfo.lstGallary &&
                            userInfo.lstGallary.length > 0) ||
                            !this.state.isColleagues) && (
                            <div className="gallery-info my-3">
                                <div className="common-box-profile common-box-sahdow">
                                    <div className="d-flex">
                                        <ProfileTitle title="Gallery" />
                                        {!this.state.isColleagues && (
                                            <div className="edit-click ml-auto">
                                                <ul className="profile-link-list">
                                                    <li className="link">
                                                        <div
                                                            className="round-links"
                                                            onClick={() =>
                                                                this.onGallerylink()
                                                            }
                                                        >
                                                            <img
                                                                src={require("../../assets/img/edit-2.svg")}
                                                                className="img-fluid round-links-image"
                                                                alt="edit"
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="gallery-details">
                                        <ul className="gallery-list">
                                            {userInfo.lstGallary.length > 0 &&
                                                userInfo.lstGallary.map(
                                                    (image, index) => (
                                                        <li className="gallery-list-element">
                                                            <div className="gallery-img-blk">
                                                                <img
                                                                    src={
                                                                        RecordLincURL +
                                                                        "Resources/Gallery/" +
                                                                        image.UserId +
                                                                        "/" +
                                                                        image.FileName
                                                                    }
                                                                    className="img-fluid gallery-image"
                                                                />
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Editpersonalinformation
                            isModalOpen={this.state.isModalOpen}
                            onModalClick={() => this.onModalClick()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            userInfo={this.state.userInfo}
                            reload={() => this.reloadPage()}
                        />

                        <EditWebsite
                            isModalOpen={this.state.iswebsite}
                            onModalClick={() => this.onWebsitelink()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            secondaryWebsiteId={this.state.secondaryWebsiteId}
                            websiteNo={this.state.websiteNo}
                            reload={() => this.reloadPage()}
                        />
                        <Editlocation
                            isModalOpen={this.state.islocation}
                            onModalClick={() => this.onLocation()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            addressId={this.state.addressId}
                            reload={() => this.reloadPage()}
                        />
                        <EditEducation
                            isModalOpen={this.state.iseducation}
                            onModalClick={() => this.oneducationLink()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            userId={this.state.userInfo.UserId}
                            educationId={this.state.educationId}
                            reload={() => this.reloadPage()}
                        />
                        <Editsociallink
                            isModalOpen={this.state.issocial}
                            onModalClick={() => this.onsocialLink()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            userId={this.state.userInfo.UserId}
                            reload={() => this.reloadPage()}
                        />

                        <Editdescription
                            isModalOpen={this.state.isDescription}
                            onModalClick={() => this.onDescriptionlink()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            description={this.state.userInfo.Description}
                            reload={() => this.reloadPage()}
                        />

                        <EditProfessionalMembership
                            isModalOpen={this.state.isMembership}
                            onModalClick={() => this.onMembershiplink()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            userId={this.state.userInfo.UserId}
                            reload={() => this.reloadPage()}
                        />

                        <Editinsurence
                            isModalOpen={this.state.isinsurence}
                            onModalClick={() => this.onInsurencelink()}
                            iserror={this.state.iserror}
                            userId={this.state.userInfo.UserId}
                            reload={() => this.reloadPage()}
                        />

                        <EditProcedureList
                            isModalOpen={this.state.isprocedureList}
                            onModalClick={() => this.onProcedureList()}
                            iserror={this.state.iserror}
                            userId={this.state.userInfo.UserId}
                            reload={() => this.reloadPage()}
                        />
                        <EditGallery
                            isModalOpen={this.state.isgallery}
                            onModalClick={() => this.onGallerylink()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            reload={() => this.reloadPage()}
                        />
                        <EditProfile
                            isModalOpen={this.state.isProfile}
                            onModalClick={() => this.onProfileImageLink()}
                            iserror={this.state.iserror}
                            handleerror={() => this.handleerror()}
                            reload={() => this.reloadPage()}
                            isRemove={this.state.isRemove}
                        />
                    </div>
                )}
            </>
        );
    }
}

export default Myprofile;
