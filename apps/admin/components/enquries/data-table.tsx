"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "ui";
import { Input } from "ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";
import { format } from "date-fns";
import { enquiryApi } from "api/enquiryApi";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";
import { Icons } from "components/Icons";
import { usePathname, useRouter } from "next/navigation";

interface DataTableProps<Enquiry, TValue> {
  columns: ColumnDef<Enquiry, TValue>[];
  data: Enquiry[];
  type: string;
  refetch: () => void;
  isActive: boolean;
  setIsActive: Function;
  selectedDateOption: string;
  selectedNameOption: string;
  setSelectedDateOption: Function;
  setSelectedNameOption: Function;
}

export function DataTable<Enquiry, TValue>({
  columns,
  data,
  type,
  refetch,
  isActive,
  setIsActive,
  selectedDateOption,
  selectedNameOption,
  setSelectedDateOption,
  setSelectedNameOption,
}: DataTableProps<Enquiry, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleButtonClick = async (id: string) => {
    toast("Status changed to the resolved");
    enquiryApi.updateEnquiry(id);
    refetch();
  };

  const handleClick = (id: string) => {
    router.push(`/enquires/${id}`);
  };

  return (
    <div className="rounded-md w-[100%] md:block hidden">
      {/* <div className="py-2 w-[40%]">
        <Input
          placeholder="Search by Enquiry ID..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="w-[100%] text-black"
        />
      </div> */}
      <Table className="border border-none">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableHead className="text-primary font-bold" key={header.id}>
                  {header.isPlaceholder ? null : header.column.id === "name" ? (
                    <div className="flex items-center">
                      <span className="mr-2">
                        {header.column.columnDef.header}
                      </span>
                      <div className="flex flex-col items-center gap-[2px] cursor-pointer z-50">
                        <div
                          onClick={() => {
                            setSelectedNameOption("az");
                          }}>
                          <Icons.upperSort />
                        </div>
                        <div
                          onClick={() => {
                            setSelectedNameOption("za");
                          }}>
                          <Icons.downSort />
                        </div>
                      </div>
                    </div>
                  ) : header.column.id === "createdAt" ? (
                    <div className="flex items-center">
                      <span className="mr-2">
                        {header.column.columnDef.header}
                      </span>
                      <div className="flex flex-col items-center gap-[2px] cursor-pointer">
                        <div
                          onClick={() => {
                            setSelectedDateOption("no");
                          }}>
                          <Icons.upperSort />
                        </div>
                        <div
                          onClick={() => {
                            setSelectedDateOption("on");
                          }}>
                          <Icons.downSort />
                        </div>
                      </div>
                    </div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table
            .getRowModel()
            .rows.filter((row: any) => row.original.status === type) // Filter rows by status
            .map((row: any, ind: number) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border border-none">
                {row.getVisibleCells().map((cell: any) => {
                  if (cell.column.id === "status") {
                    return (
                      <TableCell
                        key={cell.id}
                        onClick={() => {
                          handleClick(row.original.id);
                        }}
                        className="flex flex-row gap-3 justify-center cursor-pointer">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <Icons.threeDots />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {type === "active" && (
                              <div>
                                <DropdownMenuItem
                                  onClick={() => {
                                    handleClick(row.original.id);
                                  }}>
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    handleButtonClick(row.original.id);
                                  }}>
                                  Mark As Resolved
                                </DropdownMenuItem>
                              </div>
                            )}
                            {type === "resolved" && (
                              <div>
                                <DropdownMenuItem
                                  onClick={() => {
                                    handleClick(row.original.id);
                                  }}>
                                  View
                                </DropdownMenuItem>
                              </div>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    );
                  }
                  if (cell.column.id === "createdAt") {
                    return (
                      <TableCell
                        onClick={() => {
                          handleClick(row.original.id);
                        }}
                        key={cell.id}
                        className="mt-4 w-[120px] cursor-pointer">
                        {format(new Date(cell.getValue()), "d, MMM yyyy")}
                      </TableCell>
                    );
                  }
                  if (cell.column.id === "Sno") {
                    return (
                      <TableCell
                        onClick={() => {
                          handleClick(row.original.id);
                        }}
                        key={cell.id}
                        className="cursor-pointer">
                        {ind + 1}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      onClick={() => {
                        handleClick(row.original.id);
                      }}
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
            ))}
          {table.getRowModel().rows.length === 0 && ( // Render a row indicating no results if there are no rows to display
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
