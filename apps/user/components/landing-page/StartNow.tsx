import { White_Tick } from "assets/icons";
import { StartNow1 } from "assets/images";
import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui";
import { Button } from "ui";

function StartNow() {
  return (
    <div className="w-full bg-primary">
      <div className="w-full container bg-primary py-24 text-secondary flex flex-col gap-2 md:flex-row">
        <div className="flex flex-col gap-2 md:w-[60%]">
          <h2 className="text-secondary font-normal text-center md:text-xl md:text-start">
            START NOW!
          </h2>
          <h1 className="text-secondary text-center font-bold text-2xl md:text-4xl md:text-start">
            Ready to Get Started?
          </h1>
          <div className="mt-6">
            <Tabs defaultValue="account" className="w-full md:w-[60%]">
              <TabsList className="w-full h-12 p-0.5 rounded-full">
                <TabsTrigger
                  className="w-1/2 h-full rounded-full font-semibold"
                  value="account">
                  {"Monthly $7"}
                </TabsTrigger>
                <TabsTrigger
                  className="w-1/2 h-full rounded-full font-semibold"
                  value="password">
                  {"Annually $45"}
                </TabsTrigger>
              </TabsList>
              {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent> */}
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
            <Button variant={"secondary"} className="w-full max-w-[420px]">
              Start Tracking
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center w-[40%]">
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

export default StartNow;
