import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./property.module.css";

interface PropertyCradProps {
  id: number;
  category: string;
  image: string;
}

const PropertyCrad: React.FC<PropertyCradProps> = ({ id, category, image }) => {
  return (
    <div className="w-full">
      <Link href={`/properties/rooms/1`} className="d-block">
        <div
          className={`aspect-square relative  ${styles["category-card"]} overflow-hidden rounded-lg`}
        >
          <Image
            src={image}
            alt={category}
            width={1080}
            height={720}
            className={`w-full h-full object-cover  ${styles.img}`}
          />
          <div
            className={`absolute w-full h-full flex items-center  justify-center bg-opacity-5 ${styles["caregory-overlay"]} overflow-hidden`}
          >
            <div className="boderder-white border-2 border-white p-4 rounded-lg h-full w-full flex items-center justify-center">
              <h3 className="text-lg font-semibold text-white capitalize">
                {category}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCrad;
