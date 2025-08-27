"use client";
import React, { FC, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { GrFormPrevious } from "react-icons/gr";
import Button from "../ui/button";
import { MdOutlineNavigateNext } from "react-icons/md";

interface CardSliderProps {
  link: string;
  title: string;
  children?: React.ReactNode;
}

const SLIDE_AMOUNT = 300;

const SliderLayout: FC<CardSliderProps> = ({ link, title, children }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateScrollState = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    setIsAtStart(slider.scrollLeft === 0);
    setIsAtEnd(
      slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5
    );
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollState();
    slider.addEventListener("scroll", updateScrollState);
    return () => slider.removeEventListener("scroll", updateScrollState);
  }, []);

  const handlePrev = () => {
    sliderRef.current?.scrollBy({ left: -SLIDE_AMOUNT, behavior: "smooth" });
  };

  const handleNext = () => {
    sliderRef.current?.scrollBy({ left: SLIDE_AMOUNT, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={link}
          className="text-[var(--primary-color)] text-3xl md:text-2xl lg:text-3xl font-semibold capitalize"
        >
          <div className="flex items-center gap-1">
            <span>{title}</span>
            <MdOutlineNavigateNext />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            disabled={isAtStart}
            className={`rounded-full w-[40px] h-[40px] flex items-center justify-center p-0 ${
              isAtStart ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
          >
            <GrFormPrevious size={28} />
          </Button>

          <Button
            type="button"
            disabled={isAtEnd}
            className={`rounded-full w-[40px] h-[40px] flex items-center justify-center p-0 ${
              isAtEnd ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
          >
            <MdOutlineNavigateNext size={28} />
          </Button>
        </div>
      </div>

      {/* FLEX container with horizontal scroll */}
      <div
        ref={sliderRef}
        className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide "
      >
        {children}
      </div>
    </div>
  );
};

export default SliderLayout;
