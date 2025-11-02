"use client";
import Loader from "@/components/loader/loader";
import PropertySlider from "@/components/property-sldier/property-slider";
import useProperties from "@/hooks/useProperties";
import { PropertyItem } from "@/types/property";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Modal } from "antd";
import LocationMap from "./Location";
import Link from "next/link";
import { getTimeSince } from "@/utils/utils";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import BookingForm from "./booking-form";

const PropertyDetail = () => {
  const { loading, getPropertyById, singleProperty } = useProperties();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  useEffect(() => {
    getPropertyById(Number(id));
  }, [id, getPropertyById]);
  if (loading) return <Loader />;
  return (
    <div>
      <div className="flex flex-col gap-2 md:gap-5">
        <div className="flex flex-col gap-1 mt-3">
          <PropertySlider pr={singleProperty as PropertyItem} />
          <div>
            <h1 className="text-gray-800 font-semibold text-md md:text-lg lg:text-xl">
              {singleProperty?.title}
            </h1>
            <h4 className="text-gray-600 font-medium text-md md:text-[20px]">
              {singleProperty?.location}
            </h4>
          </div>
          <div>
            <div className="text-gray-600">
              <span>Rs.{singleProperty?.price}</span>
            </div>
            <div className="text-gray-600">
              <span className="capitalize">
                {singleProperty?.duration} {singleProperty?.durationType}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between flex-wrap-reverse gap-3 items-center">
            <Link
              href={`/users/${singleProperty?.userId}/properties`}
              className="!w-fit block"
            >
              <div className="flex gap-2 items-center w-fit  p-2 ">
                <Avatar
                  size="large"
                  src={
                    singleProperty?.user?.userDetail?.profile?.image ||
                    undefined
                  }
                >
                  <span className="text-2xl">
                    {singleProperty?.user?.fullName?.charAt(0).toUpperCase()}
                  </span>
                </Avatar>

                <div>
                  <h4 className="text-slate-700 fw-medium capitalize text-[16px]">
                    {singleProperty?.user?.fullName}
                  </h4>
                  <p className="text-[14px] text-slate-600">
                    Member for{" "}
                    {getTimeSince(
                      new Date(singleProperty?.user?.createdAt as string)
                    )}
                  </p>
                </div>
              </div>
            </Link>
            <div>
              <Button
                type="primary"
                style={{ backgroundColor: "#800000", borderColor: "#800000" }}
                onClick={showModal}
              >
                Book Now
              </Button>

              <Modal
                title="Book Now"
                open={isModalOpen}
                onCancel={handleCancel}
                width="90vw"
                centered
                style={{ maxWidth: 900 }}
                footer={null}
              >
                <BookingForm property={singleProperty!} />
              </Modal>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {singleProperty?.user?.userDetail?.phoneNumber && (
              <Link
                href={`https://wa.me/${singleProperty?.user?.userDetail?.phoneNumber}`}
              >
                <FaWhatsapp size={20} className="text-slate-700" />
              </Link>
            )}
            {singleProperty?.user?.userDetail?.facebook && (
              <Link
                href={`https://www.facebook.com/${singleProperty?.user?.userDetail?.facebook}`}
              >
                <FaFacebook size={20} className="text-slate-700" />
              </Link>
            )}
            {singleProperty?.user?.userDetail?.instagram && (
              <Link
                href={`https://www.instagram.com/${singleProperty?.user?.userDetail?.instagram}`}
              >
                <FaInstagram size={20} className="text-slate-700" />
              </Link>
            )}
          </div>
        </div>
        {singleProperty?.Services && singleProperty?.Services?.length > 0 ? (
          <div>
            <h3 className="text-gray-700 text-md lg:text-lg font-semibold">
              Services
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              {singleProperty?.Services?.map((sr) => (
                <span
                  key={sr}
                  className="block bg-green-200/20 px-3 py-1 w-fit rounded"
                >
                  {sr}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {singleProperty?.description && (
          <div>
            <h3 className="text-gray-700 text-md lg:text-lg font-semibold">
              About
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <article className="text-gray-600">
                {singleProperty?.description}
              </article>
            </div>
          </div>
        )}
        <div>
          <h3 className="text-gray-700 text-md lg:text-lg font-semibold">
            Location
          </h3>
          <LocationMap
            lat={singleProperty?.latitude as number}
            lon={singleProperty?.longitude as number}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
