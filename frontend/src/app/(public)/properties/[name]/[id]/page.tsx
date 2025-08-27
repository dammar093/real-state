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
  const params = useParams<{ id: string }>();
  const { id } = params || {};
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await getPropertyById(id);
        setProperty(data.data);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (!id || loading) return <Loader />; // Wait for client data

  if (!property)
    return (
      <p className="text-center text-gray-500 mt-10">Property not found.</p>
    );

  return (
    <div className="flex flex-col gap-5">
      {/* Property gallery */}
      {property.images?.length > 0 && (
        <PropertySlider images={property.images} />
      )}

      {/* Detail title and location */}
      <div>
        <span className="capitalize font-medium text-[var(--primary-color)]">
          For {property.type}
        </span>
        <h3 className="text-md md:text-lg font-medium text-gray-800">
          <span className="capitalize">{property.category?.name}</span> in{" "}
          <span className="capitalize">{property.location}</span>
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <div className="text-gray-600 font-normal text-sm">
            Rs.{property.price} for {property.duration}{" "}
            <span className="capitalize">
              {property.durationType?.toLowerCase()}
            </span>
          </div>
          <LuDot className="text-gray-600" size={10} />
          <div className="flex gap-1 items-center">
            <GoStarFill size={10} className="text-slate-600" />
            <span className="text-gray-600 text-sm">5.0</span>
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
              className="flex items-center gap-2 px-3 py-1 bg-gray-900/90 rounded-full shadow-sm text-white text-sm"
            >
              {service}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {property.description && (
        <article className="text-[14px] text-slate-600 text-justify">
          {property.description}
        </article>
      )}

      {/* Google Map */}
      {property.map && <GoogleMap map={property.map} />}
    </div>
  );
};

export default PropertyPage;
