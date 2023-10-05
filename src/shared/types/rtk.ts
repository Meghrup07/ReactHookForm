import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export type ExtraOptionType = {
  enableLoading?: boolean;
  isAuthorizationApi?: boolean;
  [key: string]: unknown;
};

export type BaseApiQueryType = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptionType>;
