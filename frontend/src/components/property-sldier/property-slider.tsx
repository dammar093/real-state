"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Button from "../ui/button";

const PropertySlider = ({
  images,
}: {
  images: { image: string; id: number }[];
}) => {
  const [index, setIndex] = useState(0);

  const handleForward = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handleBackward = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images?.length]);

  return (
    <section className="w-full mt-3 aspect-video relative rounded overflow-hidden">
      {/* Mobile: Swipeable slider */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {images?.map((item) => (
          <div
            key={item?.id}
            className="min-w-full h-full snap-center shrink-1"
          >
            <Image
              width={1080}
              height={720}
              className="w-full h-full object-cover"
              src={item?.image}
              loading="lazy"
              alt="slider image"
            />
          </div>
        ))}
      </div>
      {/* Desktop & Tablet: Controlled Slider */}
      <div
        className="hidden md:flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images?.map((item) => (
          <div key={item?.id} className="min-w-full h-full flex-shrink-0">
            <Image
              width={1080}
              height={720}
              className="w-full h-full object-cover"
              src={item.image}
              loading="lazy"
              alt="slider image"
            />
          </div>
        ))}
      </div>

      {/* Back Arrow */}
      <Button
        className="hidden md:flex items-center justify-center text-white text-2xl  p-2 rounded-full absolute top-1/2 left-2 z-20 transition-all"
        onClick={handleBackward}
      >
        <MdOutlineArrowBackIos />
      </Button>

      {/* Forward Arrow */}
      <Button
        className="hidden md:flex items-center justify-center text-white text-2xl p-2 top-1/2 rounded-full absolute right-2 z-20 transition-all"
        onClick={handleForward}
      >
        <MdOutlineArrowForwardIos />
      </Button>
    </section>
  );
};

export default PropertySlider;
