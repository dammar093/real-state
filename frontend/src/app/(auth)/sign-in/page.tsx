"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/assests/logo.png";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { login } from "@/redux/feature/authSlice";
import { useRouter } from "next/navigation";
import { decodeToken, Role } from "@/utils/utils";
import { loginUser } from "@/api/api";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    loginUser(data)
      .then((res) => {
        const token = res.data;
        dispatch(login(token));
        const decoded = decodeToken(token);
        if (decoded?.role === Role.SUPER_ADMIN) {
          router.replace("/super-dashboard");
        } else if (decoded?.role === Role.ADMIN) {
          router.replace("/dashboard");
        } else {
          router.replace("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Invalid email or password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="h-screen flex items-center">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto p-2 md:p-4 lg:p-6 bg-gray-600/5 shadow rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5"
        >
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
              Sign in to Book My Room
            </h2>
          </div>
          <div>{error && <p className="text-red-500">{error}</p>}</div>
          <div className="flex flex-col gap-3 w-full">
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

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="border border-gray-400"
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

            <div className="w-full mt-1">
              <Button
                type="submit"
                className="rounded-md px-3 py-2 w-full"
                loading={loading}
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
