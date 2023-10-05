import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TUserCreate, TUserDetails } from '../../types/types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getUser: builder.query<TUserDetails[], void>({
      query: () => "/userInfo",
      providesTags: ["Posts"]
    }),
    getSingeUser: builder.query<TUserDetails, string>({
      query: (id) => ({
        url: `/userInfo/${id}`,
        method: "GET",
      }),
      providesTags: ["Posts"]
    }),
    newPost: builder.mutation<TUserDetails, TUserCreate>({
      query: (user) => ({
        url: "/userInfo",
        method: "POST",
        body: user
      }),
      invalidatesTags: ["Posts"]
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/userInfo/${id}`,
        method: "DELETE",
        credentials: "include"
      }),
      invalidatesTags: ["Posts"]
    }),
    updateUser: builder.mutation<TUserDetails, TUserDetails>({
      query: (user) => ({
        url: `/userInfo/${user.id}`,
        method: "PUT",
        body: user
      }),
      invalidatesTags: ["Posts"]
    })
  }),
})


export const { useGetUserQuery, useNewPostMutation, useGetSingeUserQuery, useDeleteUserMutation, useUpdateUserMutation } = userApi


