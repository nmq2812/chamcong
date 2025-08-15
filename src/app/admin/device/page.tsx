"use client";
import { toast } from "sonner";
import { useGetDeviceData } from "../api/useGetDeviceData";
import { DataTable } from "@/components/ui/data-table";
import { DeviceColumns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { translate } from "@/lib/translate/translate";
import React from "react";
import AddDeviceForm from "./addForm";
import { mockDevice } from "@/mock/deviceData";
import { useGetBranchData } from "../api/useGetBranchData";
import { mockBranch } from "@/mock/branchData";

const DevicePage = () => {
    const { data, isLoading, isError } = useGetDeviceData();
    const { data: branchData } = useGetBranchData();
    const [deviceData, setDeviceData] = React.useState<DeviceDisplay[]>([]);

    React.useEffect(() => {
        if (isError) {
            toast("Error loading device data. Using mock data...");
        }
    }, [isError]);

    React.useEffect(() => {
        setDeviceData((data ? data : mockDevice).map((device: Device) => ({
            ...device,
            branchName: (branchData ? branchData : mockBranch).find((b: Branch) => b.id === device.branchId)?.name || "Unknown Branch",
        })));
    }, [data, branchData]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">{translate("Device Management")}</h1>
            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-800"></Skeleton>
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <AddDeviceForm branchData={branchData ? branchData : mockBranch} deviceData={deviceData ? deviceData : []} setDeviceData={setDeviceData}/>
                    </div>
                    <DataTable
                        columns={DeviceColumns}
                        data={deviceData? deviceData : []}
                    />
                </>
            )}
        </div>
    );
};

export default DevicePage;
