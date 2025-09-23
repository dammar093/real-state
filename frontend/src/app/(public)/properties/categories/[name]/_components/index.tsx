"use client";
import React, { useEffect } from "react";
import { Col, Row } from "antd";
import useProperties from "@/hooks/useProperties";
import PropertySlider from "@/components/property-sldier/property-slider";
import Loader from "@/components/loader/loader";
import { useParams } from "next/navigation";

const PropertyWrapper = () => {
  const { loading, active, getPropertiesByCategory } = useProperties();
  const { name } = useParams();
  useEffect(() => {
    getPropertiesByCategory(name as string);
  }, [getPropertiesByCategory, name]);

  if (loading) <Loader />;

  return (
    <Row gutter={23} className="mt-4">
      {active?.properties?.map((pr) => (
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
