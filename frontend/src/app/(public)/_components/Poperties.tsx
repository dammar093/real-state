"use client";
import React, { useEffect } from "react";
import { Col, Flex, Row, Spin } from "antd";
import useProperties from "@/hooks/useProperties";
import Link from "next/link";
import PropertySlider from "@/components/property-sldier/property-slider";

const PropertyWrapper = () => {
  const { loading, active, getActiveProperties } = useProperties();
  useEffect(() => {
    getActiveProperties();
  }, [getActiveProperties]);

  if (loading) return <Spin />;

  const slicedProperties = active?.properties?.slice(0, 8) || [];

  return (
    <Row gutter={23}>
      <Col xs={24} className="mb-4">
        <Flex wrap justify="space-between" gap={4}>
          <h2 className="text-sm md:text-lg lg:text-2xl font-semibold text-gray-800">
            Explore Propeties
          </h2>
          <Link
            href="/properties"
            className="px-3 py-1 rounded !bg-[#800000] !text-white !hover:bg-[#a00000]"
          >
            View All
          </Link>
        </Flex>
      </Col>
      {slicedProperties.map((pr) => (
        <Col xs={12} md={8} lg={6} key={pr?.id}>
          <div className="cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
              <PropertySlider pr={pr} />
              <div>
                <h2 className="text-gray-600 font-medium text-sm lg:text-lg">
                  {pr?.title}
                </h2>
                <div className="text-gray-600">
                  <span>Rs.{pr?.price}</span>
                </div>
                <div className="text-gray-600">
                  <span className="capitalize">
                    {pr?.duration} {pr?.durationType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default PropertyWrapper;
