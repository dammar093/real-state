"use client";
import React, { useState, useRef } from "react";
import Table from "@/components/table/table";
import useProperties from "@/hooks/useProperties";
import Input from "@/components/ui/input";
import Loader from "@/components/loader/loader";
import Button from "@/components/ui/button";
import { FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";

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
    { title: "Price", selector: (row: any) => `Rs.${row.price}` },
    { title: "Location", selector: (row: any) => row.location },
    { title: "Type", selector: (row: any) => row.type },
    {
      title: "Category",
      selector: (row: any) => (
        <span className="capitalize">{row.category?.name || "-"}</span>
      ),
    },
    { title: "User", selector: (row: any) => row.user?.fullName || "-" },
    {
      title: "Actions",
      selector: (row: any) => (
        <div className="flex gap-2">
          <Link
            href={`/properties/${row.id}`}
            className="bg-transparent hover:text-blue-500 text-2xl"
          >
            <FaEye title="View Property" />
          </Link>
          <Button className="!bg-transparent hover:text-red-500 text-xl">
            <FaTrash title="Delete Property" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-10">
      {/* Search Input + Button */}
      <div className="mb-4 flex items-center gap-2">
        <form className="flex items-center gap-2" onSubmit={handleSearchClick}>
          <Input
            type="text"
            placeholder="Search properties..."
            value={term}
            onChange={handleSearchChange}
            className="border p-2 rounded !text-sm !h-full text-white !w-[200px] !placeholder:text-sm"
          />
          <Button
            type="submit"
            className="px-4 py-1  bg-blue-500 hover:bg-blue-600 text-white rounded h-fit"
          >
            Search
          </Button>
        </form>
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
