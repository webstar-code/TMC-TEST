"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export interface Enquiry {
  id: string;
  createdAt: Date;
  email: string;
  message: string;
  name: string;
  phoneNumber: string;
  role: string;
  status: string;
}

export const columns: ColumnDef<Enquiry>[] = [
  {
    accessorKey: "Sno",
    header: "S.No",
  },
  {
    accessorKey: "id",
    header: "Enquiry ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email ID",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "status",
    header: "",
  },
];
