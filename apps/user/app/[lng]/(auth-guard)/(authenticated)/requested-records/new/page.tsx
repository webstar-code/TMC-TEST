"use client";

import { Icons } from "components/Icons";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Input,
} from "ui";
import { ROUTES } from "utils/routes";

export default function NewRequestPage() {
  const router = useRouter();
  const [showConsentForm, setShowConsentForm] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (event: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // @ts-ignore
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = event.nativeEvent;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event: any) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    // @ts-ignore
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = event.nativeEvent;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  // const convertToDataURL = () => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   // @ts-ignore
  //   const dataURL = canvas.toDataURL();
  // };

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
              <BreadcrumbPage>New request</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {!showConsentForm ? (
        <div className="container py-8 flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-semibold">New Records Request</h1>
          </div>
          <div className="w-full flex flex-col gap-6 sm:max-w-lg">
            <p className="text-sm mb-6">
              Initiate a record request to access specific medical data. Enter
              the details of the records you require. The healthcare
              clinic/institution will be notified about your request.
            </p>
            <div className="w-full relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-black z-20" />
              <Input
                label="Search Clinic"
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
              />
            </div>
            <Button onClick={() => setShowConsentForm(true)}>
              Request Records
            </Button>
          </div>
        </div>
      ) : (
        <div className="container py-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Consent Form</h1>
            <p className="text-sm">Date: 20th Sept. 2023</p>
          </div>
          <div className="w-full flex flex-col gap-6">
            <p>
              I hereby grant my consent for the release and sharing of my health
              information from XXXXX (*the organization/clinic name from which
              record request has been sent should be inputted here’) to
              TrackMyCare. I understand that the sharing of my health
              information is required for TrackMyCare to obtain and store my
              records and make it accessible to me from their platform. I
              acknowledge that TrackMyCare is committed to maintaining the
              utmost privacy and security of my health information. They will
              abide by their stringent privacy protocol to ensure that my health
              data remains confidential and protected. TrackMyCare assures me
              that my information will not be disclosed to other health
              organizations or healthcare providers without my explicit consent.
              I understand that the shared health information may include, but
              is not limited to, medical records, test results, medical imaging,
              diagnosis information, medication history, and treatment plans.
              This information will be used for the sole purpose of storing,
              organizing, and providing access to healthcare data to myself and
              those I chose to share it with. I reserve the right to revoke this
              consent at any time in writing. This consent is valid until such
              time that I choose to withdraw it. I also understand that I have
              the right to access and request copies of my health information
              shared with TrackMyCare. By signing below, I acknowledge that I
              have read and understood the terms and conditions outlined in this
              consent document. I willingly grant my consent for the sharing of
              my health information with TrackMyCare.
            </p>
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              style={{ border: "1px solid black" }}
            />

            <div className="flex max-w-sm gap-4">
              <Button
                className="w-full"
                variant={"outline"}
                onClick={() => setShowConsentForm(false)}>
                Cancel
              </Button>
              <Button className="w-full">Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
