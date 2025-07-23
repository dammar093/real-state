import CardSlider from "@/components/card-slider/card-slider";
import Slider from "@/components/layout/slider/slider";
import React from "react";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <Slider />
      <CardSlider
        title="Explore Rooms"
        link="/properties/rooms"
        category="rooms"
      />
      <CardSlider
        title="Explore Vilas"
        link="/properties/vilas"
        category="vilas"
      />
      <CardSlider
        title="Explore Houses"
        link="/properties/houses"
        category="houses"
      />
      <CardSlider
        title="Explore flats"
        link="/properties/flats"
        category="flats"
      />
    </div>
  );
};

export default Home;
