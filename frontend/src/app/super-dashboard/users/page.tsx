import Table from "@/components/table/table";
import Image from "next/image";
import Link from "next/link";

const Users = () => {
  const columns = [
    {
      header: "Profile",
      accessor: (row: any) => (
        <Image
          src={row.profile}
          alt={row.name}
          width={40}
          height={40}
          className="rounded-full"
        />
      ),
    },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Action",
      accessor: (row: any) => (
        <div className="flex gap-2">
          <Link href={`/users/${row.id}`}>View</Link>
          <button>delete</button>
        </div>
      ),
    },
  ];

  const data = [
    {
      profile: "/avatars/user1.png", // replace with actual image paths
      name: "John Doe",
      email: "john@example.com",
    },
    {
      profile: "/avatars/user2.png", // replace with actual image paths
      name: "Jane Smith",
      email: "jane@example.com",
    },
  ];

  return (
    <div className="p-4">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Users;
