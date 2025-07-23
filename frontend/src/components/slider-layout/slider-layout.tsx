import React, { FC } from "react";
import Link from "next/link";
import { GrFormPrevious } from "react-icons/gr";
import Button from "../ui/button";
import { MdOutlineNavigateNext } from "react-icons/md";

interface CardSliderProps {
  link: string;
  title: string;
  children?: React.ReactNode;
}

const SliderLayout: FC<CardSliderProps> = ({ link, title, children }) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-2 justify-between">
            <Link
              href={link}
              className="text-[var(--primary-color)] text-3xl md:text-2xl lg:text-3xl font-semibold capitalize"
            >
              <div className="flex gap-2 items-center">
                <span>{title}</span>
                <span>
                  <MdOutlineNavigateNext />
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                className="rounded-full w-[40px] h-[40px] p-0 flex items-center justify-center"
              >
                <GrFormPrevious size={28} />
              </Button>
              <Button
                type="button"
                className="rounded-full w-[40px] h-[40px] p-0 flex items-center justify-center"
              >
                <MdOutlineNavigateNext size={28} />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default SliderLayout;
