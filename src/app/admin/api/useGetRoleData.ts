"use client";
import { apiInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetRolesData = () => {
    const res = useQuery({
        queryKey: ["rolesData"],
        queryFn: async () => {
            const response = await apiInstance.get("/roles");
            return response.data;
        },
    });
    return res;
}
