"use client";

import React, { useEffect, useState } from "react";
import { Card, Tag, Spin, Empty } from "antd";
import Image from "next/image";
import { api } from "@/api/api";
import { BookingItem } from "@/types/booking";
import { useRouter } from "next/navigation";
import useAuthUser from "@/hooks/useAuth";

export default function MyBooking() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthUser();
  const router = useRouter();
  if (!user) {
    router.push("/sign-in");
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/booking/user");
        console.log(res?.data);
        setBookings(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );

  if (!bookings.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Empty description="No bookings found" />
      </div>
    );

  return (
    <section className="px-4 py-10 md:px-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div key={booking?.id}>
            <Card
              hoverable
              className="rounded-2xl overflow-hidden shadow-md"
              cover={
                <Image
                  src={booking?.property?.images[0].image}
                  alt={booking?.property?.title}
                  width={400}
                  height={250}
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
              }
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {booking.property?.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {booking.property?.location}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <Tag color={booking?.status === "SUCCESS" ? "green" : "red"}>
                    {booking?.status}
                  </Tag>
                  <Tag color="blue">{booking?.paymentMethod}</Tag>
                </div>
                <p className="text-sm text-gray-600">
                  Amount: <strong>Rs.{booking?.amount}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Booked on: {new Date(booking?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
