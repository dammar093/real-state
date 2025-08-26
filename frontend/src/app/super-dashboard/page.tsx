"use client";
import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { GiMeepleGroup } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
      <Link href={"/super-dashboard/users"}>
        <div className="p-4 bg-white shadow rounded bg-gradient-to-tr from-purple-400 to-blue-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaUsers className="text-2xl" />
            <span>Users</span>
          </h3>
          <span className="text-gray-900 font-semibold">3000</span>
        </div>
      </Link>
      <Link href={"/super-dashboard/properties"}>
        <div className="p-4 bg-white shadow rounded bg-gradient-to-tr from-red-400 to-yellow-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MdMapsHomeWork className="text-2xl" />
            <span>Properties</span>
          </h3>
          <span className="text-gray-900 font-semibold">3000</span>
        </div>
      </Link>
      <Link href={"/super-dashboard/categories"}>
        <div className="p-4 bg-white shadow rounded bg-gradient-to-tr from-green-400 to-blue-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <GiMeepleGroup className="text-2xl" />
            <span>Categories</span>
          </h3>
          <span className="text-gray-900 font-semibold">3000</span>
        </div>
      </Link>
      <Link href={"/super-dashboard/earnings"}>
        <div className="p-4 bg-white shadow rounded bg-gradient-to-tr from-pink-400 to-yellow-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaSackDollar className="text-2xl" />
            <span>Earnings</span>
          </h3>
          <span className="text-gray-900 font-semibold">Rs. 3000</span>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
