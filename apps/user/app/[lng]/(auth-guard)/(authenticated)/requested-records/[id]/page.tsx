"use client";

import { Icons } from "components/Icons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  Input,
} from "ui";
import { ROUTES } from "utils/routes";

export default function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="container w-full h-16 border flex gap-2 items-center">
        <Icons.arrowLeft
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="underline"
                href={ROUTES.requestedRecords}>
                Record Requests
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{params.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container py-8 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold">Request Id: {params.id}</h1>
          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"}>Delete Request</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h1 className="text-lg font-semibold">
                  Are you sure you want to delete this request for records?
                </h1>
              </DialogHeader>
              <DialogDescription>
                <p>
                  Your request for records from this health organization will be
                  withdrawn.
                </p>
              </DialogDescription>
              <DialogFooter>
                <div className="w-full flex justify-end gap-4 ">
                  <DialogClose asChild>
                    <Button
                      className={"min-w-[96px]"}
                      onClick={async () => {
                        toast("Request Deleted.");
                      }}
                      variant={"destructive"}>
                      Delete
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button className={"min-w-[96px]"} variant={"outline"}>
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full flex flex-col gap-6 sm:max-w-lg">
          <p className="text-sm mb-6">
            Your request to obtain your records from XXXX (*name of
            clinic/institution) has been received . We will reach to XXX to
            bring them on as a partner on our patients’ behalf.
          </p>
          <Input
            disabled
            className="text-black"
            label="Date of request"
            value={"12, Sept 2023"}
          />
          <Input
            disabled
            className="text-black"
            label="Name of clinic"
            value={"GNMI Clinic"}
          />
          <Input
            disabled
            className="text-black"
            label="Address of the clinic"
            value={"12334, Ontario, Canada"}
          />
        </div>
      </div>
    </div>
  );
}
