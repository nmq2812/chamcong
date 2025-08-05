"use client";
import { DataTable } from "@/components/ui/data-table";
import { branchColumns } from "./columns";
import { getBranchData } from "../api/getBranchData";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BranchPage() {
    const { data, isLoading, isError } = getBranchData();

    if (isLoading) {
        return <Skeleton className="w-4 h-4 rounded-md text-gray-400" />;
    }
    if (isError) {
        return <div>Error loading branch data.</div>;
    }
    return (
        <div className="container w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">Quản lý chi nhánh</h1>
            <div className="flex justify-between mb-6">
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm chi nhánh
                </Button>
            </div>
            <DataTable columns={branchColumns} data={data as Branch[]} />
        </div>
    );
}
