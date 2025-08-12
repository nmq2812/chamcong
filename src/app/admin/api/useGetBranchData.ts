import { apiInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBranchData = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["mockBranch"],
        queryFn: async () => {
            const response = await apiInstance.get("/branches");
            return response.data;
        },
    });
    return { data, isLoading, isError, error };
};
