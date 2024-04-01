import { Tick } from "assets/icons";
import Image from "next/image";
import React from "react";

function Services() {
  return (
    <div className=" flex flex-col lg:flex-col xl:flex-row md:items-center md:py-18 px-8 md:px-16 gap-6 md:gap-2 w-full xl:justify-around">
      <div className="flex flex-row md:w-[90%] lg:w-[70%] gap-4 font-semibold md:px-6 md:py-6 md:shadow md:rounded-md xl:w-1/4">
        {" "}
        <Image src={Tick} alt="" width={20} height={20} />{" "}
        <h1>Easy Access to records anywhere</h1>
      </div>
      <div className="flex flex-row md:w-[90%] lg:w-[70%] gap-4 font-semibold md:px-6 md:py-6 md:shadow md:rounded-md xl:w-1/4">
        {" "}
        <Image src={Tick} alt="" width={20} height={20} />{" "}
        <h1>Share with your doctors</h1>
      </div>
      <div className="flex flex-row md:w-[90%] lg:w-[70%] gap-4 font-semibold md:px-6 md:py-6 md:shadow md:rounded-md xl:w-1/4">
        {" "}
        <Image src={Tick} alt="" width={20} height={20} />{" "}
        <h1>Add Family Members</h1>
      </div>
      <div className="flex flex-row md:w-[90%] lg:w-[70%] gap-4 font-semibold md:px-6 md:py-6 md:shadow md:rounded-md xl:w-1/4 mb-16 md:mb-0">
        {" "}
        <Image src={Tick} alt="" width={20} height={20} />{" "}
        <h1>Download records whenever</h1>
      </div>
    </div>
  );
}

export default Services;
