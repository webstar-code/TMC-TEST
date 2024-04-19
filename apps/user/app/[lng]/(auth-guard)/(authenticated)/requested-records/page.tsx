"use client";

import { useUserStore } from "lib/store";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from "ui";
import { ROUTES } from "utils/routes";

interface RecordsRequest {
  id: string;
  clinic: string;
  clinicAddress?: string;
  clinicId: string;
  status: "completed" | "pending" | "rejected";
  createdAt: string;
}

export default function RequestedRecordsPage() {
  const { user } = useUserStore();
  const [requests] = useState<RecordsRequest[]>([
    {
      id: "123456789",
      clinic: "GNMI Clinic",
      clinicId: "123",
      status: "completed",
      createdAt: "10, Sept, 2023 ",
    },
    {
      id: "123456789",
      clinic: "GNMI Clinic",
      clinicId: "123",
      status: "pending",
      createdAt: "10, Sept, 2023 ",
    },
    {
      id: "123456789",
      clinic: "GNMI Clinic",
      clinicId: "123",
      status: "rejected",
      createdAt: "10, Sept, 2023 ",
    },
  ]);
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="container w-full h-16 border flex justify-end items-center">
        <h1>{user?.email}</h1>
      </div>
      <div className="container py-8 flex flex-col gap-10">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold">Requested Records</h1>
          <Link href={ROUTES.requestedRecords + "/new"}>
            <Button>Request Records</Button>
          </Link>
        </div>

        <div className="">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="text-primary font-semibold bg-white">
                  S.No
                </TableHead>
                <TableHead className="text-primary font-semibold bg-white">
                  Request Id
                </TableHead>
                <TableHead className="text-primary font-semibold bg-white">
                  Request Date
                </TableHead>
                <TableHead className="text-primary font-semibold bg-white">
                  Clinic
                </TableHead>
                <TableHead className="text-primary font-semibold bg-white">
                  Status
                </TableHead>
                <TableHead className="bg-white"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={request.id} className="border-0 cursor-pointer">
                  <TableCell
                    onClick={() =>
                      router.push(ROUTES.requestedRecords + "/" + request.id)
                    }
                    className="py-2 font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      router.push(ROUTES.requestedRecords + "/" + request.id)
                    }
                    className="py-2 font-medium">
                    {request.id}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      router.push(ROUTES.requestedRecords + "/" + request.id)
                    }
                    className="py-2 font-medium">
                    {request.createdAt}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      router.push(ROUTES.requestedRecords + "/" + request.id)
                    }
                    className="py-2 font-medium">
                    {request.clinic}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      router.push(ROUTES.requestedRecords + "/" + request.id)
                    }
                    className={cn(
                      "py-2 font-medium capitalize",
                      request.status === "completed" && "text-green-400",
                      request.status === "pending" && "text-yellow-400",
                      request.status === "rejected" && "text-red-400"
                    )}>
                    {request.status}
                  </TableCell>
                  <TableCell className="py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View record</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
