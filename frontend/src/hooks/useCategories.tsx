"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store/store";
import { CategoryItem } from "@/types/category";
import { getCategories } from "@/api/api";
import { fetchCategories } from "@/redux/feature/categorySlice";

const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error, total } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  return { categories, loading, error, total };
};

export default useCategories;
