import React from "react";
import { Breadcrumb } from "antd";
import PropertyForm from "./Form";

const CreatePropety = () => {
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
            title: "Properties",
            href: "/dashboard/properties",
          },
          {
            title: "Create Property",
            href: "/dashboard/properties/create",
          },
        ]}
      />
      <PropertyForm />
    </div>
  );
};

export default CreatePropety;
