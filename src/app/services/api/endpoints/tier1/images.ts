
import { Images } from "../../models/Images";
import { tier1Api } from "../../tier1";

const extendedApi = tier1Api.injectEndpoints({
  endpoints: (builder) => ({
    getContents: builder.query<Array<Images>, void>({
      query: () => `/content`,
    }),
  }),
  overrideExisting: false,
});

export const {
    useLazyGetContentsQuery
} = extendedApi;