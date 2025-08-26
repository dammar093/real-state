"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "@/redux/feature/categorySlice";
import { RootState } from "@/redux/store/store";
import { Category } from "@/types/category";
import { getCategories } from "@/api/api";

const useCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(fetchCategoriesStart());
        const res = await getCategories();
        const data: Category[] = await res.data?.categories;
        dispatch(
          fetchCategoriesSuccess({
            categories: data,
            total: res.data?.total,
            page: res.data?.page,
          })
        );
      } catch (err: any) {
        dispatch(
          fetchCategoriesFailure(err.message || "Error fetching categories")
        );
      }
    };

    fetchCategories();
  }, [dispatch]);

  return { categories, loading, error };
};

export default useCategories;
