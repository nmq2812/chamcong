import { roleData } from "@/mock/rolePermissionData";
import { useQuery } from "@tanstack/react-query";

export const useGetRolesData = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["rolesData"],
        queryFn: async () => {
            // Simulate fetching data from an API
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(roleData);
                }, 500);
            });
        },
    });
    return { data, isLoading, isError, error };
}
