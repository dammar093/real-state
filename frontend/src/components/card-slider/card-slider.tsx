import React from "react";
import SliderLayout from "../slider-layout/slider-layout";
import PropertyCard from "../property/property-card";

const CardSlider = ({
  title,
  link,
  category,
}: {
  title: string;
  link: string;
  category: string;
}) => {
  return (
    <>
      <SliderLayout title={title} link={link}>
        <PropertyCard
          image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
          id={1}
          category={category}
        />
        <PropertyCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          category={category}
        />
        <PropertyCard
          image="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
          id={3}
          category={category}
        />
        <PropertyCard
          image="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg"
          id={4}
          category={category}
        />
      </SliderLayout>
    </>
  );
};

export default CardSlider;
