import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const MyBooking = dynamic(() => import("./_components"));

const MyBookingPage = () => {
  return (
    <Suspense fallback={null}>
      <MyBooking />
    </Suspense>
  );
};

export default MyBookingPage;
