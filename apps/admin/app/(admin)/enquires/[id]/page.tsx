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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { enquiryApi } from "api/enquiryApi";

export default function Page({ params }: { params: { id: string } }) {
  const [enquiry, setEnquiry] = useState<Enquiry | undefined>();
  const router = useRouter();

  const handleButtonClick = async (id: string) => {
    toast("Status changed to the resolved");
    enquiryApi.updateEnquiry(id);
  };

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
              <BreadcrumbItem></BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    router.push("/enquires/general");
                  }}
                  className="text-primary cursor-pointer font-light hover:underline">
                  <div className="flex flex-row items-center gap-4">
                    <Icons.backArrow
                      fill="black"
                      height={12}
                      width={12}
                      stroke="black"
                    />
                    <h1>General Enquiry</h1>
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
                    <h1>Enquiry</h1>
                  </div>
                </BreadcrumbPage>
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
          <Button
            onClick={() => {
              router.push("/enquires/general");
            }}
            className="w-1/2 h-10 bg-white border border-primary text-primary hover:bg-white">
            Go Back
          </Button>
          {enquiry?.status === "active" && (
            <Button
              onClick={() => {
                handleButtonClick(params.id);
              }}
              className="w-1/2 h-10">
              Mark Resolved
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
