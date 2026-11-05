import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userSignIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:8000/api/v1/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // refresh token
    refreshToken: builder.query<any, void>({
      query: () => ({
        url: "refreshToken",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // load user
    loadUser: builder.query<any, void>({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userSignIn({ accessToken: result.data.accessToken, user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery, useLazyRefreshTokenQuery } = apiSlice;
