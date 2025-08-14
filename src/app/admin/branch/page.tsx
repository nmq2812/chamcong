"use client";
import { DataTable } from "@/components/ui/data-table";
import { branchColumns } from "./columns";
import { useGetBranchData } from "../api/useGetBranchData";
import { UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { mockBranch } from "@/mock/branchData";
import { translate } from "@/lib/translate/translate";
import React from "react";
import { DialogHeader } from "@/components/ui/dialog";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@radix-ui/react-dialog";
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
                        <Dialog>
                            <DialogTrigger>
                                <UserPlus className="h-4 w-4 mr-2" />
                                {translate("Add Branch")}
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Branch</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click
                                        save when you&apos;re done.
                                    </DialogDescription>
                                </DialogHeader>
                                <AddBranchForm/>
                                
                            </DialogContent>
                        </Dialog>
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
