import { apiSlice } from "../api/apiSlice";
import { userSignIn, userSignOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register (step 1: sends verification email)
    register: builder.mutation<any, { name: string; email: string; password: string }>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    // activate user (step 2: verifies 4-digit code and logs in)
    activation: builder.mutation<any, { activation_token: string; activation_code: string }>({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
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

    // forgot password (sends 4-digit reset code)
    forgotPassword: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: "forgot-password",
        method: "POST",
        body: { email },
        credentials: "include" as const,
      }),
    }),

    // reset password with verification code
    resetPassword: builder.mutation<any, { reset_token: string; reset_code: string; new_password: string }>({
      query: (data) => ({
        url: "reset-password",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
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

export const {
  useRegisterMutation,
  useActivationMutation,
  useLogInMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSignOutMutation,
} = authApi;
