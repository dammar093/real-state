"use client";

import Container from "../container/container";
import Link from "next/link";
import Image from "next/image";
const Search = dynamic(() => import("@/components/ui/search"));
import useAuthUser from "@/hooks/useAuth";
import { Avatar, Dropdown, MenuProps, Modal } from "antd";
import { UserOutlined, LogoutOutlined, BookOutlined } from "@ant-design/icons";
import { useState } from "react";
import { api } from "@/api/api";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Header = () => {
  const { user } = useAuthUser();
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const router = useRouter();

  // Dropdown items
  const items: MenuProps["items"] = [
    {
      key: "booking",
      label: <Link href="/my-booking">My Booking</Link>,
      icon: <BookOutlined />,
    },
    {
      key: "account",
      label: <Link href="/profile">Account</Link>,
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

  return (
    <>
      {/* Header */}
      <header className="shadow-lg sticky z-[100] top-0 bg-white w-full">
        <div className="relative">
          <Container>
            <div>
              <nav className="flex justify-between items-center gap-1">
                {/* Logo */}
                <div>
                  <Link className="d-block" href="/">
                    <div className="w-16 h-16 md:h-22 md:w-22">
                      <Image
                        width={1080}
                        height={720}
                        src={"/assets/logo.png"}
                        alt="real estate logo"
                        loading="lazy"
                        className="h-full w-full"
                      />
                    </div>
                  </Link>
                </div>

                {/* Search */}
                <div className="flex-1">
                  <Search />
                </div>

                {/* Right Menu */}
                <div>
                  <ul className="flex items-center gap-1 md:gap-4 lg:gap-5">
                    <li>
                      {user ? (
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
                      ) : (
                        <Link
                          href={"/sign-in"}
                          className="px-3 py-2 button rounded-full capitalize"
                        >
                          Sign in
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </Container>
        </div>
      </header>

      {/* Wishlist Modal */}
      <Modal
        title="My Wishlist"
        open={isWishlistOpen}
        onCancel={() => setIsWishlistOpen(false)}
        centered
        footer={null}
      >
        <div>
          {/* 👉 Replace with your actual Wishlist component */}
          <p>Your wishlist items will appear here.</p>
        </div>
      </Modal>
    </>
  );
};

export default Header;
