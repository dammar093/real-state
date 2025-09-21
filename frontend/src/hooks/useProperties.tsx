"use client";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import {
  deletePropertyById,
  fetchProperties,
  fetchPropertiesUserId,
  togglePropertyStatusById,
} from "@/redux/feature/propertySlice";
import { get } from "http";

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
  }, [dispatch, page, limit, search]);

  // Update search text locally
  const onSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);
  // Delete property
  const deleteProperty = useCallback(
    (id: number) => {
      dispatch(deletePropertyById(id));
    },
    [dispatch]
  );
  //toggle property status
  const togglePropertyStatus = useCallback(
    (id: number, status: boolean) => {
      dispatch(togglePropertyStatusById({ id, status }));
    },
    [dispatch]
  );

  // get properties by user
  const getPropertiesByUser = useCallback(
    (id: number) => {
      dispatch(fetchPropertiesUserId({ id, params: { page, limit, search } }));
    },
    [dispatch, page, limit, search]
  );

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
    deleteProperty,
    togglePropertyStatus,
    getPropertiesByUser,
  };
};

export default useProperties;
