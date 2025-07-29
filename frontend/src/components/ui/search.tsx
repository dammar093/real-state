import React from "react";
import Button from "./button";
import Input from "./input";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="w-full md:w-1/2 mx-auto">
      <form action="">
        <div
          className="flex items-center border border-gray-300  md:py-1 px-1 md:px-2 rounded-full shadow-sm bg-white/50 relative"
          role="input"
          tabIndex={0}
        >
          {/* <select
            name="location"
            id=""
            className="border-none outline-none bg-transparent text-[var(--primary-color)]  font-medium mr-2"
          >
            <option value="">Select Location</option>
            <option value="new-york">New York</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
          </select>
          <span className="text-[var(--primary-color)] font-medium mr-2">
            |
          </span> */}
          <Input
            placeholder="Search..."
            className="pr-11 md:pr-23 placeholder:-text-[12px] md:placeholder:text-[16px]"
          />
          <Button
            type="submit"
            className="absolute flex items-center justify-center right-2 top-1/2 transform -translate-y-1/2 w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full"
          >
            <FiSearch size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
