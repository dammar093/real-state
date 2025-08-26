"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BsFillBoxFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";
import Profile from "@/components/profile/profle";
import { GiMeepleGroup } from "react-icons/gi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/super-dashboard", icon: <BsFillBoxFill /> },
    { label: "Users", href: "/super-dashboard/users", icon: <FaUser /> },
    {
      label: "Properties",
      href: "/super-dashboard/properties",
      icon: <MdMapsHomeWork />,
    },
    {
      label: "Categories",
      href: "/super-dashboard/categories",
      icon: <GiMeepleGroup />,
    },
  ];

  // Determine if a menu item is active
  const isActive = (href: string) => {
    // Root dashboard is active only if exact path
    if (href === "/super-dashboard") {
      return pathname === href;
    }
    // Other pages: active if exact or nested route
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="flex min-h-screen justify-between gap-4 bg-[#0F172A] md:p-4">
      {/* Sidebar */}
      <aside className="md:w-50 bg-[#1F2937] shadow-lg text-gray-800 rounded-md overflow-hidden h-[95vh] sticky top-20 flex flex-col justify-between gap-4">
        {/* Logo */}
        <div className="border-b border-gray-300">
          <Link href="/super-dashboard">
            <Image
              src="/assests/logo.png"
              alt="logo"
              width={1080}
              height={720}
              loading="lazy"
              className="aspect-[16/9] w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* Menu */}
        <nav className="h-[95%] overflow-y-scroll scrollbar-hide">
          <ul className="flex flex-col gap-0.5 p-0 m-0 list-none">
            {menuItems.map((item) => (
              <li
                key={item.href}
                className={`px-4 py-2 w-[90%] mx-auto rounded-md cursor-pointer
                  ${isActive(item.href) ? "bg-[#6338F0]" : "bg-transparent"}
                  hover:bg-[#6338F0] transition-colors duration-200`}
              >
                <Link
                  href={item.href}
                  className="text-white flex gap-2 items-center"
                >
                  <span className="ml-2">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <header className="flex justify-between items-center bg-[#1D2736] h-12 p-4 rounded-md">
          <AiOutlineMenu className="text-white text-xl md:text-2xl lg:text-3xl cursor-pointer" />
          <Profile className="w-10 h-10 rounded-full" />
        </header>

        {/* Page content */}
        {children}
      </main>
    </div>
  );
}
