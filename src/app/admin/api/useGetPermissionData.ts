'use client';
import { apiInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetPermissionData = () => {
    const res = useQuery({
        queryKey: ["permissionsData"],
        queryFn: async () => {
            const response = await apiInstance.get("/permissions");
            return response.data;
        },
    });

    return res;
};