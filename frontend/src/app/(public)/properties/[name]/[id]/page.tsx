"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertySlider from "@/components/property-sldier/property-slider";
import Owner from "@/components/owner/owner";
import { GoStarFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import GoogleMap from "@/components/google-map/google-map";
import { Property, User } from "@/types/property";
import { getPropertyById } from "@/api/property/property";

const PropertyPage = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        console.log(data.data);
        setProperty(data.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-5">
        {/* property gallery */}
        <PropertySlider
          images={property?.images as { image: string; id: number }[]}
        />
        {/* detail title and location */}
        <div>
          <div>
            <span className="capitalize font-medium text-[var(--primary-color)]">
              For {property?.type}
            </span>
            <h3 className="text-md md:text-lg font-medium text-gray-800">
              <span className="capitalize">{property?.category?.name} </span>in{" "}
              <span className="capitalize">{property?.location}</span>
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-gray-600 font-normal text-sm">
              Rs.{property?.price} for {property?.duration}
              <span className="capitalize">
                {" "}
                {property?.durationType?.toLowerCase()}
              </span>
            </div>
            <LuDot className="text-gray-600" size={10} />
            <div className="flex gap-1 items-center">
              <GoStarFill size={10} className="text-slate-600" />
              <span className="text-gray-600 text-sm">5.0</span>
            </div>
          </div>
        </div>
        <Owner owner={property?.user as User} />
        {/* services */}
        <div className="service">
          <div className="text-slate-800 font-medium flex flex-wrap gap-2">
            {property?.Services &&
              property?.Services?.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-900/90 rounded-full shadow-sm text-white"
                >
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            {/* ... other services ... */}
          </div>
        </div>
        {/* description */}
        <article className="text-[14px] text-slate-600 text-justify">
          {property?.description}
        </article>
        {/* google map */}
        <GoogleMap map={property?.map as string} />
      </div>
    </React.Fragment>
  );
};

export default PropertyPage;
