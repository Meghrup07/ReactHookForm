import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { BaseApiQueryType, ExtraOptionType } from '../../types/rtk';
import { authAction } from '../slice/auth';

export const baseQuery = (options: ExtraOptionType) => {
    return fetchBaseQuery({
        baseUrl: 'https://api-dev.oneviz.dev',
        fetchFn: async (...args) => {
            return fetch(...args);
        },
        prepareHeaders: (header, { getState }) => {
            const { isAuthorizationApi = true } = options;
            if (!isAuthorizationApi) return header;
            const token = localStorage.getItem('token');
            header.set('Authorization', `Bearer ${token}`);
            return header;
        },
    }) as BaseApiQueryType;
};

export const baseApiQuery: BaseApiQueryType = async (args, api, extraOption = {}) => {
    const apiCopy = { ...api };
    const { dispatch, signal, abort } = apiCopy;

    try {
        const query = baseQuery(extraOption);
        const result = await query(args, api, extraOption);
        if (result.error) {
            const { error } = result;
            if (error.status === 401) {
                localStorage.getItem('token');
                dispatch(authAction.logout());
                toast.error('Your session has expired. please log in again.');
            } else if (error.status === 500) {
                toast.error('Please try after sometimes.');
            }
        }
        return result;
    } catch (error: any) {
        throw error;
    } finally {
        //
    }
};

