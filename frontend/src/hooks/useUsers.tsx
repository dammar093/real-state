"use client";
import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  profile?: string; // optional avatar
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Example: Replace with your API endpoint
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");

        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useUsers;
