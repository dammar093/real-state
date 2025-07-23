import CardSlider from "@/components/card-slider/card-slider";
import Slider from "@/components/layout/slider/slider";
import React from "react";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <Slider />
      <CardSlider />
    </div>
  );
};

export default Home;
