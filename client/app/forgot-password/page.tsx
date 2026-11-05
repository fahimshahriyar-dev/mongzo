"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaKey, FaEnvelope } from "react-icons/fa";
import { useForgotPasswordMutation, useResetPasswordMutation } from "@/redux/features/auth/authApi";

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Please enter your email address."),
});

const resetSchema = Yup.object().shape({
  new_password: Yup.string()
    .required("Please enter your new password.")
    .min(8, "Password must be at least 8 characters."),
  confirm_password: Yup.string()
    .required("Please confirm your password.")
    .oneOf([Yup.ref("new_password")], "Passwords must match."),
});

const ForgotPassword = () => {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [resetToken, setResetToken] = useState("");
  const [targetEmail, setTargetEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState(["", "", "", ""]);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const [forgotPassword, { isSuccess: isReqSuccess, data: reqData, error: reqError, isLoading: isReqLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isSuccess: isResSuccess, data: resData, error: resError, isLoading: isResLoading }] = useResetPasswordMutation();

  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: async ({ email }) => {
      setTargetEmail(email);
      await forgotPassword({ email });
    },
  });

  const resetFormik = useFormik({
    initialValues: { new_password: "", confirm_password: "" },
    validationSchema: resetSchema,
    onSubmit: async ({ new_password }) => {
      const code = verifyCode.join("");
      if (code.length < 4) {
        toast.error("Please enter the complete 4-digit verification code.");
        return;
      }
      await resetPassword({
        reset_token: resetToken,
        reset_code: code,
        new_password,
      });
    },
  });

  useEffect(() => {
    if (isReqSuccess) {
      toast.success(reqData?.message || "Verification code sent to your email!");
      setResetToken(reqData?.resetToken);
      setStep("verify");
    }
    if (reqError) {
      const errorData = reqError as any;
      toast.error(errorData?.data?.message || "Failed to send reset code.");
    }
  }, [isReqSuccess, reqData, reqError]);

  useEffect(() => {
    if (isResSuccess) {
      toast.success(resData?.message || "Password reset successfully! Please sign in.");
      router.push("/signin");
    }
    if (resError) {
      const errorData = resError as any;
      toast.error(errorData?.data?.message || "Invalid or expired reset code.");
    }
  }, [isResSuccess, resData, resError, router]);

  const handleCodeChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newCode = [...verifyCode];
    newCode[index] = val;
    setVerifyCode(newCode);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa] px-4 py-10">
      <div className="w-full max-w-[460px] bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-8 sm:p-10 transition-all">
        <Link href="/" className="block text-center text-3xl font-orbitron font-bold text-neutral-900 tracking-wider">
          Mongzo<span className="text-blue-600">.</span>
        </Link>

        {step === "request" ? (
          <>
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mt-4 mb-2">
              <FaEnvelope className="text-xl" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 text-center">
              Forgot password?
            </h1>
            <p className="text-xs text-neutral-500 text-center mt-1 px-2">
              Enter your registered email address and we will send you a 4-digit verification code to reset your password.
            </p>

            <form onSubmit={emailFormik.handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={emailFormik.values.email}
                  onChange={emailFormik.handleChange}
                  id="email"
                  placeholder="you@gmail.com"
                  className={`w-full mt-1.5 px-3.5 py-2.5 rounded-xl border bg-neutral-50/50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                    emailFormik.errors.email && emailFormik.touched.email
                      ? "border-red-500"
                      : "border-neutral-300 focus:border-blue-500"
                  }`}
                />
                {emailFormik.errors.email && emailFormik.touched.email && (
                  <span className="text-red-500 text-xs mt-1 block">{emailFormik.errors.email}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isReqLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {isReqLoading ? "Sending reset code..." : "Send Verification Code"}
              </button>

              <div className="text-center pt-2">
                <Link href="/signin" className="text-xs text-neutral-600 hover:text-neutral-950 font-semibold underline">
                  Back to Sign in
                </Link>
              </div>
            </form>
          </>
        ) : (
          /* Step 2: Enter code & New password */
          <>
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mt-4 mb-2">
              <FaKey className="text-xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 text-center">
              Set new password
            </h2>
            <p className="text-xs text-neutral-500 text-center mt-1 px-2">
              Enter the 4-digit code sent to <span className="font-semibold text-neutral-800">{targetEmail}</span> along with your new password.
            </p>

            <form onSubmit={resetFormik.handleSubmit} className="mt-8 space-y-5">
              {/* 4-digit verification code */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 text-center mb-2">
                  Verification Code
                </label>
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
                      className="w-12 h-12 text-center text-xl font-bold rounded-xl border-2 border-neutral-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-neutral-50/50 focus:bg-white"
                    />
                  ))}
                </div>
              </div>

              {/* New password */}
              <div className="relative">
                <label className="block text-xs font-semibold text-neutral-700" htmlFor="new_password">
                  New Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showPass ? "text" : "password"}
                    name="new_password"
                    value={resetFormik.values.new_password}
                    onChange={resetFormik.handleChange}
                    id="new_password"
                    placeholder="At least 8 characters"
                    className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border bg-neutral-50/50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                      resetFormik.errors.new_password && resetFormik.touched.new_password
                        ? "border-red-500"
                        : "border-neutral-300 focus:border-blue-500"
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
                {resetFormik.errors.new_password && resetFormik.touched.new_password && (
                  <span className="text-red-500 text-xs mt-1 block">{resetFormik.errors.new_password}</span>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700" htmlFor="confirm_password">
                  Confirm New Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="confirm_password"
                  value={resetFormik.values.confirm_password}
                  onChange={resetFormik.handleChange}
                  id="confirm_password"
                  placeholder="Repeat your password"
                  className={`w-full mt-1.5 px-3.5 py-2.5 rounded-xl border bg-neutral-50/50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                    resetFormik.errors.confirm_password && resetFormik.touched.confirm_password
                      ? "border-red-500"
                      : "border-neutral-300 focus:border-blue-500"
                  }`}
                />
                {resetFormik.errors.confirm_password && resetFormik.touched.confirm_password && (
                  <span className="text-red-500 text-xs mt-1 block">{resetFormik.errors.confirm_password}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isResLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {isResLoading ? "Resetting password..." : "Reset Password"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("request")}
                  className="text-xs text-neutral-500 hover:text-neutral-800 underline"
                >
                  Resend code or change email
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

