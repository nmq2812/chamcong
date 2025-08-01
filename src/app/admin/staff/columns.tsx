import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { table } from "console";

export type Staff = {
    id: number;
    name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    joinDate: Date;
    status: "Đang làm việc" | "Nghỉ phép" | "Tạm nghỉ";
};

export const staffColumns: ColumnDef<Staff>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox 
                checked={
                    table.getIsAllPageRowsSelected() || 
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox 
                checked={row.getIsSelected()} 
                onCheckedChange={(value) => row.toggleSelected(!!value)} 
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên nhân viên" />
        ),
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Chức vụ" />
        ),
    },
    {
        accessorKey: "department",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phòng ban" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>;
        },
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Số điện thoại" />
        ),
        cell: ({ row }) => {
            const phone = row.getValue("phone") as string;
            // Format phone number if needed
            return phone;
        },
    },
    {
        accessorKey: "joinDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày gia nhập" />
        ),
        cell: ({ row }) => {
            const date = row.getValue("joinDate") as Date;
            return date ? new Date(date).toLocaleDateString("vi-VN") : "";
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Trạng thái" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status === "Đang làm việc" ? "bg-green-100 text-green-800" :
                    status === "Tạm nghỉ" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                }`}>
                    {status}
                </span>
            );
        },
    },
]