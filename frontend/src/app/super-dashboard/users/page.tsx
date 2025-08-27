"use client";
import React, { useState } from "react";
import Table from "@/components/table/table";
import useUsers from "@/hooks/useUsers";
import { User } from "@/types/property";
import Input from "@/components/ui/input";
import Loader from "@/components/loader/loader";

const UserPage = () => {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-10">
      {/* Top controls */}
      <div className="flex justify-between gap-2 mb-2">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 rounded !text-sm text-white !w-[200px] !placeholder:text-sm"
        />
      </div>

      {/* Table */}
      <Table<User>
        data={filteredUsers}
        columns={[
          {
            title: "Profile",
            selector: (row) => (
              <img
                src={row.userDetail?.profile?.image || "/assests/user.png"}
                alt={row.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ),
          },
          {
            title: "Name",
            selector: (row) => <span>{row.fullName}</span>,
          },
          {
            title: "Email",
            selector: (row) => <span>{row.email}</span>,
          },
          {
            title: "Role",
            selector: (row) => <span>{row.role}</span>,
          },
        ]}
      />
    </div>
  );
};

export default UserPage;
