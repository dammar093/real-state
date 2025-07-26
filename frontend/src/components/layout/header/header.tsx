import React from "react";
import Container from "../container/container";
import Link from "next/link";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import style from "./header.module.css";
import logo from "../../../../public/assests/logo.png";
import { IoIosHeartEmpty } from "react-icons/io";

const Header = () => {
  return (
    <header className="shadow-lg sticky z-[1080] top-0 bg-white w-full">
      <Container>
        <div className="relative">
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
                  <span className="text-[var(--black-color)] hover:text-[var(--primary-color)] bg-transparent cursor-pointer">
                    <IoIosHeartEmpty size={30} />
                  </span>
                </li>
                <li>
                  <Link
                    className="text-[var(--black-color)] hover:text-[var(--primary-color)] font-medium button py-1.5 px-3 rounded-md"
                    href="/register"
                  >
                    <span> Become Host</span>
                  </Link>
                </li>
                <li
                  className={`${style.profile} h-22 justify-center flex items-center`}
                >
                  <div
                    className={`w-[40px] h-[40px] border-[1px] border[var(--black-color)] hover:border-[var(--primary-color)] rounded-full flex items-center justify-center cursor-pointer ${style.parent}`}
                  >
                    <FaRegUser
                      className={`text-2xl text-[var(--black-color)] ${style.child}`}
                    />
                    <div
                      className={`${style.dropdown} absolute top-[89px] right-0  h-fit p-4  w-[150px] bg-white rounded-lg shadow-lg`}
                    >
                      <ul>
                        <li>
                          <Link
                            href={"/profile"}
                            className=" hover:text-[var(--primary-color)] capitalize font-medium"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"/booking"}
                            className=" hover:text-[var(--primary-color)] capitalize font-medium"
                          >
                            Booking
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"/sign-up"}
                            className=" hover:text-[var(--primary-color)] capitalize font-medium"
                          >
                            Sign up
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"/sign-in"}
                            className=" hover:text-[var(--primary-color)] capitalize font-medium"
                          >
                            Sign in
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
