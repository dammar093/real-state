"use client";
import React, { useEffect } from "react";
import SliderLayout from "../slider-layout/slider-layout";
import PropertyCard from "../property/property-card";
import { getPropertiesByCategory } from "@/api/property/property";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  setCategoryLoading,
  setCategoryProperties,
  setCategoryError,
} from "@/redux/feature/propertyCategorySlice";

const CardSlider = ({
  title,
  link,
  category,
}: {
  title: string;
  link: string;
  category: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const categoryData = useSelector(
    (state: RootState) => state.propertyCategory.propertiesByCategory[category]
  );
  console.log(categoryData?.properties, "sdfds");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        dispatch(setCategoryLoading({ category, loading: true }));

        const data = await getPropertiesByCategory(category, {
          page: 1,
          limit: 10,
        });

        dispatch(
          setCategoryProperties({
            category,
            data: {
              properties: data?.data?.properties || [],
              total: data?.data?.pagination?.total || 0,
              page: data?.data?.pagination?.page || 1,
              limit: data?.data?.pagination?.limit || 10,
              loading: false,
              error: null,
            },
          })
        );
      } catch (err: any) {
        dispatch(
          setCategoryError({
            category,
            error: err.message || "Failed to fetch properties",
          })
        );
      }
    };

    fetchProperties();
  }, [category, dispatch]);

  if (!categoryData || categoryData.loading) return <p>Loading...</p>;
  if (categoryData.error) return <p>{categoryData.error}</p>;

  return (
    <SliderLayout title={title} link={link}>
      {categoryData.properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          image={property.images[0]?.image || "/placeholder.jpg"}
          category={property.category?.name || category}
          badgeTitle={property.type === "SELL" ? "For Sale" : "For Rent"}
          title={property?.title || "No Title"}
          location={property?.location || "Unknown Location"}
          price={property?.price || 0}
          duration={property?.duration || 0}
          durationType={property?.durationType || "N/A"}
        />
      ))}
    </SliderLayout>
  );
};

export default CardSlider;
