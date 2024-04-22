"use client";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "ui";
import { db } from "utils/firebase";
import { Icons } from "components/Icons";
import { Input } from "ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tab";
import { Button } from "ui";

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
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const [clinic, setClinic] = useState<Enquiry | undefined>();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {}, [params.id]);

  return (
    <div className="h-screen ">
      <div className="hidden md:block">
        <div className="h-14 border-b flex items-center px-6 border-gray-200">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem></BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    router.push("/user-management/customer");
                  }}
                  className="text-primary cursor-pointer font-light hover:underline">
                  <div className="flex flex-row items-center gap-4">
                    <Icons.backArrow
                      fill="black"
                      height={12}
                      width={12}
                      stroke="black"
                    />
                    <h1>Active Customers</h1>
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    router.push("/user-management/customer");
                  }}
                  className="text-primary cursor-pointer font-light hover:underline">
                  <div className="flex flex-row items-center gap-4">
                    <Icons.breadcrumbSeparator
                      fill="black"
                      height={12}
                      width={12}
                      stroke="black"
                    />
                    <h1>Account Profiles</h1>
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-light">
                  <div className="flex flex-row items-center gap-4">
                    <Icons.breadcrumbSeparator
                      fill="black"
                      height={12}
                      width={12}
                      stroke="black"
                    />
                    <h1>Add Family Member</h1>
                  </div>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}
