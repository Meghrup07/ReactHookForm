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


const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName: string, fileType: keyof typeof validFileExtensions) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()!) > -1;
}

// function getAllowedExt(type: string | number) {
//     return validFileExtensions[type].map((e: any) => `.${e}`).toString()
// }

// const MAX_FILE_SIZE = 102400;


export const galleryValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed()
        .required("Required")
    // .test("is-valid-type", "Not a valid image type",
    //     (value: File | undefined)   => isValidFileType(value && value.name.toLowerCase(), "image"))
    // .test("is-valid-size", "Max allowed size is 100KB",
    //         value => value && value.size <= MAX_FILE_SIZE)
})