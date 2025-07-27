"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Button from "../ui/button";

const PropertySlider = () => {
  const [index, setIndex] = useState(0);

  const sliderItems = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/8031934/pexels-photo-8031934.jpeg",
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg",
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/11899139/pexels-photo-11899139.jpeg",
    },
  ];

  const handleForward = () => {
    setIndex((prev) => (prev + 1) % sliderItems.length);
  };

  const handleBackward = () => {
    setIndex((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mt-3 aspect-video relative rounded overflow-hidden">
      {/* Mobile: Swipeable slider */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {sliderItems.map((item) => (
          <div key={item.id} className="min-w-full h-full snap-center shrink-1">
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
      {/* Desktop & Tablet: Controlled Slider */}
      <div
        className="hidden md:flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {sliderItems.map((item) => (
          <div key={item.id} className="min-w-full h-full flex-shrink-0">
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
