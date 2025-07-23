import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./property.module.css";
import Badge from "../badge/badege";

interface PropertyCradProps {
  id: number;
  category: string;
  image: string;
  badgeTitle: string;
}

const PropertyCrad: React.FC<PropertyCradProps> = ({
  id,
  category,
  image,
  badgeTitle,
}) => {
  return (
    <div className="w-full">
      <Link href={`/properties/rooms/1`} className="d-block">
        <div>
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
            <div className="w-fit h-fit absolute top-1 right-1">
              <Badge title={badgeTitle} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCrad;
