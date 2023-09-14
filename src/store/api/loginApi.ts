import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TLogin, TLoginResponse } from "../../types/types";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-dev.oneviz.dev/user-service/api/v1'
    }),
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