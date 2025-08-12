import { apiInstance } from "@/lib/axios";
import { roleData } from "@/mock/rolePermissionData";
import { useQuery } from "@tanstack/react-query";

export const useGetRolesData = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["rolesData"],
        queryFn: async () => {
            const response = await apiInstance.get("/roles");
            return response.data;
        },
    });
    return { data, isLoading, isError, error };
}
