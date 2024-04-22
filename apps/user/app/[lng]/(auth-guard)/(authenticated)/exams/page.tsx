"use client";

import { useUserStore } from "lib/store";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "ui";
import { ROUTES } from "utils/routes";

export default function ExamsPage() {
  const { user } = useUserStore();
  return (
    <div className="flex flex-col">
      <div className="container w-full h-16 border flex justify-end items-center">
        <h1>{user?.email}</h1>
      </div>
      <div className="container py-8 flex flex-col gap-10">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold">Exam history</h1>
        </div>

        <div className="w-full min-h-[256px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center gap-6 p-6">
          <h1 className="text-xl font-semibold">
            Your profile is under review!
          </h1>
          <p className="text-[#868686] max-w-md text-center">
            Your approval will be processed within 3-7 business days. If you
            have any further questions, please contact support.
          </p>
          <Button>Contact Support</Button>
        </div>

        {/* <div className="w-full min-h-[256px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center gap-6 p-6">
          <h1 className="text-xl font-semibold">Your application has been rejected</h1>
          <p className="text-[#868686] max-w-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Button>Contact Support</Button>
        </div> */}

        <div className="w-full flex flex-col">
          <h1 className="text-xl font-semibold mb-6">
            Why your profile might be under review:
          </h1>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Identity verification</AccordionTrigger>
              <AccordionContent>
                <div className="font-normal flex flex-col gap-1 text-base">
                  We must ensure your identity and all health information aligns
                  to ensure privacy and security.
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Review for duplicate accounts</AccordionTrigger>
              <AccordionContent>
                <div className="font-normal flex flex-col gap-1 text-base">
                  We must ensure your identity and all health information aligns
                  to ensure privacy and security.
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Incorrect information</AccordionTrigger>
              <AccordionContent>
                <div className="font-normal flex flex-col gap-1 text-base">
                  We must ensure your identity and all health information aligns
                  to ensure privacy and security.
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* <div className="w-full flex justify-between items-end p-6 rounded-lg bg-white drop-shadow-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">
              Subscribe to start using Track My Care!
            </h1>
            <p className="text-sm">
              Subscribe now to have access to your TrackMyCare account and take
              control of your health information and journey.
            </p>
          </div>
          <Link href={ROUTES.subscription}>
            <p className="text-primary text-sm underline font-semibold">
              View Plans
            </p>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
