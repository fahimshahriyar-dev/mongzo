"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaShieldAlt } from "react-icons/fa";
import { useRegisterMutation, useActivationMutation } from "@/redux/features/auth/authApi";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name."),
  email: Yup.string().email("Invalid email").required("Please enter your email."),
  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Password must be at least 8 characters."),
});

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [activationStep, setActivationStep] = useState(false);
  const [activationToken, setActivationToken] = useState("");
  const [verifyCode, setVerifyCode] = useState(["", "", "", ""]);
  const router = useRouter();

  const [register, { isSuccess: isRegSuccess, data: regData, error: regError, isLoading: isRegLoading }] =
    useRegisterMutation();
  const [activation, { isSuccess: isActSuccess, error: actError, isLoading: isActLoading }] =
    useActivationMutation();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  useEffect(() => {
    if (isRegSuccess) {
      toast.success(regData?.message || "Verification code sent to your email!");
      setActivationToken(regData?.activationToken);
      setActivationStep(true);
    }
    if (regError) {
      const errorData = regError as any;
      toast.error(errorData?.data?.message || "Failed to register.");
    }
  }, [isRegSuccess, regData, regError]);

  useEffect(() => {
    if (isActSuccess) {
      toast.success("Account activated successfully!");
      router.push("/");
    }
    if (actError) {
      const errorData = actError as any;
      toast.error(errorData?.data?.message || "Invalid or expired code.");
    }
  }, [isActSuccess, actError, router]);

  const handleCodeChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newCode = [...verifyCode];
    newCode[index] = val;
    setVerifyCode(newCode);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verifyCode[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verifyCode.join("");
    if (code.length < 4) {
      toast.error("Please enter the complete 4-digit code.");
      return;
    }
    await activation({
      activation_token: activationToken,
      activation_code: code,
    });
  };

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
        className="relative z-10 w-full max-w-[440px] rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] border border-white/50"
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
        {!activationStep ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Sign up to start your journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <HiOutlineUser size={18} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border bg-white/70 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all hover:bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-slate-200/90 focus:border-blue-500"
                    }`}
                  />
                </div>
                {errors.name && touched.name && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>
                )}
              </div>

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
                <label className="block text-xs font-semibold text-slate-800 mb-1.5" htmlFor="password">
                  Password
                </label>
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
                disabled={isRegLoading}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-semibold text-sm py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/25 disabled:opacity-50 mt-2"
              >
                {isRegLoading ? "Creating Account..." : "Sign Up"}
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
                  onClick={() => toast("Google signup coming soon!", { icon: "ℹ️" })}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200/90 bg-white/80 hover:bg-white text-xs font-semibold text-slate-700 transition-all shadow-sm hover:shadow"
                >
                  <FcGoogle size={18} />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => toast("Facebook signup coming soon!", { icon: "ℹ️" })}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200/90 bg-white/80 hover:bg-white text-xs font-semibold text-slate-700 transition-all shadow-sm hover:shadow"
                >
                  <FaFacebook size={18} className="text-[#1877F2]" />
                  <span>Facebook</span>
                </button>
              </div>

              {/* Footer link */}
              <p className="text-center text-xs text-slate-600 pt-3">
                Already have an account?{" "}
                <Link href="/signin" className="text-[#2563eb] font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </>
        ) : (
          /* Activation Verification Step */
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[#2563eb] flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Verify your email
            </h2>
            <p className="text-xs text-slate-500 mt-2 px-2 leading-relaxed">
              We sent a 4-digit code to{" "}
              <span className="font-semibold text-slate-800">{values.email}</span>.
              Enter it below to activate your account.
            </p>

            <form onSubmit={handleVerifySubmit} className="mt-6 space-y-5">
              <div className="flex justify-center gap-3">
                {verifyCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`digit-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(idx, e)}
                    className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-slate-200/90 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white/70 focus:bg-white text-slate-800"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isActLoading}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-semibold text-sm py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/25 disabled:opacity-50"
              >
                {isActLoading ? "Verifying..." : "Verify & Activate Account"}
              </button>

              <div>
                <button
                  type="button"
                  onClick={() => setActivationStep(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Change email or details
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
