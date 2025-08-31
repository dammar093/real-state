"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser } from "@/api/api"; // ⬅️ your signup API
import { useRouter } from "next/navigation";

type SignUpForm = {
  fullName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registerUser(data); // ⬅️ call API
      console.log("Sign up success:", res.data);

      // ✅ Redirect to verify account page
      router.replace(`/verify-account?email=${data.email}`);
    } catch (err: any) {
      console.error("Sign up failed", err);
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto p-2 md:p-4 lg:p-6 bg-gray-600/5 shadow rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5"
        >
          <h2 className="text-center font-semibold text-lg text-gray-800 my-2">
            Create Your Account
          </h2>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col gap-3 w-full">
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              className="border border-gray-400"
              {...register("fullName", {
                required: "Full name is required",
              })}
              error={errors.fullName?.message}
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              className="border border-gray-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email format",
                },
              })}
              error={errors.email?.message}
            />

            {/* Password with Eye Toggle */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-gray-400 pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number, and special character",
                  },
                })}
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Submit */}
            <div className="w-full mt-1">
              <Button
                type="submit"
                className="rounded-md px-3 py-2 w-full"
                loading={loading}
              >
                Sign Up
              </Button>
            </div>

            {/* Link to Sign In */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
