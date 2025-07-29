import Image from "next/image";
import React from "react";
import logo from "../../../../public/assests/logo.png";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

const SignIn = () => {
  return (
    <div className="h-screen flex items-center">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto p-2 md:p-4 lg:p-6 bg-gray-600/5 shadow rounded-md">
        <form action="" className="flex flex-col items-center gap-5">
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
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Input
                label="Email Address"
                className="border-1 border-gray-400"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Input
                label="Password"
                className="border-1 border-gray-400"
                type="password"
              />
            </div>
            <div className="w-full mt-1">
              <Button type="submit" className="rounded-md px-3 py-2  w-full">
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
