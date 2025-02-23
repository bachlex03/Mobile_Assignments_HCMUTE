import { setAccessToken } from "~/infrastructure/redux/slices/auth/auth.slice";
import {
  loginPayloadType,
  loginResponseType,
} from "~/infrastructure/types/auth.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth-api",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/auth/",
  }),
  endpoints: (builder) => ({
    loginAsync: builder.mutation({
      query: (payload: loginPayloadType) => ({
        url: "login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data }: { data: loginResponseType } = await queryFulfilled;

          // Dispatch the action to set the access token (to store it in the Redux store)
          dispatch(setAccessToken(data.accessToken));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginAsyncMutation } = authApi;
