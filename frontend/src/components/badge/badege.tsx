import React from "react";

const Badge = ({ title }: { title: string }) => {
  return (
    <div className="px-2.5 py-[2px] rounded-full bg-white/30">
      <span className="capitalize text-sm font-bold text-[var(--primary-color)]">
        {title}
      </span>
    </div>
  );
};

export default Badge;
