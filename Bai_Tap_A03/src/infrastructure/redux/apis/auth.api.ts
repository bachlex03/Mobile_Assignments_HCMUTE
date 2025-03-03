import { setAccessToken } from "~/src/infrastructure/redux/slices/auth/auth.slice";
import {
  loginPayloadType,
  loginResponseType,
  OtpPayloadType,
  VerifyType,
} from "~/src/infrastructure/types/auth.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createQueryEncodedUrl } from "~/src/infrastructure/utils/query-encoded-url";

export const authApi = createApi({
  reducerPath: "auth-api",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://56d3-116-108-132-138.ngrok-free.app",
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginAsync: builder.mutation({
      query: (payload: loginPayloadType) => ({
        url: "api/v1/auth/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data,
          }: {
            data: {
              data: loginResponseType;
            };
          } = await queryFulfilled;

          // Dispatch the action to set the access token (to store it in the Redux store)
          dispatch(setAccessToken(data.data.accessToken));
        } catch (error) {
          // console.error(error);
        }
      },
    }),
    verifyPhoneNumberOtpAsync: builder.mutation({
      query: (payload: OtpPayloadType) => ({
        url: "api/v1/auth/verify-change-phone-number",
        method: "POST",
        body: payload,
      }),
    }),
    requestToOtpPageAsync: builder.query({
      query: (queries: VerifyType) =>
        createQueryEncodedUrl("api/v1/auth/otp-verify", queries),
    }),
    sendMailAsync: builder.query({
      query: (queries: VerifyType) =>
        createQueryEncodedUrl("api/v1/auth/send-mail-otp", queries),
    }),
  }),
});

export const {
  useLoginAsyncMutation,
  useRequestToOtpPageAsyncQuery,
  useSendMailAsyncQuery,
  useVerifyPhoneNumberOtpAsyncMutation,
} = authApi;
