import { branchData } from "@/mock/branchData";
import { useQuery } from "@tanstack/react-query";

export const getBranchData = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["branchData"],
        queryFn: async () => {
            // Simulate fetching data from an API
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(branchData);
                }, 500);
            });
        },
    });
    return { data, isLoading, isError, error };
};
