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

export const galleryValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.string()
})