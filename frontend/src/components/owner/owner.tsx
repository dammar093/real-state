import React from "react";
import Profile from "../profile/profle";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Owner = () => {
  return (
    <div>
      <div>
        <div className="">
          <div className="flex items-center gap-2">
            <Link href="/users/1" className="block w-fit">
              <Profile />
            </Link>
            <div>
              <h4 className="text-slate-700 fw-medium capitalize text-[18px]">
                Dammar Singh Rana
              </h4>
              <p className="text-[14px] text-slate-600">Member for 5 years</p>
              <div className="flex items-center gap-2">
                <Link href="https://wa.me/your-number">
                  <FaWhatsapp size={20} className="text-slate-700" />
                </Link>
                <Link href="https://www.facebook.com/yourpage">
                  <FaFacebook size={20} className="text-slate-700" />
                </Link>
                <Link href="https://www.instagram.com/yourprofile">
                  <FaInstagram size={20} className="text-slate-700" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;
