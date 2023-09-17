import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TLogin, TLoginResponse } from "../../../types/types";
import { baseQueryWithReauth } from "../interceptor/interceptor";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    // fetchBaseQuery({
    //     baseUrl: ''
    // }),
    tagTypes: ["Posts"],
    endpoints: (builder) => ({
        login: builder.mutation<TLoginResponse, TLogin>({
            query: (user) => ({
                url: "/user/login",
                method: "POST",
                body: user
            })
        }),
    })
})
export const { useLoginMutation } = authApi