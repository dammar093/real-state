import React from "react";
import CategoryCard from "../category-card/category-card";
import Link from "next/link";

const CategoryLayout = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-start flex-wrap gap-5">
        <div>
          <h2 className="text-[var(--primary-color)] text-3xl md:text-2xl lg:text-3xl font-semibold capitalize">
            Propery Type
          </h2>
        </div>
        <div>
          <Link
            href={""}
            className="px-4 py-2 bg-[var(--primary-color)] rounded-full text-white font-medium capitalize"
          >
            View More
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
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
      </div>
    </div>
  );
};

export default CategoryLayout;
