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
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Entry from "@/components/ui/entry";
import useProperties from "@/hooks/useProperties";
import { PropertyItem, PropertyImage } from "@/types/property";
import Search from "antd/es/input/Search";
import Link from "next/link";
import { dateFormatter } from "@/utils/utils";
const Table: React.FC = () => {
  const {
    properties,
    loading,
    meta,
    search,
    setSearch,
    setPage,
    deleteProperty,
    togglePropertyStatus,
  } = useProperties();
  const [sortedInfo, setSortedInfo] = useState<any>({});

  const handleChange: TableProps<PropertyItem>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setSortedInfo(sorter);
    if (pagination.current) {
      setPage(pagination.current);
    }
  };

  const columns: TableProps<PropertyItem>["columns"] = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images: PropertyImage[]) => (
        <Image
          src={images[0]?.image || "/assets/placeholder.png"}
          alt="Property"
          width={80}
          height={60}
          loading="lazy"
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <Tag color="green">${price.toLocaleString()}</Tag>
      ),
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
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
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
      sortOrder: sortedInfo.columnKey === "duration" ? sortedInfo.order : null,
    },
    {
      title: "Duration Type",
      dataIndex: "durationType",
      key: "durationType",
      sorter: (a, b) => a.durationType.localeCompare(b.durationType),
      sortOrder:
        sortedInfo.columnKey === "durationType" ? sortedInfo.order : null,
    },
    {
      title: "Owner",
      key: "owner",
      sorter: (a: PropertyItem, b: PropertyItem) =>
        a.user?.fullName.localeCompare(b.user?.fullName || "") ?? 0,
      sortOrder: sortedInfo.columnKey === "owner" ? sortedInfo.order : null,
      render: (_, record: PropertyItem) => record.user?.fullName || "N/A",
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
            checked={record.status}
            onChange={(checked) => togglePropertyStatus(record.id, checked)}
          />

          <Popconfirm
            title="Delete Property"
            description="Are you sure you want to delete this property?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProperty(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <Link href="/dashboard/properties/create">
          <Button type="primary" className="mb-4">
            <PlusOutlined />
            Add New Property
          </Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <Entry />
        <div className="max-w-50">
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties..."
          />
        </div>
      </div>

      <AntTable<PropertyItem>
        rowKey="id"
        loading={loading}
        dataSource={properties}
        columns={columns}
        scroll={{ x: true }}
        onChange={handleChange}
        pagination={{
          current: meta?.page || 1,
          pageSize: meta?.limit || 10,
          total: meta?.total || 0,
          showQuickJumper: true,
          showLessItems: true,
        }}
      />
    </div>
  );
};

export default Table;
