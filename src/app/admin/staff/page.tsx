"use client";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { staffColumns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStaffData } from "../api/useGetStaffData";
import { toast } from "sonner";
import { staffData } from "@/mock/staffData";
import { translate } from "@/lib/translate/translate";
import React from "react";
import { apiInstance } from "@/lib/axios";

export default function StaffPage() {
    const { data, isLoading, isError } = useGetStaffData();

    React.useEffect(() => {
        if (isError) {
            toast("Error loading staff data. Using mock data...");
        }
    }, [isError]);

    console.log(apiInstance.defaults.baseURL);

    return (
        <div className="container w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">{translate("Staff Management")}</h1>

            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-800" />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            {translate("Add Staff")}
                        </Button>
                    </div>

                    <DataTable
                        columns={staffColumns}
                        data={data ? data : (staffData as unknown as Staff[])}
                    />
                </>
            )}
        </div>
    );
}
