// app/verify-otp/page.tsx
import React, { Suspense } from "react";
import ResetPassword from "./components";

const UpdatePasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
};

export default UpdatePasswordPage;
