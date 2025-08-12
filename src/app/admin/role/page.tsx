"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { UserPlus } from "lucide-react";
import { roleColumns } from "./column";
import { useGetRolesData } from "../api/useGetRoleData";
import { Skeleton } from "@/components/ui/skeleton";
import { roleData } from "@/mock/rolePermissionData";
import { toast } from "sonner";
import { translate } from "@/lib/translate/translate";

export default function RolePage() {
    const { data, isLoading, isError } = useGetRolesData();

    if (isError) {
        toast("Lỗi khi tải dữ liệu chức vụ. Đang sử dụng dữ liệu mẫu...");
    }

    return (
        <div className="container w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">{translate("Role Management")}</h1>

            {isLoading ? (
                <Skeleton className="w-1/2 h-8 rounded-md text-gray-400" />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            {translate("Add Role")}
                        </Button>
                    </div>

                    <DataTable
                        columns={roleColumns}
                        data={data ? data : roleData as Role[]}
                    />
                </>
            )}
        </div>
    );
}
