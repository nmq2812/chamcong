"use client";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { staffColumns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStaffData } from "../api/useGetStaffData";
import { toast } from "sonner";
import { staffData } from "@/mock/staffData";

export default function StaffPage() {
    const { data, isLoading, isError } = useGetStaffData();

    if (isError) {
        toast("Lỗi khi tải dữ liệu nhân viên. Đang sử dụng dữ liệu mẫu...");
    }

    return (
        <div className="container w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">Quản lý nhân viên</h1>

            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-800" />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Thêm nhân viên
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
