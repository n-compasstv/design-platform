import { Images } from "../../models/Images";
import { tier1Api } from "../../tier1";

const extendedApi = tier1Api.injectEndpoints({
  endpoints: (builder) => ({
    getContents: builder.query<Array<Images>, void>({
      query: () => `/content`,
      transformResponse: (response: Array<Images>) => {
        return response.filter((f) => f.fileType != "image/gif");
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetContentsQuery } = extendedApi;
