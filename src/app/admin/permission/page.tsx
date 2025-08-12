"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPermissionData } from "../api/useGetPermissionData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { permissionData } from "@/mock/rolePermissionData";
import { UserPlus } from "lucide-react";
import { PermissionColumn } from "./column";

function permissionPage() {
    const { data, isLoading, isError, error } = useGetPermissionData();

    isError &&
        toast(
            `Error loading permissions data: ${
                error.message || "Unknown error"
            }`,
        );

    return (
        <div className="container w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">Quản lý Quyền</h1>

            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-400" />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Thêm quyền
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

export default permissionPage;
