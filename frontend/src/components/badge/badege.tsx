import React from "react";

const Badge = ({ title }: { title: string }) => {
  return (
    <div className="px-2.5 py-[2px] rounded-full bg-gray-50/80">
      <span className="capitalize text-[13px] font-medium text-gray-700">
        {title}
      </span>
    </div>
  );
};

export default Badge;
