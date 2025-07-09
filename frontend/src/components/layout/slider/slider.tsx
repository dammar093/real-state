"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import style from "./slider.module.css";

const Slider = () => {
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
    <section
      className={`w-full h-[400px] md:h-[400px] flex items-center relative  rounded overflow-hidden ${style.slider}`}
    >
      {/* Slider Track */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {sliderItems.map((item) => (
          <div key={item.id} className="min-w-full h-full flex-shrink-0">
            <Image
              width={100}
              height={100}
              className="w-full h-full object-cover"
              src={item.image}
              alt="slider image"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Back Arrow */}
      <div
        className="hidden md:flex items-center justify-center text-gray-600 text-2xl cursor-pointer bg-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white p-2 rounded-full absolute left-2 z-10 transition-all"
        onClick={handleBackward}
      >
        <MdOutlineArrowBackIos />
      </div>

      {/* Forward Arrow */}
      <div
        className="hidden md:flex items-center justify-center text-gray-600 text-2xl cursor-pointer bg-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white p-2 rounded-full absolute right-2 z-10 transition-all"
        onClick={handleForward}
      >
        <MdOutlineArrowForwardIos />
      </div>
      <div className="absolute left-[10%] z-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl">
            <h1>Comfortable stays made simple book your perfect room today.</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
