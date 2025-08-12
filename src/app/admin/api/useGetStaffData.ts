import { apiInstance } from "@/lib/axios";
import { staffData } from "@/mock/staffData";
import { useQuery } from "@tanstack/react-query";

export const useGetStaffData = () => {
    const res = useQuery({
        queryKey: ["staffData"],
        queryFn: async () => {
            // Simulate an API call
            const response = await apiInstance.get("/branches")
            return response.data;
        },
    });
    return res;
};
