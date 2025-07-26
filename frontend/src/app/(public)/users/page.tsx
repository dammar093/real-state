import UserCard from "@/components/user-card/user-card";
import Link from "next/link";
import React from "react";

const Users = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Link href={`/users/1`}>
        <UserCard />
      </Link>
      <Link href={`/users/1`}>
        <UserCard />
      </Link>
      <Link href={`/users/1`}>
        <UserCard />
      </Link>
      <Link href={`/users/1`}>
        <UserCard />
      </Link>
      <Link href={`/users/1`}>
        <UserCard />
      </Link>
      <Link href={`/users/1`}>
        <UserCard />
      </Link>
      <Link href={`/users/1`}>
        <UserCard />
      </Link>
    </div>
  );
};

export default Users;
