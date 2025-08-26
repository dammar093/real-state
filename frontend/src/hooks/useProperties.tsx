"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  setProperties,
  setLoading,
  setError,
  setPage,
  setTotal,
  setSearch,
  setSort,
  setLimit,
} from "@/redux/feature/propertySlice";
import { getProperties } from "@/api/property/property";

const useProperties = () => {
  const dispatch = useDispatch();
  const { properties, loading, error, page, limit, search, sort, total } =
    useSelector((state: RootState) => state.property);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data = await getProperties({
          page,
          limit,
          search: debouncedSearch,
          sort,
        });

        dispatch(setProperties(data.data.properties));
        dispatch(setTotal(data.data.pagination.total));
        dispatch(setPage(data.data.pagination.page));
        dispatch(setLimit(data.data.pagination.limit));
      } catch (err: any) {
        dispatch(setError(err.response?.data?.message || err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProperties();
  }, [dispatch, page, limit, debouncedSearch, sort]);

  return {
    properties,
    loading,
    error,
    page,
    total,
    limit,
    search,
    sort,
    setSearchTerm: (term: string) => {
      dispatch(setSearch(term));
      dispatch(setPage(1));
    },
    setSortOrder: (order: "asc" | "desc") => dispatch(setSort(order)),
    setCurrentPage: (pageNumber: number) => dispatch(setPage(pageNumber)),
    setLimitNumber: (limitNumber: number) => dispatch(setLimit(limitNumber)),
  };
};

export default useProperties;
