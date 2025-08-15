"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPermissionData } from "../api/useGetPermissionData";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { permissionData } from "@/mock/rolePermissionData";
import { PermissionColumn } from "./column";
import { translate } from "@/lib/translate/translate";
import React from "react";
import AddPermissionForm from "./addForm";

function PermissionPage() {
    const { data, isLoading, isError } = useGetPermissionData();

    React.useEffect(() => {
        if (isError) {
            toast("Error loading permission data. Using mock data...");
        }
    }, [isError]);

    return (
        <div className="container w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">
                {translate("Permission Management")}
            </h1>

            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-400" />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <AddPermissionForm />
                    </div>

                    <DataTable
                        columns={PermissionColumn}
                        data={data ? data : permissionData}
                    />
                </>
            )}
        </div>
    );
}

export default PermissionPage;
