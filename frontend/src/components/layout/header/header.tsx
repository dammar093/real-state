"use client";
import React from "react";
import Container from "../container/container";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/assests/logo.png";
import WhishList from "@/components/whish-list/wish-list";
import Search from "@/components/ui/search";
import { IoBookOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="shadow-lg sticky z-[1080] top-0 bg-white w-full">
      <div className="relative">
        <Container>
          <div>
            <nav className="flex justify-between items-center gap-1">
              <div>
                <Link className="d-block" href="/">
                  <div>
                    <div className="w-16 h-16 md:h-22 md:w-22">
                      <Image
                        width={1080}
                        height={720}
                        src={logo}
                        alt="real state logo"
                        loading="lazy"
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex-1">
                <Search />
              </div>
              <div>
                <ul className="flex items-center gap-1 md:gap-4 lg:gap-5">
                  <li>
                    <Link
                      href={"/booking"}
                      className="text-gray-800 hover:text-[var(--primary-color)] font-medium"
                    >
                      <span className=" md:hidden">
                        <IoBookOutline size={25} title="Booking" />
                      </span>
                      <span className="hidden md:block">Booking</span>
                    </Link>
                  </li>
                  <li>
                    <WhishList />
                  </li>
                  <li>
                    <Link
                      href={"/sign-in"}
                      className="px-3 py-2 button rounded-full capitalize"
                    >
                      Sign in
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
