// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
// import { acquireAccessToken } from '@auth/helper';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://tier1.ourimage.biz/api",
  prepareHeaders: async (headers) => {
    return headers;
  },
  credentials: "include"
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const tier1Api = createApi({
  reducerPath: "tier1Api",
  baseQuery: baseQuery,
  keepUnusedDataFor: 12,
  tagTypes: [],
  endpoints: () => ({}),
});