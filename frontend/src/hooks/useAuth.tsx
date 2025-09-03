import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { decodeToken } from "@/utils/utils";
import { getLoggedInUser } from "@/api/api"; // API call to GET /users/me

const useAuthUser = (): { user: User | null; loading: boolean } => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const decoded: any = decodeToken(token);
        // Call backend API to get full user info
        const userData: User = await getLoggedInUser(decoded?.id);
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuthUser;
