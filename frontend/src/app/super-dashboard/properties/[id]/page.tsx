"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GoStarFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { getPropertyById } from "@/api/property/property";
import Link from "next/link";
import { Property } from "@/types/property";
import { getTimeSince } from "@/utils/utils";

const PropertyPage = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  return (
    <div className="text-white rounded-lg shadow-md flex flex-col gap-6 mt-10">
      {/* Image Gallery */}
      <div className="flex overflow-x-auto gap-2">
        {property?.images?.map((img) => (
          <div
            key={img.id}
            className="flex-shrink-0 w-64 h-40 relative rounded-md overflow-hidden"
          >
            <Image
              src={img.image}
              alt="property"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Property Info */}
      <div>
        <span className="capitalize font-medium text-blue-400">
          For {property?.type}
        </span>
        <h3 className="text-xl font-semibold mt-1 text-white">
          <span className="capitalize">{property?.category?.name}</span> in{" "}
          <span className="capitalize">{property?.location}</span>
        </h3>
        <div className="flex items-center gap-2 mt-1 text-white">
          <span>
            Rs.{property?.price} for {property?.duration}{" "}
            <span className="capitalize">
              {property?.durationType?.toLowerCase()}
            </span>
          </span>
          <LuDot size={10} />
          <div className="flex items-center gap-1">
            <GoStarFill size={14} className="text-yellow-500" />
            <span>5.0</span>
          </div>
        </div>
      </div>

      {/* Owner Info */}
      {property?.user && (
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={
                  property.user.userDetail?.profile?.image ||
                  "/assests/user.png"
                }
                alt="owner"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-white">
                {property.user.fullName}
              </h4>
              <p className="text-sm text-gray-300">
                Member for {getTimeSince(new Date(property.user.createdAt))}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {property.user.userDetail?.phoneNumber && (
                  <Link
                    href={`https://wa.me/${property.user.userDetail.phoneNumber}`}
                    target="_blank"
                  >
                    <FaWhatsapp className="text-green-500" />
                  </Link>
                )}
                {property.user.userDetail?.facebook && (
                  <Link
                    href={`https://www.facebook.com/${property.user.userDetail.facebook}`}
                    target="_blank"
                  >
                    <FaFacebook className="text-blue-500" />
                  </Link>
                )}
                {property.user.userDetail?.instagram && (
                  <Link
                    href={`https://www.instagram.com/${property.user.userDetail.instagram}`}
                    target="_blank"
                  >
                    <FaInstagram className="text-pink-500" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services */}
      <div className="flex flex-wrap gap-2">
        {property?.Services &&
          property?.Services?.map((service) => (
            <div
              key={service}
              className="flex items-center gap-2 px-3 py-1 bg-white/30 rounded-full shadow-sm text-white"
            >
              <span className="text-sm">{service}</span>
            </div>
          ))}
        {/* Add other services here in similar divs */}
      </div>

      {/* Description */}
      {property?.description && (
        <article className="text-white text-justify">
          {property.description}
        </article>
      )}

      {/* Google Map */}
      {property?.map && (
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed?pb=${property?.map}`}
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
