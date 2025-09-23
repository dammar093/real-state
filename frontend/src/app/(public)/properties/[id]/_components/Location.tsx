"use client";
import React from "react";

type MapProps = {
  lat: number;
  lon: number;
  zoom?: number;
  width?: string;
  height?: string;
};

const LocationMap: React.FC<MapProps> = ({ lat, lon, zoom = 14 }) => {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&z=${zoom}&output=embed`;

  return (
    <iframe
      className="w-full h-[200px] md:h-[400px]"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={mapUrl}
    />
  );
};

export default LocationMap;
