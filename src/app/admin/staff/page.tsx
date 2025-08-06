"use client";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { staffColumns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStaffData } from "../api/useGetStaffData";

export default function StaffPage() {
    const { data: staffData, isLoading, isError } = useGetStaffData();

    if (isLoading) {
        return <Skeleton className="w-4 h-4 rounded-md text-gray-400" />;
    }

    if (isError) {
        return <div>Error loading staff data.</div>;
    }

    return (
        <div className="container w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">Quản lý nhân viên</h1>

            {/* Search and actions */}
            <div className="flex justify-between mb-6">
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm nhân viên
                </Button>
            </div>

            {/* Staff table */}

            <DataTable
                columns={staffColumns}
                data={staffData as Staff[]}
            ></DataTable>
        </div>
    );
}
