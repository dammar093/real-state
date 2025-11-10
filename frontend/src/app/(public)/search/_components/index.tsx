"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Flex } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/api/api";
import { PropertyItem } from "@/types/property";
import PropertySlider from "@/components/property-sldier/property-slider";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get("/properties/active", {
          params: { search: query || "" },
        });
        console.log("Response:", res.data);
        setProperties(res.data?.data?.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="p-4">
      <Row gutter={[23, 23]}>
        <Col xs={24} className="mb-4">
          <Flex wrap justify="space-between" gap={4}>
            <h2 className="text-sm md:text-lg lg:text-2xl font-semibold text-gray-800">
              Explore Properties
            </h2>
            <Link
              href="/properties"
              className="px-3 py-1 rounded bg-[#800000] text-white hover:bg-[#a00000]"
            >
              View All
            </Link>
          </Flex>
        </Col>

        {/* Loading State */}
        {loading && (
          <Col xs={24} className="text-center py-10 text-gray-500">
            Loading properties...
          </Col>
        )}

        {/* No Results */}
        {!loading && properties.length === 0 && (
          <Col xs={24} className="text-center py-10 text-gray-500">
            No properties found for “{query}”
          </Col>
        )}

        {/* Property Cards */}
        {!loading &&
          properties.map((pr) => (
            <Col xs={12} md={8} lg={6} key={pr?.id}>
              <div className="cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out">
                <div className="flex flex-col gap-2">
                  <PropertySlider pr={pr} />
                  <div>
                    <h2 className="text-gray-600 font-medium text-sm lg:text-lg">
                      {pr?.title}
                    </h2>
                    <div className="text-gray-600">
                      <span>Rs. {pr?.price?.toLocaleString()}</span>
                    </div>
                    <div className="text-gray-600 capitalize">
                      {pr?.duration} {pr?.durationType}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Search;
