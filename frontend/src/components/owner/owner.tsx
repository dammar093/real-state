import React from "react";
import Profile from "../profile/profle";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Button from "../ui/button";
import { User } from "@/types/user";
import { getTimeSince } from "@/utils/utils";

const Owner = ({ owner }: { owner: User }) => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/users/1" className="block w-fit">
              <Profile img={owner?.userDetail?.profile?.image} />
            </Link>
            <div>
              <h4 className="text-slate-700 fw-medium capitalize text-[18px]">
                {owner?.fullName}
              </h4>
              <p className="text-[14px] text-slate-600">
                Member for {getTimeSince(new Date(owner?.createdAt as string))}
              </p>
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
