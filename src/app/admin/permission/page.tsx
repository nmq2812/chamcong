"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPermissionData } from "../api/useGetPermissionData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { permissionData } from "@/mock/rolePermissionData";
import { UserPlus } from "lucide-react";
import { PermissionColumn } from "./column";
import { translate } from "@/lib/translate/translate";

function PermissionPage() {
    const { data, isLoading, isError } = useGetPermissionData();

    if (isError) {
        toast("Error loading permission data. Using mock data...");
    }

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
                        <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            {translate("Add Permission")}
                        </Button>
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
