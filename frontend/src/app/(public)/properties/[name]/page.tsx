"use client";

import ProducsLayout from "@/components/layout/products-layout/products-layout";
import PropertyCard from "@/components/property/property-card";
import React, { useEffect } from "react";

const Property = () => {
  useEffect(() => {
    // Simulate fetching property data
    const fetchProperty = async () => {};

    fetchProperty();
  }, []);
  return (
    <div>
      <ProducsLayout>
        <PropertyCard
          id={1}
          category="apartment"
          image="/images/properties/property-1.jpg"
          badgeTitle="For Rent"
          title="Modern Apartment in City Center"
          location="New York, NY"
          price={2500}
          duration={1}
          durationType="month"
        />
        <PropertyCard
          id={2}
          category="house"
          image="/images/properties/property-2.jpg"
          badgeTitle="For Sale"
          title="Cozy Family House"
          location="Los Angeles, CA"
          price={750000}
          duration={0}
          durationType=""
        />
        <PropertyCard
          id={3}
          category="villa"
          image="/images/properties/property-3.jpg"
          badgeTitle="For Rent"
          title="Luxury Villa with Sea View"
          location="Miami, FL"
          price={5000}
          duration={1}
          durationType="month"
        />
        <PropertyCard
          id={4}
          category="condo"
          image="/images/properties/property-4.jpg"
          badgeTitle="For Sale"
          title="Downtown Condo with Amenities"
          location="Chicago, IL"
          price={450000}
          duration={0}
          durationType=""
        />
        <PropertyCard
          id={5}
          category="townhouse"
          image="/images/properties/property-5.jpg"
          badgeTitle="For Rent"
          title="Spacious Townhouse in Suburbs"
          location="Austin, TX"
          price={1800}
          duration={1}
          durationType="month"
        />
        <PropertyCard
          id={6}
          category="cottage"
          image="/images/properties/property-6.jpg"
          badgeTitle="For Sale"
          title="Charming Cottage in the Countryside"
          location="Nashville, TN"
          price={320000}
          duration={0}
          durationType=""
        />
      </ProducsLayout>
    </div>
  );
};

export default Property;
