"use client";

import Container from "../container/container";
import Link from "next/link";
import Image from "next/image";
import { IoBookOutline } from "react-icons/io5";
import WhishList from "@/components/whish-list/wish-list";
import Search from "@/components/ui/search";
import useAuthUser from "@/hooks/useAuth";
import Profile from "@/components/profile/profle";
const Header = () => {
  const user = useAuthUser();
  console.log("user", user);

  return (
    <header className="shadow-lg sticky z-[1080] top-0 bg-white w-full">
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
                      src={"/assests/logo.png"}
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
                    <Link
                      href={"/booking"}
                      className="text-gray-800 hover:text-[var(--primary-color)] font-medium"
                    >
                      <span className="md:hidden">
                        <IoBookOutline size={25} title="Booking" />
                      </span>
                      <span className="hidden md:block">Booking</span>
                    </Link>
                  </li>
                  <li>
                    <WhishList />
                  </li>

                  {/* Auth */}
                  <li>
                    {user.user ? (
                      <Link
                        href={"/profile"}
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Profile img={""} className="w-10 h-10" />
                      </Link>
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
  );
};

export default Header;
