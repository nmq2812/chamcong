import { apiInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBranchData = () => {
    const res = useQuery({
        queryKey: ["mockBranch"],
        queryFn: async () => {
            const response = await apiInstance.get("/branches");
            return response.data;
        },
    });
    return res;
};
