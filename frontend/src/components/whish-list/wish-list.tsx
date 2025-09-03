"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../ui/button";
import wishlist from "@/api/whishlist/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";

import { setWishlist } from "@/redux/feature/wishllistSlice";

const WhishList = () => {
  const [showWishlist, setShowWishList] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const wishlists = useSelector((state: RootState) => state.wislist?.wishlist);
  console.log(wishlist, "sfsfsdf");
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await wishlist.getWishlist();

        dispatch(setWishlist(res.data.data));
      } catch (error: any) {
        console.error(error);
      }
    }
    fetchWishlist();
  }, [dispatch, showWishlist]);
  return (
    <>
      <span
        tabIndex={0}
        role="button"
        className="text-[var(--black-color)] hover:text-[var(--primary-color)] bg-transparent cursor-pointer"
        onClick={() => setShowWishList((prev) => !prev)}
      >
        <AiOutlineHeart size={25} title="Whishlist" />
      </span>
      {showWishlist && (
        <div className="bg-white shadow-2xl border border-gray-500/50 h-[400] absolute w-[300px] top-22.5 right-0 p-4 rounded-md">
          <div className="flex flex-col gap-3">
            <h2 className="text-[17px] font-semibold text-slate-800 text-center">
              Your Wish Lists
            </h2>
            {wishlists?.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {wishlists.map((list) => (
                  <li
                    className="bg-gray-400/20 py-3 px-1 shadow-md rounded-md relative"
                    key={list?.id}
                  >
                    <Link href={`/properties/rooms/${list?.property?.id}`}>
                      <div>
                        <div
                          className="flex items-start gap-2"
                          style={{ lineHeight: "20px" }}
                        >
                          <div className="h-20 w-20 aspect-square rounded-md overflow-hidden">
                            <Image
                              src={list?.property?.images[0]?.image}
                              alt={list?.property?.title}
                              width={1080}
                              height={720}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 line-clamp-1">
                              {list?.property?.title}
                            </h3>
                            <div className="text-[14px] text-gray-700">
                              Rs.{list?.property?.price} for{" "}
                              {list?.property?.duration}
                              {list?.property?.durationType}
                            </div>
                            <div className="text-[14px] text-gray-700 flex items-center gap-1">
                              <span> 5.0</span> <FaStar size={10} />
                            </div>
                            <div className="text-gray-700 text-[14px]">
                              {list?.property?.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Button className="w-6 h-6 text-[10px] border-1 absolute -top-1.5 -right-1.5">
                      X
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <div></div>
                <h2 className="text-lg font-medium animate-pulse text-center">
                  Your whish list is empty
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WhishList;
