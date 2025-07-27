import React from "react";
import Profile from "../profile/profle";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Button from "../ui/button";

const Owner = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/users/1" className="block w-fit">
              <Profile className="h-20 w-20" />
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
          <div>
            <Button className="px-3 py-1.5">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;
