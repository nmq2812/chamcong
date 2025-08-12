"use client";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "./input";
import { DataTablePagination } from "../data-table-pagination";
import React from "react";
import { DataTableViewOptions } from "../data-table-view-option";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});

    // State để lưu cột được chọn để tìm kiếm
    const [selectedColumn, setSelectedColumn] = React.useState<string>("");
    const [searchValue, setSearchValue] = React.useState<string>("");
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    // Lấy danh sách các cột có thể tìm kiếm (loại bỏ cột actions, select, v.v.)
    const searchableColumns = table
        .getAllColumns()
        .filter(
            (column) =>
                column.getCanFilter() &&
                column.id !== "select" &&
                column.id !== "actions" &&
                column.id !== "branchId" &&
                column.id !== "createdAt" &&
                column.id !== "activeStatus",
        );

    // Đặt cột đầu tiên làm mặc định nếu chưa chọn
    React.useEffect(() => {
        if (!selectedColumn && searchableColumns.length > 0) {
            setSelectedColumn(searchableColumns[0].id);
        }
    }, [selectedColumn, searchableColumns]);

    // Xử lý thay đổi tìm kiếm
    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        if (selectedColumn) {
            setColumnFilters([{ id: selectedColumn, value }]);
        }
    };

    // Xử lý thay đổi cột tìm kiếm
    const handleColumnChange = (columnId: string) => {
        setSelectedColumn(columnId);
        // Reset filter cũ và áp dụng filter mới
        setColumnFilters([{ id: columnId, value: searchValue }]);
    };

    return (
        <div>
            <DataTableViewOptions table={table} />
            <div className="flex items-center gap-2 py-4">
                <Select
                    value={selectedColumn}
                    onValueChange={handleColumnChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Chọn trường tìm kiếm" />
                    </SelectTrigger>
                    <SelectContent>
                        {searchableColumns.map((column) => (
                            <SelectItem key={column.id} value={column.id}>
                                {typeof column.columnDef.header === "string"
                                    ? column.columnDef.header
                                    : column.id}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input
                    placeholder={`Tìm kiếm...`}
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="flex-1"
                />
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}></DataTablePagination>
        </div>
    );
}
