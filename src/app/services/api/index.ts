// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
// import { acquireAccessToken } from '@auth/helper';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  prepareHeaders: async (headers) => {
    return headers;
  },
  credentials: "include"
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const designPlatformApi = createApi({
  reducerPath: "designPlatformApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 12,
  tagTypes: [],
  endpoints: () => ({}),
});