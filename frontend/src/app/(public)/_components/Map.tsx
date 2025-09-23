"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useProperties from "@/hooks/useProperties";
import { Button, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

// Fix default icon issue in Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ChangeMapView = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const Map: React.FC = () => {
  const { active, getActiveProperties } = useProperties();
  const [center, setCenter] = useState<[number, number]>([27.7172, 85.324]); // Default center (Kathmandu)
  const [zoom, setZoom] = useState(6); // default zoom = 6
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getActiveProperties();
  }, [getActiveProperties]);

  // Auto-center map to first property if available (still keep zoom = 6)
  useEffect(() => {
    if (active?.properties?.length) {
      const first = active.properties[0];
      if (first.latitude && first.longitude) {
        setCenter([first.latitude, first.longitude]);
      }
    }
  }, [active]);

  const handleSearch = async () => {
    if (!searchValue) return message.error("Please enter a location!");

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      searchValue
    )}`;
    try {
      const response = await fetch(url);
      const data: { lat: string; lon: string }[] = await response.json();
      if (!data || data.length === 0)
        return message.error("Location not found");

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setCenter([lat, lon]);
      setZoom(10); // zoom to 10 when searching
    } catch (error) {
      console.error(error);
      message.error("Error fetching location");
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Search Location</h2>
      <Input.Search
        value={searchValue}
        placeholder="Enter location (e.g., Kathmandu, Pokhara)"
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        enterButton={
          <Button
            type="primary"
            style={{ backgroundColor: "#800000", borderColor: "#800000" }}
          >
            <BiSearch />
          </Button>
        }
        style={{ maxWidth: 400, marginBottom: 10 }}
      />

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
        className="overflow-hidden"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Update map view when center/zoom changes */}
        <ChangeMapView center={center} zoom={zoom} />

        {/* Render all property markers */}
        {active?.properties?.map(
          (pr) =>
            pr.latitude &&
            pr.longitude && (
              <Marker key={pr.id} position={[pr.latitude, pr.longitude]}>
                <Popup>
                  <div className="w-30">
                    <Link href={`/properties/${pr?.id}`}>
                      <div className="aspect-video overflow-hidden rounded ">
                        <Image
                          src={pr?.images[0]?.image}
                          alt={pr?.title}
                          width={1080}
                          height={720}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <strong>{pr.title}</strong>
                    <br />
                    Rs. {pr.price}
                    <br />
                    {pr.duration} {pr.durationType}
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
