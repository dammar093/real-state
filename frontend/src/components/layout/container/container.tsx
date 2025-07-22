import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-6xl mx-auto gap-5 px-4 md:px-0">{children}</div>;
};

export default Container;
