import * as Yup from "yup"
import { albumUpdateValidationSchema, albumValidationSchema } from "../validations/AlbumGallery";

export type TAlbum = Yup.InferType<typeof albumValidationSchema>;

export type TAlbumUpdate = Yup.InferType<typeof albumUpdateValidationSchema>;

export type TAlbumList = {
    message: string,
    result: [
        {
            albumName: string;
            createdAt: string;
            instituteId: string;
            updatedAt: string;
            __v: number;
            _id: string;
        }
    ]
}

export type TGalleryList = {
    message: string,
    result: [
        {
            createdAt: string;
            description: string;
            instituteId: string;
            title: string;
            updatedAt: string;
            _id: string;
            mediaFileInformation: [
                {
                    createdAt: string;
                    fileName: string;
                    fileOriginalName: string;
                    fileSize: number;
                    mediaUrl: string;
                    mimeType: string;
                    updatedAt: string;
                    _id: string;
                }
            ]
        }
    ]
}