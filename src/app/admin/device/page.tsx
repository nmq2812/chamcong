"use client";
import { toast } from "sonner";
import { useGetDeviceData } from "../api/useGetDeviceData";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { UserPlus } from "lucide-react";
import { DeviceColumns } from "./columns";
import { deviceData } from "@/mock/deviceData";
import { Skeleton } from "@/components/ui/skeleton";

const DevicePage = () => {
    const { data, isLoading: isDeviceLoading, isError: isDeviceError } = useGetDeviceData();

    if (isDeviceLoading) {
        return <Skeleton className="w-4 h-4 rounded-md text-gray-800"></Skeleton>;
    }

    if (isDeviceError) {
        toast("Error loading data. Using mock data...");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Quản lý thiết bị</h1>
            <div className="flex justify-between mb-6">
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm thiết bị
                </Button>
            </div>
            <DataTable
                columns={DeviceColumns}
                data={data ? data : deviceData}
            />
        </div>
    );
};

export default DevicePage;
