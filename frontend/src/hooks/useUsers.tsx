// hooks/useUsers.ts
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchUsers } from "@/redux/feature/userSlice";

const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, page, total } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return { users, loading, error, page, total };
};

export default useUsers;
