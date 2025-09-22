"use client";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  createCategoryThunk,
  deleteCategoryThunk,
  fetchActiveCategories,
  fetchCategories,
  getCategoryByIdThunk,
  toggleCategory,
  updateCategoryThunk,
} from "@/redux/feature/categorySlice";
import { useRouter } from "next/navigation";

const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { categories, loading, error, category, activeCategories } =
    useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchActiveCategories());
  }, [dispatch]);

  const createCategory = useCallback(
    (values: { name: string }) => {
      dispatch(createCategoryThunk(values))
        .unwrap()
        .then(() => {
          router.back();
        });
    },
    [dispatch, router]
  );
  const toggleCategoryStatus = useCallback(
    (values: { id: number; isActive: boolean }) => {
      dispatch(toggleCategory({ id: values.id, active: values.isActive }));
    },
    [dispatch]
  );
  const deleteCategory = useCallback(
    (id: number) => {
      dispatch(deleteCategoryThunk(id));
    },
    [dispatch]
  );
  const getCategory = useCallback(
    (id: number) => {
      dispatch(getCategoryByIdThunk(id));
    },
    [dispatch]
  );
  const updateCategory = useCallback(
    async (id: number, values: { name: string }) => {
      dispatch(updateCategoryThunk({ id, name: values.name })).then(() => {
        router.back();
      });
    },
    [dispatch, router]
  );

  return {
    categories,
    loading,
    error,
    createCategory,
    toggleCategoryStatus,
    deleteCategory,
    getCategory,
    category,
    updateCategory,
    activeCategories,
  };
};

export default useCategories;
