"use client";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { Container } from "components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tab";
import ResolvedEnquiry from "components/general-enquiry-management/ResolvedEnquiry";
import { useTabs } from "hooks/useTabs";
import ActiveEnquiry from "components/general-enquiry-management/ActiveEnquiry";

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

function Page() {
  const { activeTab, onTabChange } = useTabs("status", "active");
  const [enquires, setEnquires] = useState<Enquiry[]>();
  const [count, setCount] = useState<number>(0);

  return (
    <Container title="General Enquiry Management">
      <div>
        <Tabs value={activeTab} defaultValue="resolved" className="w-full">
          <TabsList className="bg-secondary w-full md:w-1/2 mt-6">
            <TabsTrigger
              onClick={() => {
                onTabChange("active");
              }}
              className="text-md font-bold w-full text-start py-2 md:py-2 border-b"
              value="active">
              Active Enquiry
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                onTabChange("resolved");
              }}
              className="text-md font-bold w-full text-start py-2 md:py-2 border-b"
              value="resolved">
              Resolved Enquiry
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <ActiveEnquiry />
          </TabsContent>

          <TabsContent value="resolved">
            <ResolvedEnquiry />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}

export default Page;
