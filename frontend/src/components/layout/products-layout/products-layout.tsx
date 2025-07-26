import React from "react";
import { IoFilter } from "react-icons/io5";

const ProducsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="pt-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl fw-bold text-slate-800">
              Available{" "}
              <span className="capitalise text-[var(--primary-color)]">
                Rooms
              </span>
            </h2>
          </div>
          <div className="w-fit p-0.5 md:p-1 rounded text-slate-700 flex gap-2 items-center border">
            <select
              className="focus:none outline-0 border-0 text-[14px] md:text-lg"
              name=""
              id=""
            >
              <option value="des">Price High to Low</option>
              <option value="asc">Price Low to High</option>
            </select>
            <IoFilter size={25} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default ProducsLayout;
