import { get } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetStaffData = () => {
    const res = useQuery({
        queryKey: ["staffData"],
        queryFn: () => get<Staff[]>("/users"),
    });
    return res;
};
