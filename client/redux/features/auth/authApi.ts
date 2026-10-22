import { apiSlice } from "../api/apiSlice";
import { userSignIn, userSignOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register
    register: builder.mutation<any, { name: string; email: string; password: string }>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
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

    // logIn
    logIn: builder.mutation<any, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
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

    // signOut
    signOut: builder.mutation<any, void>({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userSignOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLogInMutation, useSignOutMutation } = authApi;
