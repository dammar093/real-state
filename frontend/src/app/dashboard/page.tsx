"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiBookCover } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";
import { decodeToken } from "@/utils/utils";
import { getPropertiesByUserId } from "@/api/property";
import Loader from "@/components/loader/loader";
import { api } from "@/api/api";
import { BookingItem } from "@/types/booking";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [totalProperties, setTotalProperties] = useState(0);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
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
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/booking/owner");
        console.log(res.data);
        setBookings(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch owner bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  });

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
          <span className="text-gray-900 font-semibold">
            {bookings?.length}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
