"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Icons } from "components/Icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

import { Button } from "ui";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();
  return (
    <div className="">
      <Table className="border border-none">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="text-primary font-bold" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell, ind) => {
                  if (cell.column.id === "last") {
                    return (
                      <TableCell
                        key={cell.id}
                        className="flex flex-row gap-3 justify-center cursor-pointer">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <Icons.threeDots />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <div>
                              <DropdownMenuItem
                                // onClick={() => {
                                //     handleClick(row.original.id);
                                // }}>
                                onClick={() => {
                                  router.push(`clinics-management/${cell.id}`);
                                }}>
                                View
                              </DropdownMenuItem>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    );
                  }
                  if (cell.column.id === "created_date") {
                    return (
                      <TableCell
                        // onClick={() => {
                        //     handleClick(row.original.id);
                        // }}
                        key={cell.id}
                        className="mt-4 w-[120px] cursor-pointer">
                        {format(new Date(cell.getValue()), "d, MMM yyyy")}
                      </TableCell>
                    );
                  }
                  if (cell.column.id === "sno") {
                    return (
                      <TableCell
                        // onClick={() => {
                        //     handleClick(row.original.id);
                        // }}
                        key={cell.id}
                        className="cursor-pointer">
                        {ind + 1}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      // onClick={() => {
                      //     handleClick(row.original.id);
                      // }}
                      className="cursor-pointer"
                      key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
