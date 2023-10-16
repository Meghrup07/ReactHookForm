import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { TAlbum, TAlbumList, TGalleryList } from "../../types/gallery";
import { baseApiQuery } from "../interceptor/interceptor";

const instituteService: string = "/institute-service/api/v1";

export const galleryApi = createApi({
    reducerPath: "galleryApi",
    baseQuery: baseApiQuery,
    tagTypes: ["gallery"],
    endpoints: (builder) => ({
        getAlbum: builder.query<TAlbumList, void>({
            query: () => ({
                url: instituteService + '/albums/album-list',
                method: "GET"
            }),
            providesTags: ["gallery"]
        }),
        createAlbum: builder.mutation<any, TAlbum>({
            query: (album) => ({
                url: instituteService + '/albums/add',
                method: "POST",
                body: album
            }),
            invalidatesTags: ["gallery"]
        }),
        deleteAlbum: builder.mutation<void, string>({
            query: (id) => ({
                url: instituteService + `/albums/delete/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["gallery"]
        }),
        getGallery: builder.query<TGalleryList, void>({
            query: (albumId: any) => ({
                url: instituteService + `/gallery/get-list/${albumId}`,
                method: "GET"
            }),
            providesTags: ["gallery"]
        })
    })
})


export const { useGetAlbumQuery, useGetGalleryQuery, useCreateAlbumMutation, useDeleteAlbumMutation } = galleryApi