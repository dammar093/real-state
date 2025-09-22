import React, { Suspense } from "react";
import VerifyOTP from "./_components";

const VerifyOTPPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTP />
    </Suspense>
  );
};

export default VerifyOTPPage;
