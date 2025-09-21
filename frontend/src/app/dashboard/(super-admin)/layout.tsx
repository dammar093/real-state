"use client";
import useAuthUser from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthUser();
  const router = useRouter();
  // useEffect(() => {
  //   if (user && user?.role === "SUPER_ADMIN") {
  //     router.push("/dashboard/properties");
  //   } else {
  //     router.back();
  //   }
  // }, [user]);
  return <div>{children}</div>;
};

export default SuperAdminLayout;
