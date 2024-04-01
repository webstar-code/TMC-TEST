"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "ui";
import SuccessModal from "components/subscription/SuccessModal";
import ConfirmModal from "components/subscription/ConfirmModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";
import { Container } from "components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tab";
import ActiveEnquiry from "components/general-enquiry-management/ActiveEnquiry";
import ResolvedEnquiry from "components/general-enquiry-management/ResolvedEnquiry";
import ResolvedEnquiryModal from "components/general-enquiry-management/ResolvedEnquiryModal";
import { Icons } from "components/Icons";

const formSchema = z.object({
  monthly: z.number().min(0, {
    message: "Monthly amount must be a positive number.",
  }),
  annually: z.number().min(0, {
    message: "Yearly amount must be a positive number.",
  }),
});

function Page() {
  const [isConfirmClose, handleConfirmClose] = useState<boolean>(false);
  const [isSuccessClose, handleSuccessClose] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <Container title="General Enquiry Management">
      <div>
        <Tabs defaultValue="activeEnquiry" className="w-full">
          <TabsList className="bg-secondary w-full md:w-1/2 mt-6">
            <TabsTrigger
              className="text-md font-bold w-full text-start md:py-2 border-b"
              value="activeEnquiry">
              Active Enquiry
            </TabsTrigger>
            <TabsTrigger
              className="text-md font-bold w-full text-start md:py-2 border-b"
              value="resolvedEnquiry">
              Resolved Enquiry
            </TabsTrigger>
          </TabsList>
          <TabsContent value="activeEnquiry">
            <ActiveEnquiry />
          </TabsContent>
          <TabsContent value="resolvedEnquiry">
            <ResolvedEnquiry />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}

export default Page;
