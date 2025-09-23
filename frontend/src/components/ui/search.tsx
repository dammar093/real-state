"use client";

import React from "react";
import { Button, Input, message } from "antd";
import { BiSearch } from "react-icons/bi";

const { Search } = Input;

const SearchBar: React.FC = () => {
  const onSearch = (value: string) => {
    if (value.trim()) {
      message.success(`Searching for: ${value}`);
      // 🔑 here you can call API or filter table
      console.log("Search query:", value);
    } else {
      message.warning("Please enter a search term");
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto">
      <Search
        placeholder="Search..."
        allowClear
        enterButton={
          <Button
            type="primary"
            style={{ backgroundColor: "#800000", borderColor: "#800000" }}
          >
            <BiSearch />
          </Button>
        }
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
};

export default SearchBar;
