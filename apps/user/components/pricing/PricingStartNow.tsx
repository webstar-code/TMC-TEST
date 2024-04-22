"use client";

import { ISubscriptionPlan, subscriptionsApi } from "api/subscription";
import { White_Tick } from "assets/icons";
import { Ellipse, Ellipse1, StartNow1 } from "assets/images";
import useMediaQuery from "hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton, Tabs, TabsContent, TabsList, TabsTrigger } from "ui";
import { Button } from "ui";
import { convertFromCents } from "utils";

function PricingStartNow() {
  const [loading, setLoading] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState<ISubscriptionPlan>();
  const router = useRouter();
  const { isSmall } = useMediaQuery();

  useEffect(() => {
    setLoading(true);
    subscriptionsApi
      .getSubscriptionPlans()
      .then((data) => {
        setSubscriptionPlan(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !subscriptionPlan) {
    return (
      <div className="w-full max-w-[450px] mt-10 flex flex-col gap-6">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-12" />
      </div>
    );
  }

  return (
    <div className="w-full bg-primary relative mt-16">
      <div className="absolute right-0 z-10">
        <Image
          src={Ellipse}
          alt="logo"
          width={isSmall ? 200 : 300}
          height={isSmall ? 200 : 300}
        />
      </div>
      <div className="absolute left-0 bottom-0 z-10">
        <Image
          src={Ellipse1}
          alt="logo"
          width={isSmall ? 200 : 300}
          height={isSmall ? 200 : 300}
        />
      </div>
      <div className="container text-secondary px-6 py-16 md:px-16 flex flex-col gap-2 md:flex-row justify-between z-20">
        <div className="flex flex-col gap-2 md:w-[60%] md:max-w-xl z-20">
          <div className="w-full text-center md:text-xl md:text-start">
            START NOW!
          </div>
          <div className="w-full text-center font-bold text-2xl md:text-4xl md:text-start">
            Ready to get started?
          </div>
          <div className="mt-6">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full h-12 p-0.5 rounded-full">
                <TabsTrigger
                  className="w-1/2 h-full rounded-full font-semibold"
                  value="account">
                  Monthly ${convertFromCents(subscriptionPlan?.pricing.month)}
                </TabsTrigger>
                <TabsTrigger
                  className="w-1/2 h-full rounded-full font-semibold"
                  value="password">
                  Annually ${convertFromCents(subscriptionPlan?.pricing.year)}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="mt-6 md:hidden">
            <Image
              src={StartNow1}
              alt=""
              className="mx-auto"
              width={200}
              height={200}
            />
          </div>
          <div className="text-2xl font-bold mt-6 md:mt-14">
            TrackMyCare Features:
          </div>
          <div className="flex flex-col gap-8 mt-6">
            <div className="flex flex-row gap-4">
              <Image src={White_Tick} alt="" height={20} width={20} />
              <h1>Storage and categorization of health records</h1>
            </div>
            <div className="flex flex-row gap-4">
              <Image src={White_Tick} alt="" height={20} width={20} />
              <h1>Easily accessible on multiple devices</h1>
            </div>
            <div className="flex flex-row gap-4">
              <Image src={White_Tick} alt="" height={20} width={20} />
              <h1>Unlimited report sharing and self record uploads</h1>
            </div>
            <div className="flex flex-row gap-4">
              <Image src={White_Tick} alt="" height={20} width={20} />
              <h1>Lifetime storage - we keep it safe for you</h1>
            </div>
          </div>
          <div className="flex justify-center md:justify-start mt-6">
            <Link
              className="w-full"
              href={`/subscription/checkout?subscriptionPlan=${subscriptionPlan.id}&recurring=mont`}>
              <Button className="w-full" variant={"secondary"}>
                Start Tracking
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center w-[40%] z-20">
          <Image
            src={StartNow1}
            alt=""
            className="mx-auto hidden md:block"
            width={300}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default PricingStartNow;
