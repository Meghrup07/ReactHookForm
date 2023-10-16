import * as Yup from "yup"


export const albumValidationSchema = Yup.object().shape({
    albumName: Yup.string()
        .required("Album name is required")
});

export const albumUpdateValidationSchema = Yup.object().shape({
    newAlbumName: Yup.string()
        .required("Album name is required"),
    _id: Yup.string()
});