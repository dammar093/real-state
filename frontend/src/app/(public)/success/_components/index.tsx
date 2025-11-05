"use client";

import bookingAPI from "@/api/booking";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [decodedData, setDecodedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const dataParam = searchParams.get("data");
      if (dataParam) {
        const decoded = JSON.parse(atob(dataParam));
        setDecodedData(decoded);

        // Create booking
        bookingAPI.createBooking({
          transaction_uuid: decoded.transaction_uuid,
          total_amount: decoded.total_amount,
        });

        setLoading(false);

        // Redirect after 4 seconds
        const timer = setTimeout(() => {
          router.push("/my-booking");
        }, 4000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Error decoding data:", error);
      setLoading(false);
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-green-200"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="flex justify-center mb-5"
        >
          <CheckCircle2 className="text-green-600 w-16 h-16" />
        </motion.div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment was processed successfully.
        </p>

        {loading ? (
          <p className="text-gray-500">Processing your payment...</p>
        ) : decodedData ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-left">
            <p className="mb-2">
              <strong>Transaction UUID:</strong>{" "}
              <span className="text-gray-700">
                {decodedData.transaction_uuid}
              </span>
            </p>
            <p className="mb-2">
              <strong>Amount:</strong>{" "}
              <span className="text-gray-700">{decodedData.total_amount}</span>
            </p>
            <p className="mb-2">
              <strong>Product Code:</strong>{" "}
              <span className="text-gray-700">{decodedData.product_code}</span>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-medium">
                {decodedData.status || "SUCCESS"}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No payment data found.</p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-6 text-gray-500 text-sm"
        >
          Redirecting to <span className="font-semibold">My Booking</span>{" "}
          page...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Success;
