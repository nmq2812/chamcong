'use client';
import { apiInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDeviceData = () => {
    const res = useQuery({
        queryKey: ["deviceData"],
        queryFn: async () => {
            const response = await apiInstance.get("/devices");
            return response.data;
        },
    });

    return res;
};
