"use cleint";
import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropertyItem } from "@/types/property";
const PropertySlider = ({ pr }: { pr: PropertyItem }) => {
  const router = useRouter();
  return (
    <Carousel arrows touchMove swipeToSlide infinite>
      {pr?.images?.map((img) => (
        <div
          key={img?.id}
          className="aspect-video rounded overflow-hidden"
          onClick={() => router.push(`/properties/${pr?.id}`)}
        >
          <Image
            src={img?.image}
            alt={pr?.title}
            width={1080}
            height={720}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default PropertySlider;
