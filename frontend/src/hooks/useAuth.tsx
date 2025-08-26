"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DecodedToken, decodeToken } from "@/utils/utils";

export function useAuth() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/sign-in");
      return;
    }
    const decoded = decodeToken(token);
    if (!decoded) {
      router.replace("/sign-in");
      return;
    }
    setUser(decoded);
  }, [router, user]);

  return user;
}
