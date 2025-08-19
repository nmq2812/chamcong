'use client';
import { get } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBranchData = () => {
    const res = useQuery({
        queryKey: ["mockBranch"],
        queryFn: () => get<Branch[]>("/branches"),
    });
    return res;
};
