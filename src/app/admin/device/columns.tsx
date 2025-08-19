import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const DeviceColumns: ColumnDef<Device>[] = [
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
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên thiết bị" />
        ),
    },
    {
        accessorKey: "branchName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Chi nhánh" />
        ),
    },

    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return date.toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
        },
    },
    {
        accessorKey: "active",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Trạng thái hoạt động"
            />
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
