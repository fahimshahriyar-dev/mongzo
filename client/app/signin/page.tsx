"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
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
    <div
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dsmkxcczo/image/upload/v1794955973/Gemini_Generated_Image_d3qfh7d3qfh7d3qf_g6izvo.jpg')`,
      }}
    >

      {/* Glassmorphism Card */}
      <div
        className="relative z-10 w-full max-w-[430px] rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] border border-white/50"
        style={{
          background: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        <div className="flex justify-center mb-5">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Image
              src="/assets/images/mongzo_logo_black.png"
              alt="Mongzo Logo"
              width={2172}
              height={724}
              priority
              className="h-8 sm:h-9 w-auto"
            />
          </Link>
        </div>
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <HiOutlineMail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                id="email"
                placeholder="your@email.com"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border bg-white/70 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all hover:bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-slate-200/90 focus:border-blue-500"
                }`}
              />
            </div>
            {errors.email && touched.email && (
              <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-800" htmlFor="password">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <HiOutlineLockClosed size={18} />
              </span>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                id="password"
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white/70 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all hover:bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-slate-200/90 focus:border-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPass ? <IoEyeOff size={18} /> : <IoEye size={18} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-semibold text-sm py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/25 disabled:opacity-50 mt-2"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-xs text-slate-500 font-medium">
              or continue with
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => toast("Google login coming soon!", { icon: "ℹ️" })}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200/90 bg-white/80 hover:bg-white text-xs font-semibold text-slate-700 transition-all shadow-sm hover:shadow"
            >
              <FcGoogle size={18} />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => toast("Facebook login coming soon!", { icon: "ℹ️" })}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200/90 bg-white/80 hover:bg-white text-xs font-semibold text-slate-700 transition-all shadow-sm hover:shadow"
            >
              <FaFacebook size={18} className="text-[#1877F2]" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Footer link */}
          <p className="text-center text-xs text-slate-600 pt-3">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#2563eb] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
