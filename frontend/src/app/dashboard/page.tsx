"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    if (true) {
      redirect("/sign-in");
    }
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
