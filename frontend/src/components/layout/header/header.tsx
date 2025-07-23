import React from "react";
import Container from "../container/container";
import Link from "next/link";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import style from "./header.module.css";
import logo from "../../../../public/assests/logo.png";
import { FaRegHeart } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="shadow-lg sticky z-[1080] top-0 bg-white w-full">
      <Container>
        <div>
          <nav className="flex justify-between items-center">
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
            <div className="flex items-center gap-4 md:gap-6">
              <ul className="flex items-center md:gap-4 lg:gap-5">
                <li>
                  <span className="text-[var(--black-color)] hover:text-[var(--primary-color)] bg-transparent cursor-pointer">
                    <FaRegHeart size={30} />
                  </span>
                </li>
                <li>
                  <Link
                    className="text-[var(--black-color)] hover:text-[var(--primary-color)]"
                    href="/register"
                  >
                    Become Host
                  </Link>
                </li>
              </ul>
              <div>
                <div
                  className={`w-[40px] h-[40px] border-[1px] border[var(--black-color)] hover:border-[var(--primary-color)] rounded-full flex items-center justify-center cursor-pointer ${style.parent}`}
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
