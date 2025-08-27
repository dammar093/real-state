// hooks/useUsers.ts
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "@/redux/feature/userSlice"; // adjust path if needed
import { RootState } from "@/redux/store/store";
import { User } from "@/types/property";
import { getUsers } from "@/api/user/user";

const useUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error, page, total } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(fetchUsersStart());
        const res = await getUsers();
        console.log(res.data);
        const data: User[] = res.data?.users;
        dispatch(
          fetchUsersSuccess({
            users: data,
            total: res.data?.pagination?.totalUsers,
            page: res.data?.pagination?.totalPage,
          })
        );
      } catch (err: any) {
        dispatch(fetchUsersFailure(err.message || "Error fetching users"));
      }
    };

    fetchUsers();
  }, [dispatch]);

  return { users, loading, error, page, total };
};

export default useUsers;
