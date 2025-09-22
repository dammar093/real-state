"use client";
import React, { Suspense } from "react";
import Slider from "@/components/layout/slider/slider";
import CategoriesTab from "./Tabs";
import PropertyWrapper from "./Poperties";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"));
import { Spin } from "antd";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Hero Slider */}
      <Slider />
      {/* Categories in Tabs */}
      <CategoriesTab />
      <PropertyWrapper />
      <Suspense fallback={<Spin />}>
        <Map />
      </Suspense>
    </div>
  );
};

export default Home;
