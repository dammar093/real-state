"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FormInstance, Input, message } from "antd";

// Fix default icon issue in Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type LatLng = [number, number];

interface MapSearchProps {
  form: FormInstance<any>;
}

const ChangeMapView = ({ center, zoom }: { center: LatLng; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapSearch: React.FC<MapSearchProps> = ({ form }) => {
  const initialLat = form.getFieldValue("latitude") ?? 27.7172;
  const initialLon = form.getFieldValue("longitude") ?? 85.324;

  const [position, setPosition] = useState<LatLng>([initialLat, initialLon]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [popupText, setPopupText] = useState<string>(
    `Lat: ${initialLat}, Lon: ${initialLon}`
  );
  const [zoom, setZoom] = useState(6); // default zoom = 6

  // Update map when form values change (for editing)
  useEffect(() => {
    const lat = form.getFieldValue("latitude");
    const lon = form.getFieldValue("longitude");
    if (lat && lon) {
      setPosition([lat, lon]);
      setPopupText(`Lat: ${lat}, Lon: ${lon}`);
    }
  }, [form.getFieldValue("latitude"), form.getFieldValue("longitude")]);

  // Update form when position changes
  useEffect(() => {
    form.setFieldsValue({ latitude: position[0], longitude: position[1] });
  }, [position, form]);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setPopupText(`Lat: ${lat}, Lon: ${lng}`);
        setZoom(10); // zoom in on click too
      },
    });
    return null;
  };

  const handleSearch = async () => {
    if (!searchValue) return message.error("Please enter a location!");

    // Check if coordinates
    const coords = searchValue.split(",").map((s) => s.trim());
    if (
      coords.length === 2 &&
      !isNaN(Number(coords[0])) &&
      !isNaN(Number(coords[1]))
    ) {
      const lat = parseFloat(coords[0]);
      const lon = parseFloat(coords[1]);
      setPosition([lat, lon]);
      setPopupText(`Lat: ${lat}, Lon: ${lon}`);
      setZoom(10); // zoom when searched
      return;
    }

    // Use Nominatim API
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
      setPosition([lat, lon]);
      setPopupText(`${searchValue} (Lat: ${lat}, Lon: ${lon})`);
      setZoom(10); // zoom when searched
    } catch (error) {
      console.error(error);
      message.error("Error fetching location");
    }
  };

  return (
    <div>
      <h2>Search Location</h2>
      <Input.Search
        value={searchValue}
        placeholder="Enter location or coordinates"
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        enterButton
        style={{ maxWidth: 400, marginBottom: 10 }}
      />

      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>{popupText}</Popup>
        </Marker>
        <MapClickHandler />
        <ChangeMapView center={position} zoom={zoom} />
      </MapContainer>
    </div>
  );
};

export default MapSearch;
