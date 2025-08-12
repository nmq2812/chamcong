"use client";
import { toast } from "sonner";
import { useGetDeviceData } from "../api/useGetDeviceData";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { UserPlus } from "lucide-react";
import { DeviceColumns } from "./columns";
import { deviceData } from "@/mock/deviceData";
import { Skeleton } from "@/components/ui/skeleton";
import { translate } from "@/lib/translate/translate";
import React from "react";

const DevicePage = () => {
    const { data, isLoading, isError } = useGetDeviceData();

    React.useEffect(() => {
        if (isError) {
            toast("Error loading device data. Using mock data...");
        }
    }, [isError]);
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">{translate("Device Management")}</h1>
            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-800"></Skeleton>
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <Button variant='default'>
                            <UserPlus className="h-4 w-4 mr-2" />
                            {translate("Add Device")}
                        </Button>
                    </div>
                    <DataTable
                        columns={DeviceColumns}
                        data={data ? data : deviceData}
                    />
                </>
            )}
        </div>
    );
};

export default DevicePage;
