import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaStar, FaWhatsapp } from "react-icons/fa";
import styles from "./style.module.css";
const UserCard = () => {
  return (
    <div className="pt-5">
      <div
        className={`p-3 md:p-4 ${styles.card} rounded-md  flex justify-evenly`}
      >
        <div className="flex items-center justify-center flex-col gap-2 ">
          <div className="w-[100px] h-[100px] border border-[var(--primary-color)] overflow-hidden rounded-full">
            <Image
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
              className="h-full w-full object-cover"
              width={1080}
              height={720}
            />
          </div>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-medium text-slate-800">
            Dammar
          </h2>
          <div className="flex items-center gap-2">
            <Link href="https://wa.me/your-number">
              <FaWhatsapp size={25} className="text-slate-700" />
            </Link>
            <Link href="https://www.facebook.com/yourpage">
              <FaFacebook size={25} className="text-slate-700" />
            </Link>
            <Link href="https://www.instagram.com/yourprofile">
              <FaInstagram size={25} className="text-slate-700" />
            </Link>
          </div>
        </div>
        <div className="flex gap-1.5 flex-col">
          <div className="text-center text-slate-800 border-b border-b-gray-500 h-fit">
            <h3 className="text-lg font-semibold">422</h3>
            <p className="text-[12px]">Reviews</p>
          </div>
          <div className="text-center text-slate-800 border-b border-b-gray-500 h-fit">
            <h3 className="text-lg font-semibold flex items-center justify-center">
              <span>4.5</span>
              <FaStar size={15} />
            </h3>
            <p className="text-[12px]">Reviews</p>
          </div>
          <div className="text-center text-slate-800  h-fit">
            <h3 className="text-lg font-semibold">10 </h3>
            <p className="text-[12px]">Years Hosting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
