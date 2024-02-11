import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (passInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
