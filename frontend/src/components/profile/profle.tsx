import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <div className="border w-[80px] h-[80px] rounded-full border-[var(--primary-color)] flex justify-center items-center overflow-hidden">
      <Image
        src="https://images.pexels.com/photos/8090123/pexels-photo-8090123.jpeg"
        width={1080}
        height={720}
        alt="sdfsd"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Profile;
