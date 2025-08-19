"use client";
import { DataTable } from "@/components/ui/data-table";
import { branchColumns } from "./columns";
import { useGetBranchData } from "../api/useGetBranchData";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { mockBranch } from "@/mock/branchData";
import { translate } from "@/lib/translate/translate";
import React from "react";
import AddBranchForm from "./addForm";

export default function BranchPage() {
    const { data, isLoading, isError } = useGetBranchData();

    React.useEffect(() => {
        if (isError) {
            toast("Lỗi khi tải dữ liệu chi nhánh. Đang sử dụng dữ liệu mẫu...");
        }
    }, [isError]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                {translate("Branch Management")}
            </h1>

            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-800" />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <AddBranchForm />
                    </div>
                    <DataTable
                        columns={branchColumns}
                        data={!isError ? (data || []) : (mockBranch as unknown as Branch[])}
                    />
                </>
            )}
        </div>
    );
}
