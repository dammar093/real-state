import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import ProducsLayout from "@/components/layout/products-layout/products-layout";
import PropertyCard from "@/components/property/property-card";
import { FaGlobe } from "react-icons/fa";
import UserCard from "@/components/user-card/user-card";

const UserPropeties = () => {
  return (
    <div className="pt-5">
      <div className="flex flex-col gap-3">
        <div className="flex gap-5 flex-wrap">
          <div className="flex-1">
            <UserCard />
          </div>
          <div className="flex-2">
            <h3 className="text-xl font-semibold text-slate-900 ">
              About Dammar
            </h3>
            <article>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              adipisci facere aperiam reiciendis, consectetur eos! Fugit, vitae
              expedita numquam cum eum totam quidem quam doloribus ut
              necessitatibus quo porro saepe. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eum aspernatur cum beatae corrupti
              ducimus quaerat alias, aliquid placeat explicabo voluptatem.
            </article>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-gray-800">
          <div className="flex gap-1 items-center">
            <FaGlobe size={25} />
            <span className="capitalize text-lg">English, Nepali</span>
          </div>
          <div className="flex gap-1 items-center">
            <FaLocationDot size={25} />
            <span className="capitalize text-lg">Lives Kathmandu, Nepali</span>
          </div>
        </div>
        <div>
          <ProducsLayout>
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
            <PropertyCard
              image="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
              id={1}
              category={"sdfds"}
              badgeTitle="For Sell"
            />
          </ProducsLayout>
        </div>
      </div>
    </div>
  );
};

export default UserPropeties;
