import React, { Suspense } from "react";
import VerifyAccount from "./components";

const VerifyAccountPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccount />
    </Suspense>
  );
};

export default VerifyAccountPage;
