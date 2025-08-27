import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./property.module.css";
import Badge from "../badge/badege";
import { GoStarFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";

interface PropertyCradProps {
  id: number;
  category: string;
  image: string;
  badgeTitle: string;
  title: string;
  location: string;
  price: number;
  duration: number;
  durationType: string;
}

const PropertyCard: React.FC<PropertyCradProps> = ({
  id,
  category,
  image,
  badgeTitle,
  title,
  location,
  price,
  duration,
  durationType,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <div
          className={`aspect-square relative  ${styles["category-card"]} overflow-hidden rounded-lg`}
        >
          <Link
            href={`/properties/${category}/${id}`}
            className="block h-full w-full"
          >
            <Image
              src={image}
              alt={title}
              width={1080}
              height={720}
              className={`w-full h-full object-cover  ${styles.img}`}
            />
          </Link>
          <div className="w-full h-fit absolute top-0 left-0 p-1 flex justify-between ">
            <Badge title={badgeTitle} />
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="z-100 hover:scale-110 cursor-pointer"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  fill: "rgba(0, 0, 0, 0.5)",
                  height: "24px",
                  width: "24px",
                  stroke: "var(--linaria-theme_palette-icon-primary-inverse)",
                  strokeWidth: 2,
                  overflow: "visible",
                }}
              >
                <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div>
          <div>
            <h3 className="text-md md:text-lg font-medium text-gray-800">
              <span className="capitalize">{category} </span>in{" "}
              <span className="capitalize">{location}</span>
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-gray-600 font-normal text-sm ">
              Rs.{price} for {duration}{" "}
              <span className="capitalize">
                {durationType.toLocaleLowerCase()}
              </span>
            </div>
            <div>
              <LuDot className="text-gray-600" size={10} />
            </div>
            <div className="flex gap-1 items-center">
              <GoStarFill size={10} className="text-slate-600" />
              <span className="text-gray-600 text-sm">5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
