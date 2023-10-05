
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseApiQuery } from "../interceptor/interceptor";

const instituteService: string = "/institute-service/api/v1";

export const memberApi = createApi({
    reducerPath: "memberApi",
    baseQuery: baseApiQuery,
    endpoints: (builder) => ({
        getMember: builder.query<any[], void>({
            query: () => ({
                url: instituteService + '/members/get/all-member-list',
                method: 'GET'
            })
        })
    })
})

export const { useGetMemberQuery } = memberApi;