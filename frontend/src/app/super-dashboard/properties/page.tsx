"use client";
import React, { useState } from "react";
import Table from "@/components/table/table";
import useProperties from "@/hooks/useProperties";
import Input from "@/components/ui/input";
import Loader from "@/components/loader/loader";
import Button from "@/components/ui/button";
import { FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";

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
    {
      title: "Image",
      selector: (row: Property) => (
        <div className="aspect-video">
          <Image
            src={row?.images ? row?.images[0].image : ""}
            alt={row?.title}
            width={1080}
            height={720}
            className="w-full h-full object-contain"
          />
        </div>
      ),
    },
    { title: "Title", selector: (row: Property) => row.title },
    { title: "Price", selector: (row: Property) => `Rs.${row.price}` },
    { title: "Location", selector: (row: Property) => row.location },
    { title: "Type", selector: (row: Property) => row.type },
    {
      title: "Category",
      selector: (row: Property) => (
        <span className="capitalize">{row.category?.name || "-"}</span>
      ),
    },
    { title: "User", selector: (row: Property) => row.user?.fullName || "-" },
    {
      title: "Actions",
      selector: (row: Property) => (
        <div className="flex gap-2">
          <Link
            href={`/super-dashboard/properties/${row.id}`}
            className="bg-transparent hover:text-blue-500 text-2xl"
          >
            <FaEye title="View Property" />
          </Link>
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
