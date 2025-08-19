"use client";
import { get } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetRolesData = () => {
    const res = useQuery({
        queryKey: ["rolesData"],
        queryFn: () => get<Role[]>("/roles"),
    });
    return res;
}
