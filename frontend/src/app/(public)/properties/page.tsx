"use client";
import React from "react";
import PropertyCard from "@/components/property/property-card";

const Properties = () => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
        <PropertyCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          category={"rooms"}
          badgeTitle="For rent"
          title="Cozy Room in Shared Apartment"
          location="New York, NY"
          price={800}
          duration={1}
          durationType="month"
        />
        <PropertyCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          category={"rooms"}
          badgeTitle="For rent"
          title="Cozy Room in Shared Apartment"
          location="New York, NY"
          price={800}
          duration={1}
          durationType="month"
        />
        <PropertyCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          category={"rooms"}
          badgeTitle="For rent"
          title="Cozy Room in Shared Apartment"
          location="New York, NY"
          price={800}
          duration={1}
          durationType="month"
        />

        <PropertyCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          category={"rooms"}
          badgeTitle="For rent"
          title="Cozy Room in Shared Apartment"
          location="New York, NY"
          price={800}
          duration={1}
          durationType="month"
        />
        <PropertyCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          category={"rooms"}
          badgeTitle="For rent"
          title="Cozy Room in Shared Apartment"
          location="New York, NY"
          price={800}
          duration={1}
          durationType="month"
        />
        <PropertyCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          category={"rooms"}
          badgeTitle="For rent"
          title="Cozy Room in Shared Apartment"
          location="New York, NY"
          price={800}
          duration={1}
          durationType="month"
        />
        <PropertyCard
          image="https://images.pexels.com/photos/6032283/pexels-photo-6032283.jpeg"
          id={2}
          category={"rooms"}
          badgeTitle="For rent"
          title="Cozy Room in Shared Apartment"
          location="New York, NY"
          price={800}
          duration={1}
          durationType="month"
        />
      </div>
    </>
  );
};

export default Properties;
