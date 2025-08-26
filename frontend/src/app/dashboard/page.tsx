"use client";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const user = useAuth();
  useEffect(() => {
    if (user?.role !== "ADMIN") {
      redirect("/sign-in");
    }
  }, [user]);
  return <div>Dashboard</div>;
};

export default Dashboard;
