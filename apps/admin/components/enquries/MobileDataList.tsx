import React from "react";
import { Enquiry } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

import { Button } from "ui";
import { Icons } from "components/Icons";
import { toast } from "sonner";
import { enquiryApi } from "api/enquiryApi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

function MobileDataList({
  data,
  type,
  refetch,
}: {
  data: Enquiry[];
  type: string;
  refetch: () => void;
}) {
  const router = useRouter();

  const handleButtonClick = async (id: string) => {
    toast("Status changed to the resolved");
    enquiryApi.updateEnquiry(id);
    refetch();
  };

  const handleClick = (id: string) => {
    router.push(`/enquires/${id}`);
  };
  return (
    <div className="py-6 flex flex-col gap-4">
      {data.map((enquiry) => (
        <div key={enquiry.id}>
          <Card className="px-[1px]">
            <CardHeader className="py-4">
              <div className="flex flex-row">
                <CardTitle className="text-md font-semibold">
                  Enquiry ID : {enquiry.id}
                </CardTitle>
                <div>
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
                              handleClick(enquiry.id);
                            }}>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleButtonClick(enquiry.id);
                            }}>
                            Mark As Resolved
                          </DropdownMenuItem>
                        </div>
                      )}
                      {type === "resolved" && (
                        <div>
                          <DropdownMenuItem
                            onClick={() => {
                              handleClick(enquiry.id);
                            }}>
                            View
                          </DropdownMenuItem>
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <p className="capitalize">Name : {enquiry.name}</p>
                <p>
                  Date : {format(new Date(enquiry.createdAt), "d, MMM yyyy")}
                </p>
                <p>Email ID : {enquiry.email}</p>
                <p>Phone Number : {enquiry.phoneNumber}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default MobileDataList;
