import Image from "next/image";
import React, { FC } from "react";
import user from "../../../public/assests/user.png";

interface ProfileProps {
  img?: string;
  className?: string;
}
const Profile: FC<ProfileProps> = ({ img, className }) => {
  return (
    <div
      className={`border rounded-full border-[var(--primary-color)] flex justify-center items-center overflow-hidden ${className}`}
      tabIndex={0}
      role="button"
    >
      <Image
        src={img ? img : user}
        width={1080}
        height={720}
        alt="sdfsd"
        className={`w-full h-full object-cover`}
      />
    </div>
  );
};

export default Profile;
