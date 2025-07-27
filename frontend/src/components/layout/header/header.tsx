import React from "react";
import Container from "../container/container";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/assests/logo.png";
import WhishList from "@/components/whish-list/wish-list";
import UserProfile from "@/components/user-profile/user-profile";
import AuthProfile from "@/components/user-profile/auth-profile";

const Header = () => {
  return (
    <header className="shadow-lg sticky z-[1080] top-0 bg-white w-full">
      <div className="relative">
        <Container>
          <div>
            <nav className="flex justify-between items-center gap-4">
              <div>
                <Link className="d-block" href="/">
                  <div className="h-22 w-auto">
                    <Image
                      width={1080}
                      height={720}
                      src={logo}
                      alt="real state logo"
                      loading="lazy"
                      className="h-full w-full"
                    />
                  </div>
                </Link>
              </div>
              <div>
                <ul className="flex items-center gap-4 md:gap-5 lg:gap-6">
                  <li>
                    <WhishList />
                  </li>
                  <li>
                    <Link
                      className="text-[var(--black-color)] hover:text-[var(--primary-color)] font-medium button py-2 px-3 rounded-full"
                      href="/become-host"
                    >
                      <span> Become Host</span>
                    </Link>
                  </li>
                  <li className={` h-22 justify-center flex items-center`}>
                    <div
                      className={`w-[40px] h-[40px] border-[1px] border[var(--black-color)] hover:border-[var(--primary-color)] rounded-full flex items-center justify-center cursor-pointer`}
                    >
                      {true ? <AuthProfile /> : <UserProfile />}
                    </div>
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
