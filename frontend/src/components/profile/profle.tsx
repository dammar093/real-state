import Image from "next/image";
import React, { FC } from "react";

interface ProfileProps {
  img?: string;
  className?: string;
}
const Profile: FC<ProfileProps> = ({ img, className }) => {
  return (
    <div
      className={`border rounded-full border-[var(--primary-color)] flex justify-center items-center overflow-hidden ${className}`}
    >
      <Image
        src={img ? img : "/assets/user.png"}
        width={1080}
        height={720}
        alt="sdfsd"
        className={`w-full h-full object-cover`}
        title="Profile"
      />
    </div>
  );
};

export default Profile;
