"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Staff, staffColumns } from "./columns";
import { getStaffData } from "../api/getStaffData";

export default function StaffPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const {data, isLoading, isError} = getStaffData();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading staff data.</div>;
    }

    // Filter staff based on search term
    const filteredStaff: Array<Staff> = (data as Staff[])?.filter(
        (staff) =>
            staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.department.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-6">Quản lý nhân viên</h1>

            {/* Search and actions */}
            <div className="flex justify-between mb-6">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        placeholder="Tìm kiếm nhân viên..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit">
                        <Search className="h-4 w-4 mr-2" />
                        Tìm kiếm
                    </Button>
                </div>
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm nhân viên
                </Button>
            </div>

            {/* Staff table */}
            <div className="rounded-md border">
                <DataTable columns={staffColumns} data={filteredStaff}>
                </DataTable>
            </div>
        </div>
    );
}
