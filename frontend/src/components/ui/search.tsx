"use client";

import React from "react";
import { Button, Input } from "antd";
import { BiSearch } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";

const { Search } = Input;

const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("query", value.trim());
    } else {
      params.delete("query");
    }

    // Push new URL with updated search param
    router.push(`/search?${params.toString()}`);
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
