"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Success = () => {
  const searchParams = useSearchParams();
  const [decodedData, setDecodedData] = useState<any>(null);

  useEffect(() => {
    try {
      const dataParam = searchParams.get("data");
      if (dataParam) {
        const decoded = JSON.parse(atob(dataParam));
        setDecodedData(decoded);
        console.log("Decoded eSewa data:", decoded);
      }
    } catch (error) {
      console.error("Error decoding data:", error);
    }
  }, [searchParams]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-3">
        Payment Successful 🎉
      </h1>

      {decodedData ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left max-w-md mx-auto">
          <p>
            <strong>Transaction UUID:</strong> {decodedData.transaction_uuid}
          </p>
          <p>
            <strong>Amount:</strong> {decodedData.total_amount}
          </p>
          <p>
            <strong>Product Code:</strong> {decodedData.product_code}
          </p>
          <p>
            <strong>Status:</strong> {decodedData.status || "SUCCESS"}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Processing your payment data...</p>
      )}
    </div>
  );
};

export default Success;
