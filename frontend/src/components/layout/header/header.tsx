import React from "react";
import Container from "../container/container";
import Link from "next/link";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import style from "./header.module.css";
import logo from "../../../../public/assests/logo.png";

const Header = () => {
  return (
    <header className="w-full shadow-lg bg-white flex justify-center items-center h-[60px] sticky top-0 z-100 ">
      <Container>
        <div>
          <nav className="w-full flex justify-between items-center">
            <div>
              <Link href="/">
                <div>
                  <Image
                    width={100}
                    height={100}
                    src={logo}
                    alt="real state logo"
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <ul className="flex items-center md:gap-4 lg:gap-5">
                <li>
                  <Link
                    href=""
                    className="text-[var(--black-color)] hover:text-[var(--primary-color)] "
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[var(--black-color)] hover:text-[var(--primary-color)]"
                    href=""
                  >
                    Wisthlist
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[var(--black-color)] hover:text-[var(--primary-color)]"
                    href=""
                  >
                    Booking
                  </Link>
                </li>
              </ul>
              <div>
                <div
                  className={`w-[50px] h-[50px] border-[1px] border[var(--black-color)] hover:border-[var(--primary-color)] rounded-full flex items-center justify-center cursor-pointer ${style.parent}`}
                >
                  <FaRegUser
                    className={`text-2xl text-[var(--black-color)] ${style.child}`}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
