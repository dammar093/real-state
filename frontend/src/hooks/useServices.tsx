"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServicesStart,
  fetchServicesSuccess,
  fetchServicesFailure,
} from "@/redux/feature/serviceSlice";
import { RootState } from "@/redux/store/store";
import { PropertyService } from "@/types/property";
import { getServices } from "@/api/service/service";

const useServices = () => {
  const dispatch = useDispatch();
  const { services, loading, error, page, total } = useSelector(
    (state: RootState) => state.services
  );

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        dispatch(fetchServicesStart());
        const res = await getServices();
        const data: PropertyService[] = res.data.services;
        dispatch(
          fetchServicesSuccess({
            services: data,
            total: res.data.pagination.total,
            page: res.data.pagination.page || 1,
          })
        );
      } catch (err: any) {
        dispatch(
          fetchServicesFailure(err.message || "Error fetching services")
        );
      }
    };
    fetchAllServices();
  }, [dispatch]);

  return { services, loading, error, page, total };
};

export default useServices;
