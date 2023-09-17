import * as Yup from "yup"


export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .email("Please Enter valid email"),
    password: Yup.string().required("Password is required"),
});


const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const addUserValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Please enter valid email"),
    mobileNumber: Yup.string()
        .required("Mobile no. is required")
        .matches(phoneRegExp, "Please enter valid mobile no.")
        .min(10, "Please enter valid mobile no.")
        .max(10, "Please enter valid mobile no."),
    dob: Yup.string().required("DOB is required"),
    role: Yup.string().required("Role is required"),
    pic: Yup.string(),
    id: Yup.string()
});