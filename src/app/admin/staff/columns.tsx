import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { mockBranch } from "@/mock/branchData";
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
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
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
        accessorKey: "name",
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
            const branchName =
                mockBranch.find((branch) => branch.id === branchId)?.name ||
                "Không xác định";
            return <span>{branchName}</span>;
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return (
                <a
                    href={`mailto:${email}`}
                    className="text-blue-600 hover:underline"
                >
                    {email}
                </a>
            );
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
            const status = row.getValue("active") as boolean;
            return (
                <Badge
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {status ? "ACTIVE" : "INACTIVE"}
                </Badge>
            );
        },
    },
];
