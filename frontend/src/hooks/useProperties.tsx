"use client";
import { useEffect } from "react";
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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const data = await getProperties({ page, limit, search, sort });
        dispatch(setProperties(data?.data?.properties));
        dispatch(setTotal(data?.data?.pagination?.total));
        dispatch(setPage(data?.data?.pagination?.page));
        dispatch(setLimit(data?.data?.pagination?.limit));
      } catch (err: any) {
        dispatch(setError(err.response?.data?.message || err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProperties();
  }, [dispatch, page, limit, search, sort]);

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
    refetch: () => {}, // optional, can call fetchProperties directly if needed
  };
};

export default useProperties;
