import React from "react";

const GoogleMap = ({ map }: { map: string }) => {
  return (
    <div className="w-full h-[400px]">
      <iframe
        src={`https://www.google.com/maps/embed?pb=${map}`}
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
