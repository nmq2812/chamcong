import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { branchData } from "@/mock/branchData";
import { ColumnDef } from "@tanstack/react-table";

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
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        enableHiding: false,
        enableSorting: false,
        cell: ({ row }) => row.getValue("id"),
    },
    {
        accessorKey: "username",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên nhân viên" />
        ),
    },
    {
        accessorKey: "branchId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Chi nhánh" />
        ),
        cell: ({ row }) => {
            const branchId = row.getValue("branchId") as string | number;
            // Assuming you have a function to get branch name by ID
            const branchName = branchData.find(branch => branch.id === branchId)?.name || "Không xác định";
            return <span>{branchName}</span>;
        }
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
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày gia nhập" />
        ),
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as Date;
            return date ? new Date(date).toLocaleDateString("vi-VN") : "";
        },
    },
    {
        accessorKey: "active",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Trạng thái" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("active") as string;
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status === "Đang làm việc" ? "bg-green-100 text-green-800" :
                    status === "Tạm nghỉ" ? "bg-yellow-100 text-yellow-800" :
                    status === "Đã nghỉ việc" ? "bg-red-100 text-red-800" :
                    "bg-gray-100 text-gray-800"
                }`}>
                    {status}
                </span>
            );
        },
    },
]