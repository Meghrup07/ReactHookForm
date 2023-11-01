
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseApiQuery } from "../interceptor/interceptor";
import { TMemberList } from "../../types/member";

const instituteService: string = "/institute-service/api/v1";

export const memberApi = createApi({
    reducerPath: "memberApi",
    baseQuery: baseApiQuery,
    endpoints: (builder) => ({
        getMember: builder.query<TMemberList, void>({
            query: () => ({
                url: instituteService + '/members/get/all-member-list',
                method: 'GET',
                // params: { limit: limit, page: limit, search: search }
            })
        })
    })
})

export const { useGetMemberQuery } = memberApi;