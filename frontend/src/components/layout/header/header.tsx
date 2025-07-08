import React from "react";
import Container from "../container/Container";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full shadow-lg flex justify-center items-center h-[60px]">
      <Container>
        <nav className="w-full flex justify-between items-center">
          <div>
            <Link href="">Logo</Link>
          </div>
          <ul className="flex items-center md:gap-4 lg:gap-5">
            <li>
              <Link href="" className="hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-500" href="">
                Wisthlist
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-500" href="">
                Booking
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
