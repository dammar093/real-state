"use client";
import React, { useState, useRef } from "react";
import Table from "@/components/table/table";
import useProperties from "@/hooks/useProperties";
import Input from "@/components/ui/input";
import Loader from "@/components/loader/loader";
import Button from "@/components/ui/button";

const Properties = () => {
  const {
    properties,
    loading,
    error,
    page,
    total,
    setSearchTerm,
    setCurrentPage,
  } = useProperties();

  // Local input state
  const [term, setTerm] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Input typing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
  };

  // Button click (immediate search)
  const handleSearchClick = () => {
    setSearchTerm(term);
  };

  // Table columns
  const columns = [
    { title: "Title", selector: (row: any) => row.title },
    { title: "Price", selector: (row: any) => `$${row.price}` },
    { title: "Location", selector: (row: any) => row.location },
    { title: "Type", selector: (row: any) => row.type },
    { title: "Category", selector: (row: any) => row.category?.name || "-" },
    { title: "User", selector: (row: any) => row.user?.fullName || "-" },
  ];

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-10">
      {/* Search Input + Button */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search properties..."
            value={term}
            onChange={handleSearchChange}
            className="border p-2 rounded !text-sm !h-full text-white !w-[200px] !placeholder:text-sm"
          />
          <Button
            onClick={handleSearchClick}
            className="px-4 py-1  bg-blue-500 hover:bg-blue-600 text-white rounded h-fit"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={properties} />

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(page - 1)}
        >
          Prev
        </button>
        <span className="text-white">
          Page {page} of {Math.ceil(total / 10)}
        </span>
        <button
          disabled={page * 10 >= total}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Properties;
