"use client";
import React, { useState } from "react";
import Profile from "../profile/profle";
import Link from "next/link";

const UserProfile = () => {
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);

  return (
    <>
      <Profile
        className="h-10 w-10"
        onClick={() => setShowUserProfile((prev) => !prev)}
      />
      {showUserProfile && (
        <div className="p-4 w-30 absolute top-22.5 rounded-md bg-white shadow-2xl border border-gray-500/50  right-0 ">
          <ul>
            <li>
              <Link
                href={"/profile"}
                className=" hover:text-[var(--primary-color)] capitalize font-medium"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href={"/booking"}
                className=" hover:text-[var(--primary-color)] capitalize font-medium"
              >
                Booking
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserProfile;
