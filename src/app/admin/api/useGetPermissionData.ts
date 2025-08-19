'use client';
import { get } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetPermissionData = () => {
    const res = useQuery({
        queryKey: ["permissionsData"],
        queryFn: () => get<Permission[]>("/permissions"),
    });

    return res;
};