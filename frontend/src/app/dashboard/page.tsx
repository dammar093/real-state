"use client";
import Link from "next/link";
import React from "react";
import { GiBookCover } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";
import useProperties from "@/hooks/useProperties";
import useCategories from "@/hooks/useCategories";
import useUsers from "@/hooks/useUsers";

const Dashboard = () => {
  const { total: totalProperties } = useProperties();
  const { total: totalCategories } = useCategories();
  const { total: totalUsers } = useUsers();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
      <Link href={"/dashboard/properties"}>
        <div className="p-4 bg-white shadow rounded bg-gradient-to-tr from-purple-400 to-blue-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MdMapsHomeWork className="text-2xl" />
            <span>Properties</span>
          </h3>
          <span className="text-gray-900 font-semibold">{totalProperties}</span>
        </div>
      </Link>
      <Link href={"/dashboard/booking"}>
        <div className="p-4 bg-white shadow rounded bg-gradient-to-tr from-red-400 to-yellow-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <GiBookCover className="text-2xl" />
            <span>Booking</span>
          </h3>
          <span className="text-gray-900 font-semibold">{totalProperties}</span>
        </div>
      </Link>

      <div className="p-4 bg-white shadow rounded bg-gradient-to-tr from-green-400 to-blue-500">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FaSackDollar className="text-2xl" />
          <span>Earning</span>
        </h3>
        <span className="text-gray-900 font-semibold">{totalCategories}</span>
      </div>
    </div>
  );
};

export default Dashboard;
