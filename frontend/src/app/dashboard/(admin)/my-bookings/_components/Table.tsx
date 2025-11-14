"use client";

import React, { useState, useEffect } from "react";
import { Table as AntTable, Tag, Spin, Image } from "antd";
import type { TableProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { dateFormatter } from "@/utils/utils";
import { api } from "@/api/api";

interface Property {
  id: number;
  title: string;
  location: string;
  images?: { image: string }[];
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Booking {
  id: number;
  property: Property;
  user: User;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const OwnerBookingsTable: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortedInfo, setSortedInfo] = useState<any>({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/booking/owner");
        console.log(res.data);
        setBookings(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch owner bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
    // alert("sddf");
  }, []);

  const handleChange: TableProps<Booking>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setSortedInfo(sorter);
  };

  const columns: TableProps<Booking>["columns"] = [
    {
      title: "Property",
      dataIndex: ["property", "title"],
      key: "property",
      sorter: (a, b) => a?.property?.title.localeCompare(b?.property?.title),
      sortOrder: sortedInfo.columnKey === "property" ? sortedInfo?.order : null,
      render: (text: string, record: Booking) => (
        <div className="flex items-center gap-2">
          <Image
            src={record?.property?.images?.[0]?.image}
            alt={record?.property?.title}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: 6 }}
            fallback="/images/default-property.jpg"
            preview={{
              mask: <EyeOutlined style={{ fontSize: 24, color: "#fff" }} />,
            }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "user",
      render: (text: string, record: Booking) => (
        <div>
          {record?.user?.name} <br />
          <span className="text-gray-500 text-sm">{record?.user?.email}</span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a?.amount - b?.amount,
      sortOrder: sortedInfo.columnKey === "amount" ? sortedInfo.order : null,
      render: (amount: number) => `Rs.${amount}`,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "SUCCESS" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime(),
      sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
      render: (date: string) => dateFormatter(date),
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      <AntTable<Booking>
        rowKey="id"
        loading={loading}
        dataSource={bookings}
        columns={columns}
        scroll={{ x: true }}
        onChange={handleChange}
        pagination={{ showQuickJumper: true, showLessItems: true }}
      />
    </div>
  );
};

export default OwnerBookingsTable;
