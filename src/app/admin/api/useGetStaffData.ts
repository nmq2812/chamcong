import { apiInstance } from "@/lib/axios";
import { staffData } from "@/mock/staffData";
import { useQuery } from "@tanstack/react-query";

export const useGetStaffData = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["staffData"],
        queryFn: async () => {
            // Simulate an API call
            apiInstance.get("/branches").then((response) => {
                return response.data;
            });
        },
    });
    return { data, isLoading, isError };
};
