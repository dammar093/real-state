import CategoryLayout from "@/components/category/category-layout/category-layout";
import Slider from "@/components/layout/slider/slider";
import React from "react";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <Slider />
      <CategoryLayout />
    </div>
  );
};

export default Home;
