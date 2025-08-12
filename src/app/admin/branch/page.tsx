"use client";
import { DataTable } from "@/components/ui/data-table";
import { branchColumns } from "./columns";
import { useGetBranchData } from "../api/useGetBranchData";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { mockBranch } from "@/mock/branchData";

export default function BranchPage() {
    const { data, isLoading, isError } = useGetBranchData();

    if (isError) {
        toast("Lỗi khi tải dữ liệu chi nhánh. Đang sử dụng dữ liệu mẫu...");
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Quản lý chi nhánh</h1>

            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-800" />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Thêm chi nhánh
                        </Button>
                    </div>
                    <DataTable
                        columns={branchColumns}
                        data={data ? data : (mockBranch as unknown as Branch[])}
                    />
                </>
            )}
        </div>
    );
}
