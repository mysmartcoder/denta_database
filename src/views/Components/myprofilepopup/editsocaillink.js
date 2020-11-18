import React, { useState, useEffect } from "react";
import { Modal, Form } from "reactstrap";
import InputForms from "../inputForm";
import Header from "./popupheader";
import Footer from "./popupfooter";
import Api from "../../../redux/apis/profile";
import { validWebSiteRegex } from "../../../config/regex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSociallink = (props) => {
    const [socialLink, setSocialLink] = useState({
        FacebookUrl: "",
        LinkedinUrl: "",
        TwitterUrl: "",
        GoogleplusUrl: "",
        YoutubeUrl: "",
        PinterestUrl: "",
        BlogUrl: "",
        InstagramUrl: "",
        YelpUrl: "",
    });

    const [errors, setErrors] = useState({
        FacebookUrl: "",
        LinkedinUrl: "",
        TwitterUrl: "",
        GoogleplusUrl: "",
        YoutubeUrl: "",
        PinterestUrl: "",
        BlogUrl: "",
        InstagramUrl: "",
        YelpUrl: "",
    });

    useEffect(() => {
        Api.getSocialMedia()
            .then((res) => {
                setSocialLink(res.data[0]);
            })
            .catch((error) => {});
    }, [props.userId]);

    const handelChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        let errorValue = "";
        setSocialLink((socialLink) => ({
            ...socialLink,
            [name]: value,
        }));
        if (value.trim().length > 0) {
            errorValue = validWebSiteRegex.test(value)
                ? ""
                : "Enter valid link.";
        }
        setErrors((errors) => ({
            ...errors,
            [name]: errorValue,
        }));
    };

    const handelSubmit = (event) => {
        Api.postSocialMedia(socialLink)
            .then((res) => {
                props.onModalClick();
                toast.success("Successfully socialLink updated!");
                setTimeout(() => {
                    props.reload();
                }, 3000);
            })
            .catch((error) => {
                toast.error("Something went wrong");
            });
    };

    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                toggle={props.onModalClick}
                centered={true}
                className="wrap-small-modal popup-content main-block "
            >
                <div className="edit-profile">
                    <div className="sub-block myprofile-pop-up">
                        <Header
                            title="Edit Social Information"
                            oncloseLick={props.onModalClick}
                        />
                        <div className="inner-block">
                            <Form
                                className="myprofile-form"
                                onSubmit={handelSubmit}
                            >
                                <div className="main-form-block">
                                    <InputForms
                                        labelname=" Facebook"
                                        className={
                                            errors.FacebookUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://facebook.com/login"
                                        id="s-link1"
                                        value={socialLink.FacebookUrl}
                                        name="FacebookUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.FacebookUrl.length > 0 && (
                                        <span className="error">
                                            {errors.FacebookUrl}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Twitter"
                                        className={
                                            errors.TwitterUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://twitter.com/login"
                                        id="s-link2"
                                        value={socialLink.TwitterUrl}
                                        name="TwitterUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.TwitterUrl.length > 0 && (
                                        <span className="error">
                                            {errors.TwitterUrl}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Instagram"
                                        className={
                                            errors.InstagramUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://instagram.com/login"
                                        id="s-link3"
                                        value={socialLink.InstagramUrl}
                                        name="InstagramUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.InstagramUrl.length > 0 && (
                                        <span className="error">
                                            {errors.InstagramUrl}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Linkedin"
                                        className={
                                            errors.LinkedinUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://linkedin.com/login"
                                        id="s-link4"
                                        value={socialLink.LinkedinUrl}
                                        name="LinkedinUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.LinkedinUrl.length > 0 && (
                                        <span className="error">
                                            {errors.LinkedinUrl}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Google Plus"
                                        className={
                                            errors.GoogleplusUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://googleplus.com/login"
                                        id="s-link5"
                                        value={socialLink.GoogleplusUrl}
                                        name="GoogleplusUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.GoogleplusUrl.length > 0 && (
                                        <span className="error">
                                            {errors.GoogleplusUrl}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Pintrest"
                                        className={
                                            errors.PinterestUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://pintrest.com/login"
                                        id="s-link6"
                                        value={socialLink.PinterestUrl}
                                        name="PinterestUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.PinterestUrl.length > 0 && (
                                        <span className="error">
                                            {errors.PinterestUrl}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="YouTube"
                                        className={
                                            errors.YoutubeUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://youtube.com/login"
                                        id="s-link7"
                                        value={socialLink.YoutubeUrl}
                                        name="YoutubeUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.YoutubeUrl.length > 0 && (
                                        <span className="error">
                                            {errors.YoutubeUrl}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Blog"
                                        className={
                                            errors.BlogUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://blog.com/login"
                                        id="s-link8"
                                        value={socialLink.BlogUrl}
                                        name="BlogUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.BlogUrl.length > 0 && (
                                        <span className="error">
                                            {errors.BlogUrl}
                                        </span>
                                    )}
                                    <InputForms
                                        labelname="Yelp"
                                        className={
                                            errors.YelpUrl.length > 0
                                                ? "error myprofile-form-group"
                                                : "myprofile-form-group"
                                        }
                                        type="text"
                                        placeholder="https://yelp.com/login"
                                        id="s-link9"
                                        value={socialLink.YelpUrl}
                                        name="YelpUrl"
                                        onChange={handelChange}
                                    />
                                    {errors.YelpUrl.length > 0 && (
                                        <span className="error">
                                            {errors.YelpUrl}
                                        </span>
                                    )}
                                </div>
                                <Footer
                                    onModalClick={props.onModalClick}
                                    handleerror={props.handleerror}
                                    value="save changes"
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
            <ToastContainer hideProgressBar />
        </div>
    );
};
export default EditSociallink;
