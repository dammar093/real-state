"use client";

import Link from "next/link";
import React from "react";

const Property = () => {
  return (
    <div>
      <Link href={"/properties/rooms/1"}>Product 1</Link>
    </div>
  );
};

export default Property;
