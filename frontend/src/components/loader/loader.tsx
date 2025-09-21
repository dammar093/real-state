import React from "react";
import { Spin } from "antd";
const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spin />
    </div>
  );
};

export default Loader;
