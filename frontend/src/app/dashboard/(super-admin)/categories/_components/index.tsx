import React from "react";
import Table from "./Table";
import { Breadcrumb } from "antd";
const Categories = () => {
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
        ]}
      />
      <Table />
    </div>
  );
};

export default Categories;
