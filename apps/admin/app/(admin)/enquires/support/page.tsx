"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tab";
import ActiveEnquiry from "components/general-enquiry-management/ActiveEnquiry";
import ResolvedEnquiry from "components/general-enquiry-management/ResolvedEnquiry";

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

  const onSubmit = (data: z.infer<typeof formSchema>) => {};

  return (
    <Container title="Support Enquiry Management">
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
