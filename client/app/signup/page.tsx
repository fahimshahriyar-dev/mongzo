"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
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

  const [register, { isSuccess: isRegSuccess, data: regData, error: regError, isLoading: isRegLoading }] = useRegisterMutation();
  const [activation, { isSuccess: isActSuccess, error: actError, isLoading: isActLoading }] = useActivationMutation();

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
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa] px-4 py-10">
      <div className="w-full max-w-[460px] bg-white rounded-3xl border border-neutral-200/80 shadow-xl p-8 sm:p-10 transition-all">
        <Link href="/" className="block text-center text-3xl font-orbitron font-bold text-neutral-900 tracking-wider">
          Mongzo<span className="text-blue-600">.</span>
        </Link>

        {!activationStep ? (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 text-center mt-3">
              Create an account
            </h1>
            <p className="text-xs text-neutral-500 text-center mt-1">
              Join Mongzo and start exploring the world
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  id="name"
                  placeholder="Mr. John Doe"
                  className={`w-full mt-1.5 px-3.5 py-2.5 rounded-xl border bg-neutral-50/50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                    errors.name && touched.name ? "border-red-500" : "border-neutral-300 focus:border-blue-500"
                  }`}
                />
                {errors.name && touched.name && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>
                )}
              </div>

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
                <label className="block text-xs font-semibold text-neutral-700" htmlFor="password">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    placeholder="At least 8 characters"
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
                disabled={isRegLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 mt-2"
              >
                {isRegLoading ? "Sending verification email..." : "Sign up"}
              </button>

              <p className="text-center text-xs text-neutral-500 pt-3">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-600 font-bold hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </>
        ) : (
          /* Activation Verification Step */
          <div className="mt-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <FaShieldAlt className="text-xl" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 text-center">
              Verify your email
            </h2>
            <p className="text-xs text-neutral-500 text-center mt-1 px-4">
              We have sent a 4-digit verification code to <span className="font-semibold text-neutral-800">{values.email}</span>. Please enter it below:
            </p>

            <form onSubmit={handleVerifySubmit} className="mt-8 space-y-6">
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
                    className="w-14 h-14 text-center text-2xl font-bold rounded-2xl border-2 border-neutral-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-neutral-50/50 focus:bg-white"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isActLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {isActLoading ? "Verifying..." : "Verify & Activate Account"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setActivationStep(false)}
                  className="text-xs text-neutral-500 hover:text-neutral-800 underline"
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
