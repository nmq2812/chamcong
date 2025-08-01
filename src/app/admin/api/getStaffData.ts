import { staffData } from '@/mock/staffData';
import { useQuery } from '@tanstack/react-query';

export const getStaffData = () => {
    return useQuery({
        queryKey: ['staffData'],
        queryFn: async () => {
            // Simulate fetching data from an API
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(staffData);
                }, 500);
            });
        },
    })
};