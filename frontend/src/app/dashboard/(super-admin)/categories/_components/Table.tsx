"use client";
import React, { useState } from "react";
import { Table as AntTable, Button, Popconfirm, Switch } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Entry from "@/components/ui/entry";
import useCategories from "@/hooks/useCategories";
import { CategoryItem } from "@/types/category";
import Link from "next/link";
import { dateFormatter } from "@/utils/utils";

const Table: React.FC = () => {
  const { loading, categories } = useCategories();
  const [sortedInfo, setSortedInfo] = useState<any>({});

  const handleChange: TableProps<CategoryItem>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setSortedInfo(sorter);
  };

  const columns: TableProps<CategoryItem>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
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
          {/* Uncomment and implement if needed */}

          <Switch
            checkedChildren="Active"
            unCheckedChildren="Deactive"
            // checked={record.status}
            // onChange={(checked) => toggleCategory(record.id, checked)}
          />
          <Popconfirm
            title="Delete Category"
            description="Are you sure you want to delete this category?"
            okText="Yes"
            cancelText="No"
            // onConfirm={() => deleteCategory(record.id)}
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
        <Link href="/dashboard/categories/create">
          <Button type="primary" className="mb-4">
            <PlusOutlined />
            Add New Category
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <Entry />
        <div className="max-w-50">{/* Optional Search */}</div>
      </div>

      <AntTable<CategoryItem>
        rowKey="id"
        loading={loading}
        dataSource={categories}
        columns={columns}
        scroll={{ x: true }}
        onChange={handleChange}
        pagination={{
          showQuickJumper: true,
          showLessItems: true,
        }}
      />
    </div>
  );
};

export default Table;
