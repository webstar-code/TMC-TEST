"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui";
import { HowItWorks1, HowItWorks2 } from "assets/images";
import Link from "next/link";
import { ROUTES } from "utils/routes";

function HowItWorks({ defaultTab }: { defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || "forPatients"
  );
  return (
    <>
      <div className=" bg-primary px-6 md:px-16 py-12 lg:hidden">
        <h2 className="text-secondary font-normal md:text-xl text-center">
          HOW IT WORKS
        </h2>
        <h1 className="text-secondary font-bold text-2xl md:text-4xl text-center">
          Few Easy Steps and Done
        </h1>
        <div className="w-full py-8">
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full mt-4">
            <TabsList className="w-full h-12 p-0.5 rounded-full">
              <TabsTrigger
                className="w-1/2 h-full rounded-full font-semibold"
                value="forPatients">
                For Patients
              </TabsTrigger>
              <TabsTrigger
                className="w-1/2 h-full rounded-full font-semibold"
                value="forClinics">
                For Clinics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="forPatients">
              <div className="flex flex-col items-center">
                <div className="w-full flex items-center justify-center mt-6 mx-auto">
                  <Image src={HowItWorks1} alt="" height={200} width={400} />
                </div>
                <div className="w-full mt-10">
                  <div className="relative">
                    <div className="w-[1px] bg-secondary h-[160px] absolute left-5 top-1"></div>
                    <div className="absolute flex flex-col gap-8">
                      <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        3
                      </div>
                    </div>
                  </div>
                  <div className="text-secondary gap-11 flex flex-col ml-16 mt-2">
                    <h3 className="text-base xl:text-xl font-normal">
                      Register your Track My Care account.
                    </h3>
                    <h3 className="text-base xl:text-xl font-normal">
                      Request your previous records.
                    </h3>
                    <h3 className="text-base xl:text-xl font-normal">
                      Done, view your records at your convenience.
                    </h3>
                  </div>
                  <Link href={ROUTES.login}>
                    <div className="underline underline-offset-2 font-light text-secondary pl-16 mt-8">
                      Try Track My Care
                    </div>
                  </Link>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="forClinics">
              <div className="flex flex-col items-center">
                <div className="w-full flex items-center justify-center mt-6 mx-auto">
                  <Image src={HowItWorks2} alt="" height={200} width={400} />
                </div>
                <div className="w-full mt-10">
                  <div className="relative">
                    <div className="w-[1px] bg-secondary h-[160px] absolute left-5 top-1"></div>
                    <div className="absolute flex flex-col gap-8">
                      <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        3
                      </div>
                    </div>
                  </div>
                  <div className="text-secondary gap-11 flex flex-col ml-16 mt-2">
                    <h3 className="text-base xl:text-xl font-normal">
                      View Track My Care.
                    </h3>
                    <h3 className="text-base xl:text-xl font-normal">
                      Submit your details via tha contact form.
                    </h3>
                    <h3 className="text-base xl:text-xl font-normal">
                      Done, wait for us to reach out to you.
                    </h3>
                  </div>
                  <Link href={ROUTES.support}>
                    <div className="underline underline-offset-2 font-light text-secondary pl-16 mt-8">
                      Contact Track My Care
                    </div>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden lg:block w-full bg-primary">
        <div className="w-full container bg-primary px-16 py-16 flex lg:flex-row justify-start gap-16 xl:gap-40">
          <div className="h-full flex items-center justify-between mt-14">
            <Image
              src={activeTab === "forPatients" ? HowItWorks1 : HowItWorks2}
              className="mx-auto"
              alt=""
              width={500}
              height={700}
            />
          </div>
          <div className="flex flex-col gap-2 mt-14">
            <h2 className="text-secondary font-normal md:text-xl">
              HOW IT WORKS
            </h2>
            <h1 className="text-secondary font-bold text-2xl md:text-4xl">
              Few Easy Steps and Done
            </h1>
            <div>
              <Tabs
                defaultValue={activeTab}
                onValueChange={(value) => setActiveTab(value)}
                className="w-full mt-4">
                <TabsList className="w-full h-12 p-0.5 rounded-full">
                  <TabsTrigger
                    className="w-1/2 h-full rounded-full font-semibold"
                    value="forPatients">
                    For Patients
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-1/2 h-full rounded-full font-semibold"
                    value="forClinics">
                    For Clinics
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="forPatients">
                  <div className="p-8 mt-16 rounded-xl inset-0 bg-gradient-to-br from-[#015555] to-transparent">
                    <div className="relative">
                      <div className="w-[1px] bg-secondary h-[160px] absolute left-5 top-1"></div>
                      <div className="absolute flex flex-col gap-8">
                        <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          1
                        </div>
                        <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          2
                        </div>
                        <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          3
                        </div>
                      </div>
                    </div>
                    <div className="text-secondary gap-11 flex flex-col ml-16 mt-2">
                      <h3 className="text-base xl:text-xl font-normal">
                        Register your Track My Care account.
                      </h3>
                      <h3 className="text-base  xl:text-xl font-normal">
                        Request your previous records.
                      </h3>
                      <h3 className="text-base  xl:text-xl font-normal">
                        Done, view your records at your convenience.
                      </h3>
                    </div>
                    <Link href={ROUTES.login}>
                      <div className="underline underline-offset-2 font-light text-secondary pl-16 mt-8">
                        Try Track My Care
                      </div>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="forClinics">
                  <div className="p-8 mt-16 rounded-xl inset-0 bg-gradient-to-br from-[#015555] to-transparent">
                    <div className="relative">
                      <div className="w-[1px] bg-secondary h-[160px] absolute left-5 top-1"></div>
                      <div className="absolute flex flex-col gap-8">
                        <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          1
                        </div>
                        <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          2
                        </div>
                        <div className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          3
                        </div>
                      </div>
                    </div>
                    <div className="text-secondary gap-11 flex flex-col ml-16 mt-2">
                      <h3 className="text-base xl:text-xl font-normal">
                        View Track My Care.
                      </h3>
                      <h3 className="text-base xl:text-xl font-normal">
                        Submit your details via tha contact form.
                      </h3>
                      <h3 className="text-base xl:text-xl font-normal">
                        Done, wait for us to reach out to you.
                      </h3>
                    </div>
                    <Link href={ROUTES.support}>
                      <div className="underline underline-offset-2 font-light text-secondary pl-16 mt-8">
                        Contact Track My Care
                      </div>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
