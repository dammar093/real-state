"use client";

import { getPropertiesByCategory } from "@/api/property";
import ProducsLayout from "@/components/layout/products-layout/products-layout";
import PropertyCard from "@/components/property/property-card";
import { PropertyItem } from "@/types/property";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const PropertiesPage = () => {
  const [properties, setProperties] = React.useState<PropertyItem[]>([]);
  const params = useParams<{ name: string }>();
  const { name } = params;
  useEffect(() => {
    // Simulate fetching property data
    const fetchProperty = async () => {
      try {
        const data = await getPropertiesByCategory(name);
        setProperties(data.data?.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperty();
  }, [name]);
  return (
    <div>
      <ProducsLayout category={name}>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            category={property.category?.name || ""}
            image={property?.images[0]?.image || ""}
            badgeTitle={property?.type || ""}
            title={property.title}
            location={property.location}
            price={property.price}
            duration={property.duration}
            durationType={property.durationType}
          />
        ))}
      </ProducsLayout>
    </div>
  );
};

export default PropertiesPage;
