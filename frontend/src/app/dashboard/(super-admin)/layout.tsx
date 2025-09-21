"use client";
import Loader from "@/components/loader/loader";
import useAuthUser from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === "SUPER_ADMIN") {
        setAuthorized(true); // allow access
      } else {
        router.replace("/"); // redirect unauthorized users
      }
      setLoading(false);
    }
  }, [router, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
};

export default SuperAdminLayout;
