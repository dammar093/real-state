"use client";
import useCategories from "@/hooks/useCategories";
import Link from "next/link";
import React from "react";

const CategoriesTab = () => {
  const { activeCategories: categories } = useCategories();
  console.log("active", categories);
  return (
    <div className="flex items-center gap-3">
      {categories?.map((cat) => (
        <Link
          href={`/properties/${cat?.name}`}
          key={cat?.id}
          className="flex rounded bg-[var(--primary-color)] px-4 py-1 text-white capitalize"
        >
          {cat?.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesTab;
