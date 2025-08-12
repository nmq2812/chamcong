import { useQuery } from "@tanstack/react-query";

export const useGetPermissionData = () => {
    const res = useQuery({
        queryKey: ["permissionsData"],
        queryFn: async () => {
            const response = await fetch('/api/permissions');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });

    return res;
};