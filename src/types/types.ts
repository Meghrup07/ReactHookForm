import * as Yup from "yup"
import { loginValidationSchema } from "../shared/Validations";

export type TUserDetails = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    dob: string,
    role: string,
    pic: string | undefined
}

export type TUserCreate = Omit<TUserDetails, "id">

export type TLogin = Yup.InferType<typeof loginValidationSchema>;

export type TLoginResponse = {
    message: string,
    result: {
        token: string
    }
}