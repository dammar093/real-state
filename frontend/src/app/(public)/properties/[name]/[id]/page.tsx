import React from "react";
import PropertySlider from "@/components/property-sldier/property-slider";
import Owner from "@/components/owner/owner";
import { GoStarFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import GoogleMap from "@/components/google-map/google-map";
import Image from "next/image";

const Property = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5">
        {/* property gallery */}
        <PropertySlider />
        {/* detail title and location */}
        <div>
          <div>
            <span className="capitalize font-medium text-[var(--primary-color)]">
              For Sell
            </span>
            <h3 className="text-md md:text-lg font-medium text-gray-800">
              <span className="capitalize">{"rooms"} </span>in{" "}
              <span className="capitalize">Kathmandu</span>
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-gray-600 font-normal text-sm">
              Rs. 1100 for 2 nihgts
            </div>
            <div>
              <LuDot className="text-gray-600" size={10} />
            </div>
            <div className="flex gap-1 items-center">
              <GoStarFill size={10} className="text-slate-600" />
              <span className="text-gray-600 text-sm">5.0</span>
            </div>
          </div>
        </div>
        <div>
          <Owner />
        </div>
        {/* what service they give */}
        <div className="service">
          <div className="text-slate-800 font-medium flex flex-wrap gap-2">
            <div className="flex w-fit gap-2 items-center px-4 py-2 rounded-3xl bg-slate-500/10 shadow">
              <div className="w-[15px] h-15px]">
                <Image
                  src={
                    "https://cdn-icons-png.flaticon.com/128/3287/3287922.png"
                  }
                  alt="sdf"
                  width={1080}
                  height={720}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[13px] my-0">Free Wifi</span>
            </div>
            <div className="flex w-fit gap-1 items-center px-4 py-2 rounded-3xl bg-slate-500/10 shadow">
              <div className="w-[15px] h-15px]">
                <Image
                  src={"https://cdn-icons-png.flaticon.com/128/780/780500.png"}
                  alt="sdf"
                  width={1080}
                  height={720}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[13px]">Free Electricity</span>
            </div>
            <div className="flex w-fit gap-1 items-center px-4 py-2 rounded-3xl bg-slate-500/10 shadow">
              <div className="w-[15px] h-15px]">
                <Image
                  src={
                    "https://cdn-icons-png.flaticon.com/128/9013/9013994.png"
                  }
                  alt="sdf"
                  width={1080}
                  height={720}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[13px]">24/7 Water</span>
            </div>
            <div className="flex w-fit gap-1 items-center px-4 py-2 rounded-3xl bg-slate-500/10 shadow">
              <div className="w-[15px] h-15px]">
                <Image
                  src={
                    "https://cdn-icons-png.flaticon.com/128/10815/10815101.png"
                  }
                  alt="sdf"
                  width={1080}
                  height={720}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[13px]">Parking</span>
            </div>
          </div>
        </div>
        {/* description of property */}
        <article className="text-[14px] text-slate-600 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea odit neque
          ad labore harum assumenda excepturi est recusandae cum voluptatibus
          suscipit voluptatem quam distinctio, ducimus reiciendis,
          exercitationem asperiores iste eaque tenetur, maiores totam sed?
          Quaerat nulla officia facere corporis suscipit aspernatur voluptatum!
          Obcaecati cumque autem eaque eos, ab in asperiores sequi a quidem
          aspernatur tenetur mollitia adipisci, iste nesciunt labore ipsa
          aliquid. Maxime quis assumenda, perferendis accusamus ut veritatis
          corporis tempora explicabo excepturi officiis expedita qui! Distinctio
          doloribus mollitia dolor, recusandae temporibus quisquam consequatur
          facere ipsam incidunt amet accusamus repellat laborum tempore error id
          explicabo, in ratione suscipit atque maxime!
        </article>
        {/* google map */}
        <GoogleMap />
      </div>
    </React.Fragment>
  );
};

export default Property;
