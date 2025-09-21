"use client";

import React, { useState } from "react";
import {
  Table as AntTable,
  Button,
  Popconfirm,
  Tag,
  Image,
  Switch,
} from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Entry from "@/components/ui/entry";
import Search from "antd/es/input/Search";
import useUsers from "@/hooks/useUsers";
import { User, UserDetail } from "@/types/user";
import Link from "next/link";
import Loader from "@/components/loader/loader";
import { dateFormatter } from "@/utils/utils";

const Table: React.FC = () => {
  const { users, loading } = useUsers();
  const [sortedInfo, setSortedInfo] = useState<any>({});

  const handleChange: TableProps<User>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setSortedInfo(sorter);
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (userDetail: UserDetail) => (
        <Image
          src={userDetail?.profile?.image || "/assets/placeholder.png"}
          alt="User"
          width={80}
          height={60}
          loading="lazy"
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },

    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a: User, b: User) => a.fullName.localeCompare(b.fullName),
      sortOrder: sortedInfo.columnKey === "fullName" ? sortedInfo.order : null,
      render: (text: string, record: User) => (
        <Link
          href={`/dashboard/users/${record.id}`}
          className="text-blue-500 hover:underline"
        >
          {text}
        </Link>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color="blue">{role}</Tag>,
      sorter: (a: User, b: User) => a.role.localeCompare(b.role),
      sortOrder: sortedInfo.columnKey === "role" ? sortedInfo.order : null,
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (isVerified: boolean) => (
        <Tag color={isVerified ? "green" : "red"}>
          {isVerified ? "Yes" : "No"}
        </Tag>
      ),
      sorter: (a: User, b: User) =>
        a.isVerified === b.isVerified ? 0 : a.isVerified ? 1 : -1,
      sortOrder:
        sortedInfo.columnKey === "isVerified" ? sortedInfo.order : null,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt as string).getTime() -
        new Date(b.createdAt as string).getTime(),
      sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
      render: (date: string) => {
        return dateFormatter(date);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => console.log("Edit", record.id)}
          />
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Deactive"
            defaultChecked
          />
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => console.log("Delete", record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <Entry />
        <div className="max-w-50">
          <Search placeholder="Search users..." />
        </div>
      </div>
      <AntTable<User>
        rowKey="id"
        dataSource={users}
        columns={columns}
        scroll={{ x: true }}
        onChange={handleChange}
      />
    </div>
  );
};

export default Table;
