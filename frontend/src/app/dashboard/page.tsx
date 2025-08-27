"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiBookCover } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";
import { decodeToken } from "@/utils/utils";
import { getPropertiesByUserId } from "@/api/property/property";
import Loader from "@/components/loader/loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [totalProperties, setTotalProperties] = useState(0);
  const [_, setError] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decodeToken(token as string);
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await getPropertiesByUserId(decoded?.id as number);
        console.log(response.data, "sdfnsdfjilk.");
        setTotalProperties(response?.data?.length || 0);
      } catch (error) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
          <span className="text-gray-900 font-semibold">{0}</span>
        </div>
      </Link>

      <div className="p-4 bg-white shadow rounded bg-gradient-to-tr from-green-400 to-blue-500">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FaSackDollar className="text-2xl" />
          <span>Earning</span>
        </h3>
        <span className="text-gray-900 font-semibold">{0}</span>
      </div>
    </div>
  );
};

export default Dashboard;
