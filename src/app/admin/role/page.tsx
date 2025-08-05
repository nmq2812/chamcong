"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { UserPlus } from "lucide-react";
import { roleColumns } from "./column";
import { getRolesData } from "../api/getRolePermission";
import { Skeleton } from "@/components/ui/skeleton";

export default function RolePage() {
const { data: roleData, isLoading, isError } = getRolesData();

    if (isLoading) {
        return <Skeleton className="w-4 h-4 rounded-md text-gray-400" />;
    }
    if (isError) {
        return <div>Error loading staff data.</div>;
    }

    return (
        <div className="container w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">Quản lý Chức vụ</h1>

            {/* Search and actions */}
            <div className="flex justify-between mb-6">
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm Chức vụ
                </Button>
            </div>

            {/* Staff table */}

            <DataTable
                columns={roleColumns}
                data={roleData as Role[]}
            ></DataTable>
        </div>
    );
}
