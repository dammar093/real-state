"use client";

import React, { useState, useEffect } from "react";
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  Grid,
  MenuProps,
} from "antd";
import { BiBuildingHouse, BiCategory } from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import useAuthUser from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { api } from "@/api/api";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint(); // Responsive breakpoints
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user } = useAuthUser();

  // Collapse sidebar on small screens
  useEffect(() => {
    if (!screens.md) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens.md]);

  // Dropdown menu for avatar
  const items: MenuProps["items"] = [
    {
      key: "account",
      label: <Link href="/account">Account</Link>,
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <button
          className="w-full text-left"
          onClick={async () => {
            try {
              // 1️⃣ Call logout API
              await api.get("/auth/logout");

              // 2️⃣ Clear localStorage
              localStorage.removeItem("token"); // adjust your key
              localStorage.removeItem("user");

              // 3️⃣ Redirect to sign-in
              router.push("/sign-in");
            } catch (error) {
              console.error("Logout failed:", error);
            }
          }}
        >
          Logout
        </button>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  // Sidebar menu items
  const menuItems =
    user?.role === "ADMIN"
      ? [
          {
            key: "1",
            icon: <DashboardOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
          },
          {
            key: "2",
            icon: <BiBuildingHouse />,
            label: <Link href="/dashboard/my-properties">My Properties</Link>,
          },
          {
            key: "3",
            icon: <TbBrandBooking />,
            label: <Link href="/dashboard/my-bookings">Bookings</Link>,
          },
        ]
      : [
          {
            key: "1",
            icon: <DashboardOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
          },
          {
            key: "2",
            icon: <BiCategory />,
            label: <Link href="/dashboard/categories">Categories</Link>,
          },
          {
            key: "3",
            icon: <BiBuildingHouse />,
            label: <Link href="/dashboard/properties">Properties</Link>,
          },
          {
            key: "4",
            icon: <UserAddOutlined />,
            label: <Link href="/dashboard/users">Users</Link>,
          },
          {
            key: "5",
            icon: <BookOutlined />,
            label: <Link href="/dashboard/bookings">Bookings</Link>,
          },
        ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        breakpoint="md"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          zIndex: 100,
        }}
      >
        <div className="shadow-md">
          <div className="h-20 w-full flex justify-center items-center my-4">
            <Image
              src={"/assets/logo.png"}
              alt="Logo"
              width={1080}
              height={720}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          inlineCollapsed={collapsed}
          items={menuItems}
        />
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "all 0.2s",
        }}
      >
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 48,
                  height: 48,
                }}
              />
              <h2 className="ml-2 text-lg font-semibold">Dashboard</h2>
            </div>

            {/* Avatar with Dropdown */}
            <Dropdown menu={{ items }} trigger={["click", "hover"]}>
              <Avatar
                size="large"
                src={user?.userDetail?.profile?.image || undefined}
                className="cursor-pointer"
              >
                <span className="text-2xl">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </span>
              </Avatar>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
