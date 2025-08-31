"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/assests/logo.png";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

type FormData = {
  email: string;
};

const ForgotPasswordPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("/api/auth/forgot-password", {
        email: data.email,
      });
      if (res.data.success) {
        setSuccess("Verification email sent!");
        router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to send verification email"
      );
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
          {/* Logo */}
          <div>
            <div className="aspect-square w-23 h-23 mx-auto">
              <Image
                src={logo}
                alt="logo"
                width={1080}
                height={720}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-center font-semibold text-lg text-gray-800 my-0">
              Forgot Password
            </h2>
          </div>

          {/* Error / Success Message */}
          <div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>

          {/* Input */}
          <div className="flex flex-col gap-3 w-full">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your registered email"
              className="border border-gray-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email format",
                },
              })}
            />

            {/* Submit Button */}
            <div className="w-full mt-1">
              <Button
                type="submit"
                loading={loading}
                className="rounded-md px-3 py-2 w-full cursor-pointer"
              >
                Send Verification
              </Button>
            </div>

            {/* Back to Sign In */}
            <div className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <a href="/sign-in" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
