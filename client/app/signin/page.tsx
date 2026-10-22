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
  const [logIn, { isSuccess, error }] = useLogInMutation();

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
      toast.error(errorData?.data?.message || "Something went wrong.");
    }
  }, [isSuccess, error, router]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen flex-center bg-mongzo-mist px-4 py-10">
      <div className="w-full max-w-[450px] bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <Link href="/" className="block text-center text-2xl font-Poppins font-[600] text-mongzo-dark">
          Mongzo<span className="text-mongzo-green">.</span>
        </Link>
        <h1 className="title mt-4 text-mongzo-dark">Sign in to Mongzo</h1>

        <form onSubmit={handleSubmit}>
          {/* email */}
          <div className="w-full mt-8">
            <label className="label text-mongzo-dark" htmlFor="email">
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="you@gmail.com"
              className={`input border border-gray-300 rounded-md px-3 mt-3 text-mongzo-dark placeholder:text-gray-400 ${
                errors.email && touched.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 text-[14px] pt-2 block">{errors.email}</span>
            )}
          </div>

          {/* password */}
          <div className="w-full mt-5 mb-1 relative">
            <label className="label text-mongzo-dark" htmlFor="password">
              Enter your password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="P@$$w0Rd!"
              className={`input border border-gray-300 rounded-md px-3 mt-3 text-mongzo-dark placeholder:text-gray-400 ${
                errors.password && touched.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute bottom-3 right-3 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPass ? <IoEye /> : <IoEyeOff />}
            </button>
            {errors.password && touched.password && (
              <span className="text-red-500 text-[14px] pt-2 block">{errors.password}</span>
            )}
          </div>

          <input
            type="submit"
            value="Sign in"
            className="button bg-mongzo-green hover:bg-mongzo-greenDark text-mongzo-dark font-[600] mt-8"
          />

          <h5 className="text-center pt-6 font-Poppins text-[14px] text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup" className="text-mongzo-greenDark font-[600] hover:underline">
              Sign up
            </Link>
          </h5>

          <h5 className="text-center pt-3 font-Poppins text-[14px]">
            <Link href="/" className="text-gray-500 hover:text-mongzo-dark transition-all">
              Back to home
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
