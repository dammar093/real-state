"use client";
import dynamic from "next/dynamic";
const Profile = dynamic(() => import("./_components"));
import React, { Suspense } from "react";

const PropfilePage = () => {
  return (
    <Suspense fallback={null}>
      <Profile />
    </Suspense>
  );
};

export default PropfilePage;
