import { Tick } from "assets/icons";
import Image from "next/image";
import React from "react";

function Services() {
  return (
    <div className="container flex flex-wrap items-center justify-center gap-4 mx-auto">
      <div className="w-max flex flex-1 items-center gap-4 p-4 md:py-6 px-4 md:shadow md:rounded-md">
        <Image src={Tick} alt="" width={20} height={20} />
        <h1 className="text-base font-semibold">
          Easy Access to records anywhere
        </h1>
      </div>
      <div className="w-max flex  items-center gap-4 p-4 md:p-6 md:shadow md:rounded-md">
        <Image src={Tick} alt="" width={20} height={20} />{" "}
        <h1 className="text-base font-semibold">Share with your doctors</h1>
      </div>
      <div className="w-max flex  items-center gap-4 p-4 md:p-6 md:shadow md:rounded-md">
        <Image src={Tick} alt="" width={20} height={20} />{" "}
        <h1 className="text-base font-semibold">Add Family Members</h1>
      </div>
      <div className="w-max flex flex-1 items-center gap-4 p-4 md:p-6 md:shadow md:rounded-md">
        <Image src={Tick} alt="" width={20} height={20} />{" "}
        <h1 className="text-base font-semibold">Download records whenever</h1>
      </div>
    </div>
  );
}

export default Services;
