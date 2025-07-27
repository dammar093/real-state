"use client";
import React from "react";
import Container from "../container/container";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/assests/logo.png";
import WhishList from "@/components/whish-list/wish-list";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import Button from "@/components/ui/button";

const Header = () => {
  const { isSignedIn, userId, sessionId } = useAuth();

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
                <ul className="flex items-center gap-3 md:gap-4 lg:gap-5">
                  <li>
                    <WhishList />
                  </li>
                  <li>
                    <SignedOut>
                      <SignInButton>
                        <Button className="px-3 py-1 cursor-pointer">
                          {" "}
                          Sign In
                        </Button>
                      </SignInButton>
                      {/* <SignUpButton>
                        <Button className="px-3 py-1">Sign Up</Button>
                      </SignUpButton> */}
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
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
