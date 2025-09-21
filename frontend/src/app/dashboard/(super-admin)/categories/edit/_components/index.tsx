"use client";
import React, { useEffect } from "react";
import CategoryForm from "../../create/_components/Form";
import { Breadcrumb } from "antd";
import { useParams } from "next/navigation";
import useCategories from "@/hooks/useCategories";
import { CategoryItem } from "@/types/category";

const EditCategory = () => {
  const { id } = useParams();
  const { getCategory, category } = useCategories();
  useEffect(() => {
    if (id) {
      getCategory(Number(id));
    }
  }, [id, getCategory]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Dashboard",
            href: "/dashboard",
          },
          {
            title: "Categories",
            href: "/dashboard/categories",
          },
          {
            title: "Edit Categories",
            href: `/dashboard/categories/edit/${id}`,
          },
        ]}
      />
      <CategoryForm category={category as CategoryItem} />
    </div>
  );
};

export default EditCategory;
