'use client';
import { apiInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDeviceData = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["deviceData"],
        queryFn: async () => {
            const response = await apiInstance.get("/devices");
            return response.data;
        },
    });

    return { data, isLoading, isError };
};
