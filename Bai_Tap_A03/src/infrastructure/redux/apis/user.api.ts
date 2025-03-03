import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ChangePhoneNumberPayload,
  ChangePhoneNumberResponseBase,
  UpdateProfilePayload,
} from "~/src/infrastructure/types/user.type";
export const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://56d3-116-108-132-138.ngrok-free.app",
    prepareHeaders: (headers, { getState }) => {
      headers.set("ngrok-skip-browser-warning", "true");

      // Get the token from the Redux auth state
      const { token } = (getState() as { auth: { token: string } }).auth;

      // If the token exists, set it in the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserProfileAsync: builder.query({
      query: () => "api/v1/users/profile",
    }),

    updateUserProfileAsync: builder.mutation({
      query: (body: UpdateProfilePayload) => ({
        url: "api/v1/users/profile",
        method: "PUT",
        body,
      }),
    }),

    changePhoneNumberAsync: builder.mutation({
      query: (body: ChangePhoneNumberPayload) => ({
        url: "api/v1/users/phone-number",
        method: "PATCH",
        body,
      }),
      transformResponse: (response: ChangePhoneNumberResponseBase) => ({
        redirect: response.data.redirect,
      }),
    }),
  }),
});

export const {
  useGetUserProfileAsyncQuery,
  useUpdateUserProfileAsyncMutation,
  useChangePhoneNumberAsyncMutation,
} = userApi;
