"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useLogInMutation } from "@/redux/features/auth/authApi";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Please enter your email."),
  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Password must be at least 8 characters."),
});

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const [logIn, { isSuccess, error, isLoading }] = useLogInMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await logIn({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully!");
      router.push("/");
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message || "Invalid email or password.");
    }
  }, [isSuccess, error, router]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa] px-4 py-10">
      <div className="w-full max-w-[440px] bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-8 sm:p-10 transition-all">
        <Link href="/" className="block text-center text-3xl font-orbitron font-bold text-neutral-900 tracking-wider">
          Mongzo<span className="text-blue-600">.</span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 text-center mt-3">
          Sign in to Mongzo
        </h1>
        <p className="text-xs text-neutral-500 text-center mt-1">
          Welcome back! Please enter your details
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="you@gmail.com"
              className={`w-full mt-1.5 px-3.5 py-2.5 rounded-xl border bg-neutral-50/50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                errors.email && touched.email ? "border-red-500" : "border-neutral-300 focus:border-blue-500"
              }`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-neutral-700" htmlFor="password">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1.5">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                id="password"
                placeholder="Enter your password"
                className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border bg-neutral-50/50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                  errors.password && touched.password ? "border-red-500" : "border-neutral-300 focus:border-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label="Toggle password visibility"
              >
                {showPass ? <IoEye size={18} /> : <IoEyeOff size={18} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 mt-2"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-xs text-neutral-500 pt-3">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
