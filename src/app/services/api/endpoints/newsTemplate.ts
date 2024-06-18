import { designPlatformApi } from "..";
import { NewsTemplateType } from "../../../types/NewsTemplateTypes";

const extendedApi = designPlatformApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewsTemplateById: builder.query<NewsTemplateType, string>({
      query: (id) => `/NewsTemplate/${id}`,
    }),
    getAllNewsTemplate: builder.query<NewsTemplateType[], void>({
      query: () => `/NewsTemplate`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetNewsTemplateByIdQuery, useGetAllNewsTemplateQuery, useLazyGetNewsTemplateByIdQuery } =
  extendedApi;
