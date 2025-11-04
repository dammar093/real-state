import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const Success = dynamic(() => import("./_components"));

const SuccessPage = () => {
  return (
    <Suspense fallback={null}>
      <Success />
    </Suspense>
  );
};

export default SuccessPage;
