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
import { Button } from "ui";

export default function Page({ params }: { params: { id: string } }) {
  const [enquiry, setEnquiry] = useState<Enquiry | undefined>();

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const docRef = doc(db, "enquiry", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const enquiryData: Enquiry = {
            id: docSnap.id,
            createdAt: data.createdAt.toDate(),
            email: data.email,
            message: data.message,
            name: data.name,
            phoneNumber: data.phoneNumber,
            role: data.role,
            status: data.status,
          };

          setEnquiry(enquiryData);
        }
      } catch (error) {
        console.error("Error fetching enquiry:", error);
      }
    };

    fetchEnquiry();
  }, [params.id]);

  return (
    <div className="h-screen ">
      <div className="hidden md:block">
        <div className="h-14 border-b flex items-center px-6 border-gray-200">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <div className="px-2">
                  <Icons.backArrow
                    fill="black"
                    height={6}
                    width="6px"
                    stroke="black"
                  />
                </div>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/enquires/general"
                  className="text-primary font-light hover:underline">
                  General Enquiry
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="font-light" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-light">Enquiry</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="md:px-8 px-6">
        <div className="md:text-xl font-bold mt-10">
          Enquiry ID : {params.id}
        </div>
        <h1 className="text-gray-400 text-sm mt-2">
          Raised on {enquiry ? format(enquiry.createdAt, "d MMM, yyyy") : ""}
        </h1>
        <div className="py-4 flex flex-col gap-8 mt-6 md:w-[45%] ">
          <Input
            disabled
            label="Name"
            value={enquiry?.name || ""}
            className="px-4"
          />
          <Input
            disabled
            label="Role"
            value={enquiry?.role || ""}
            className="px-4"
          />
          <Input
            disabled
            label="Email-ID"
            value={enquiry?.email || ""}
            className="px-4"
          />
          <Input
            disabled
            label="Phone Number"
            value={enquiry?.phoneNumber || ""}
            className="px-4"
          />
          <Input
            disabled
            label="Message"
            value={enquiry?.message}
            className="h-20 flex items-start"
          />
        </div>
        <div className="flex flex-row gap-3 w-full md:mt-6 md:w-1/4 mt-20">
          <Button className="w-1/2 h-10 bg-white border border-primary text-primary hover:bg-white">
            Go Back
          </Button>
          <Button className="w-1/2 h-10">Mark Resolved</Button>
        </div>
      </div>
    </div>
  );
}
