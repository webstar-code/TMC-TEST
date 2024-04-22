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
                    router.push("/clinics-management");
                  }}
                  className="text-primary cursor-pointer font-light hover:underline">
                  <div className="flex flex-row items-center gap-4">
                    <Icons.backArrow
                      fill="black"
                      height={12}
                      width={12}
                      stroke="black"
                    />
                    <h1>Clinic Management</h1>
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
                    <h1>Clinic</h1>
                  </div>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="md:px-8 px-6">
        <div className="md:text-xl font-bold mt-10">Clinic Profile</div>
        <div className="py-4 flex flex-col gap-8 mt-6 md:w-[45%] ">
          <Input
            disabled
            label="Name of the Clinic"
            value={""}
            className="px-4"
          />
          <Input disabled label="Email-ID" value={""} className="px-4" />
          <Input disabled label="Phone Number" value={""} className="px-4" />
          <Input disabled label="Clinic logo.png" value={""} className="px-4" />
          <Input disabled label="Address*" value={""} className="px-4" />
        </div>
      </div>
    </div>
  );
}
