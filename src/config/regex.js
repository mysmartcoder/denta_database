export const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};
export const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
export const validPasswordRegex = RegExp(
    /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@#!$%^&+=]).*$/
);
export const validPhoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);
export const validCharRegex = RegExp(/^[a-zA-Z]+$/);

export const validZipCodeRegex = RegExp(/\d{5,6}$/);

export const validFaxRegex = RegExp(
    /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/
);
export const validWebSiteRegex = RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
);

// export default {
//     validateForm,
//     validEmailRegex,
//     validPasswordRegex,
//     validPhoneRegex,
//     validCharRegex,
//     validZipCodeRegex,
//     validFaxRegex,
//     validWebSiteRegex,
// };
