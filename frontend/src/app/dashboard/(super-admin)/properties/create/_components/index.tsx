import React from "react";
import { Breadcrumb } from "antd";

const CreatePropety = () => {
  return (
    <>
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
    </>
  );
};

export default CreatePropety;
