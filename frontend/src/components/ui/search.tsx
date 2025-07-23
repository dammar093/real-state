import React from "react";
import Button from "./button";
import Input from "./input";

const Search = () => {
  return (
    <div className="w-[60%] mx-auto ">
      <form action="">
        <div className="flex items-center border border-gray-300  p-1 px-2 rounded-full shadow-sm bg-white/50 relative">
          <select
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
          </span>
          <Input placeholder="Search..." className="pr-23" />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2  px-3 py-2"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
