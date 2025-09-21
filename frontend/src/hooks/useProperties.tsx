"use client";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { fetchProperties } from "@/redux/feature/propertySlice";

const useProperties = (debounceDelay = 500, limitItems = 10) => {
  const dispatch = useDispatch<AppDispatch>();
  const [limit, setLimit] = useState(limitItems);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { properties, loading, meta } = useSelector(
    (state: RootState) => state.property
  );
  // Debounce search effect
  useEffect(() => {
    const handler = setTimeout(() => {}, debounceDelay);

    return () => clearTimeout(handler); // Cleanup on change/unmount
  }, [search, dispatch, debounceDelay, limit]);

  // Fetch properties whenever page, limit, or search changes
  useEffect(() => {
    dispatch(fetchProperties({ page, limit, search }));
  }, [dispatch]);

  // Update search text locally
  const onSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  return {
    properties,
    loading,
    search,
    setSearch,
    setLimit,
    limit,
    page,
    setPage,
    meta,
  };
};

export default useProperties;
