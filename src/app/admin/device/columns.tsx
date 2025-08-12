import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { mockBranch } from "@/mock/branchData";
import { Checkbox } from "@radix-ui/react-checkbox";
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
        accessorKey: "activeStatus",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Trạng thái hoạt động"
            />
        ),
    },
];
