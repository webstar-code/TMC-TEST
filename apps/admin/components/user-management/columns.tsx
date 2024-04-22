"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Clinic = {
  id: string;
  city: string;
  created_date: string;
  email: string;
  logo: string | null;
  org_code: string;
  org_name: string;
  org_type: string;
  phone: string;
  postcode: string;
  streetaddress: string;
  updated_date: string | null;
};

export const columns: ColumnDef<Clinic>[] = [
  {
    accessorKey: "sno",
    header: "Sno",
  },
  {
    accessorKey: "logo",
    header: "Logo",
  },
  {
    accessorKey: "org_name",
    header: "Name",
  },
  {
    accessorKey: "streetaddress",
    header: "Address",
  },
  {
    accessorKey: "created_date",
    header: "Joining Date",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "last",
    header: "",
  },
];
