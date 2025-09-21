import React from "react";
import { Breadcrumb } from "antd";
import CategoryForm from "./Form";
const CreateCategory = () => {
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
            title: "Create Categories",
            href: "/dashboard/categories/create",
          },
        ]}
      />
      <CategoryForm />
    </div>
  );
};

export default CreateCategory;
