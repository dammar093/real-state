"use client";
import CardSlider from "@/components/card-slider/card-slider";
import Slider from "@/components/layout/slider/slider";
import useCategories from "@/hooks/useCategories";
import React from "react";
const Home = () => {
  const { categories } = useCategories();
  return (
    <div className="w-full flex flex-col gap-10">
      <Slider />
      {categories.map((category) => (
        <CardSlider
          key={category.id}
          title={`Explore ${category.name}`}
          link={`/properties/${category?.name?.toLocaleLowerCase()}`}
          category={category?.name}
        />
      ))}
    </div>
  );
};

export default Home;
