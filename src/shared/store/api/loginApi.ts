import { createApi } from "@reduxjs/toolkit/query/react";
import { TLogin, TLoginResponse } from "../../types/types";
import { baseApiQuery } from "../interceptor/interceptor";


const userService = "/user-service/api/v1"

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseApiQuery,
    tagTypes: ["Posts"],
    endpoints: (builder) => ({
        login: builder.mutation<TLoginResponse, TLogin>({
            query: (user) => ({
                url: userService + "/user/login",
                method: "POST",
                body: user
            })
        }),
    })
})
export const { useLoginMutation } = authApi