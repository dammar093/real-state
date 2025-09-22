"use client";
import React from "react";
import Slider from "@/components/layout/slider/slider";
import CategoriesTab from "./Tabs";
import PropertyWrapper from "./Poperties";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Hero Slider */}
      <Slider />
      {/* Categories in Tabs */}
      <CategoriesTab />
      <PropertyWrapper />
    </div>
  );
};

export default Home;
