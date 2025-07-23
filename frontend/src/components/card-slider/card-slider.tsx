import React from "react";
import CategoryCard from "../category/category-card/category-card";
import SliderLayout from "../slider-layout/slider-layout";

const CardSlider = () => {
  return (
    <>
      <SliderLayout title="Explore Property Types" link="category">
        <CategoryCard
          image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
          id={1}
          name="Rooms"
        />
        <CategoryCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          name="Flats"
        />
        <CategoryCard
          image="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
          id={3}
          name="Houses"
        />
        <CategoryCard
          image="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg"
          id={4}
          name="Shops"
        />
      </SliderLayout>
    </>
  );
};

export default CardSlider;
