"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const AuthProfile = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <FaUser
        className={`text-2xl text-[var(--black-color) h-full w-full] rounded-full`}
        role="button"
        onClick={() => setShow((prev) => !prev)}
      />
      {show && (
        <div className="p-4 w-30 absolute top-22.5 rounded-md bg-white shadow-2xl border border-gray-500/50  right-0 ">
          <ul>
            <li>
              <Link
                href={"/sign-up"}
                className=" hover:text-[var(--primary-color)] capitalize font-medium"
              >
                Sign up
              </Link>
            </li>
            <li>
              <Link
                href={"/sign-in"}
                className=" hover:text-[var(--primary-color)] capitalize font-medium"
              >
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AuthProfile;
