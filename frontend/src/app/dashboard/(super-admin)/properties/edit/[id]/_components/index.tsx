"use client";
import React, { useEffect } from "react";
import { Breadcrumb } from "antd";
import PropertyForm from "../../../create/_components/Form";
import useProperties from "@/hooks/useProperties";
import { useParams } from "next/navigation";

const EditPropety = () => {
  const { id } = useParams();
  const { singleProperty, getPropertyById } = useProperties();
  console.log(singleProperty, "single");
  useEffect(() => {
    getPropertyById(Number(id));
  }, [getPropertyById, id]);
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
            title: "Edit Property",
            href: `/dashboard/properties/edit/${id}`,
          },
        ]}
      />
      <PropertyForm property={singleProperty} />
    </div>
  );
};

export default EditPropety;
