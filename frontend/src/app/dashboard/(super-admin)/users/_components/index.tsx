import React from "react";
import Table from "./Table";
import { Breadcrumb } from "antd";

const Properties = () => {
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
            title: "Users",
            href: "/dashboard/users",
          },
        ]}
      />
      <Table />
    </div>
  );
};

export default Properties;
