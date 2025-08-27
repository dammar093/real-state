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
import Loader from "@/components/loader/loader";

const PropertyPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await getPropertyById(id);
        setProperty(data.data ?? null);
      } catch (error) {
        console.error("Error fetching property:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <Loader />;

  if (!property)
    return (
      <p className="text-center text-gray-500 mt-10">Property not found.</p>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5">
      {/* Property gallery */}
      {property.images?.length > 0 && (
        <PropertySlider images={property.images} />
      )}

      {/* Detail title and location */}
      <div className="flex flex-col gap-1">
        <span className="capitalize font-medium text-[var(--primary-color)]">
          For {property.type}
        </span>
        <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-800">
          <span className="capitalize">{property.category?.name}</span> in{" "}
          <span className="capitalize">{property.location}</span>
        </h3>
        <div className="flex items-center gap-2 flex-wrap text-sm sm:text-base text-gray-600 mt-1">
          <div>
            Rs.{property.price} for {property.duration}{" "}
            <span className="capitalize">
              {property.durationType?.toLowerCase()}
            </span>
          </div>
          <LuDot size={10} />
          <div className="flex items-center gap-1">
            <GoStarFill size={12} className="text-slate-600" />
            <span>5.0</span>
          </div>
        </div>
      </div>

      {/* Owner */}
      {property.user && <Owner owner={property.user as User} />}

      {/* Services */}
      {property.Services?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {property.Services.map((service) => (
            <span
              key={service}
              className="flex items-center gap-2 px-2 py-1 bg-gray-900/90 rounded-full text-white text-sm"
            >
              {service}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {property.description && (
        <article className="text-[14px] sm:text-[15px] text-slate-600 text-justify">
          {property.description}
        </article>
      )}

      {/* Google Map */}
      {property.map && <GoogleMap map={property.map} />}
    </div>
  );
};

export default PropertyPage;
