"use client";

import { Icons } from "components/Icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Checkbox,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "ui";

export default function SubscriptionPage() {
  const [activeSubscription] = useState(true);
  const [showPlans, setShowPlans] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (showPlans) {
    return (
      <div className="flex flex-col">
        <div className="w-full flex items-center gap-2 h-16 border p-6">
          <Icons.arrowLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/subscription">
                  Subscription
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Buy Plan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="container py-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Subscription</h1>
          </div>
          <ViewPricing />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-16 border"></div>
      <div className="container py-8">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold">Subscription</h1>
          <div className="flex items-center gap-4">
            {activeSubscription ? (
              <>
                <Button variant={"outline"}>Cancel Membership</Button>
                <Button onClick={() => setShowPlans(true)}>
                  Update Membership
                </Button>
              </>
            ) : (
              <>
                {!loading && !activeSubscription && (
                  <Button onClick={() => setShowPlans(true)}>View Plans</Button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-20">
          {loading ? (
            <Skeleton className="w-full min-h-[96px] bg-accent" />
          ) : (
            <>
              {activeSubscription ? (
                <div className="w-full bg-secondary p-6 my-6 flex items-start justify-between rounded-lg drop-shadow-md">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Membership plan</h3>
                    Monthly
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Start Date</h3>
                    17th, September,2023
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">End Date</h3>
                    17th, October,2023
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Payment Method</h3>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ViewPricing() {
  return (
    <div className="w-full max-w-[450px] mt-10 flex flex-col gap-6">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="w-full h-12 p-0.5 rounded-full">
          <TabsTrigger
            className="w-1/2 h-full rounded-full font-semibold"
            value="monthly">
            {"Monthly $7"}
          </TabsTrigger>
          <TabsTrigger
            className="w-1/2 h-full rounded-full font-semibold"
            value="annually">
            {"Annually $45"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <div className="flex flex-col gap-8 mt-10">
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Storage and categorization of health records
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Easily accessible on multiple devices
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Unlimited report sharing and self record uploads
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Lifetime storage - we keep it safe for you
              </h1>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="annually">
          <div className="flex flex-col gap-8 mt-10">
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Storage and categorization of health records
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Easily accessible on multiple devices
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Unlimited report sharing and self record uploads
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Checkbox className="w-6 h-6" checked />
              <h1 className="text-[#868686]">
                Lifetime storage - we keep it safe for you
              </h1>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button className="mt-4">Buy Now</Button>
    </div>
  );
}
