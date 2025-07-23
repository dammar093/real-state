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
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -SLIDE_AMOUNT, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: SLIDE_AMOUNT, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 justify-between">
        <Link
          href={link}
          className="text-[var(--primary-color)] text-3xl md:text-2xl lg:text-3xl font-semibold capitalize"
        >
          <div className="flex items-center">
            <span>{title}</span>
            <span>
              <MdOutlineNavigateNext />
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            disabled={isAtStart}
            className={`rounded-full w-[40px] h-[40px] p-0 flex items-center justify-center ${
              isAtStart ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
          >
            <GrFormPrevious size={28} />
          </Button>
          <Button
            type="button"
            disabled={isAtEnd}
            className={`rounded-full w-[40px] h-[40px] p-0 flex items-center justify-center ${
              isAtEnd ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
          >
            <MdOutlineNavigateNext size={28} />
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {children}
      </div>
    </div>
  );
};

export default SliderLayout;
