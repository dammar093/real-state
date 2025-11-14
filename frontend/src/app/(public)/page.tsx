import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const Home = dynamic(() => import("./_components"));

const HomePage = () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

export default HomePage;
