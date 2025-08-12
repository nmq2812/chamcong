'use client';
import { apiInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDeviceData = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["deviceData"],
        queryFn: async () => {
            // Simulate fetching data from an API
            apiInstance
                .get("/devices")
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });
        },
    });

    return { data, isLoading, isError };
};
