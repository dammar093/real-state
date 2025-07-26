import React from "react";

const GoogleMap = () => {
  return (
    <div className="w-full h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d882.9006268498272!2d85.30826862530103!3d27.72955657596352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19003fea9d41%3A0xbd624c5e52750a30!2shotel%20bigbull!5e0!3m2!1sen!2snp!4v1753523368955!5m2!1sen!2snp"
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
