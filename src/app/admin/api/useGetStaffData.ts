import { staffData } from '@/mock/staffData';
import { useQuery } from '@tanstack/react-query';

export const useGetStaffData = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['staffData'],
        queryFn: async () => {
            // Simulate an API call
            return new Promise((resolve) => {
                setTimeout(() => resolve(staffData), 1000);
            });
        },
    });
    return { data, isLoading, isError };
};