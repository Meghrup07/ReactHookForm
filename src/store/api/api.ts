import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
  tagTypes:["Posts"],
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => "/userInfo",
      providesTags:["Posts"]
    }),
    getSingeUser: builder.query<any, any>({
      query: (id) => ({
        url: `/userInfo/${id}`,
        method: "GET"
    })}),
    newPost: builder.mutation<any, any>({
      query: (user) => ({
        url: "/userInfo",
        method: "POST",
        body: user
      }),
      invalidatesTags:["Posts"]
    }),
    deleteUser: builder.mutation<any, any>({
      query: (id) => ({
        url: `/userInfo/${id}`,
        method: "DELETE"
      })
    })
  }),
})


export const { useGetUserQuery, useNewPostMutation, useGetSingeUserQuery, useDeleteUserMutation } = userApi


