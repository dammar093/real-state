"use client";
import useProperties from "@/hooks/useProperties";
import { useEffect } from "react";
import Table from "../../../properties/_components/Table";
import { useParams } from "next/navigation";

const UserProperties = () => {
  const { id } = useParams();
  const { getPropertiesByUser } = useProperties();

  useEffect(() => {
    getPropertiesByUser(Number(id));
  }, [getPropertiesByUser, id]);

  return <Table />;
};

export default UserProperties;
