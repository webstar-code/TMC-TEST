import { CheckList, CloudInfra } from "assets/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ROUTES } from "utils/routes";

function DesignedForUtility() {
  return (
    <div className="w-full container px-6 flex flex-col gap-12 py-24 md:px-16">
      <div className="px-2 flex flex-col gap-3 md:gap-10">
        <h1 className="w-full text-center font-bold text-2xl md:text-4xl">
          Designed for Utility
        </h1>
        <p className="w-full text-center text-base font-normal md:text-md md:w-[40%] md:mx-auto text-[#868686]">
          A perfect solution designed to give you easy and secure access to your
          health information with easy shareability.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:w-full md:justify-between md:items-center gap-10">
        <div className="shadow rounded-xl py-10 px-8 flex flex-col gap-3 md:w-1/2">
          <h3 className="w-full text-center font-bold text-xl md:text-start md:text-2xl">
            Secure Cloud Infrastructure
          </h3>
          <p className="w-full text-start font-normal md:text-start text-[#868686]">
            Your information is safely and privately secured in modern
            cloudinfrastructure.
          </p>
          <Link href={ROUTES.support}>
            <p className="w-full text-center underline underline-offset-4 text-sm text-[#868686] hover:text-primary hover:font-medium md:text-start ">
              Contact Track My Care
            </p>
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src={CloudInfra}
            alt=""
            className="mx-auto"
            width={380}
            height={100}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:w-full md:justify-between md:items-center md:gap-10 gap-10">
        <div className="flex flex-col gap-3 px-8 shadow rounded-xl py-6 md:w-1/2 md:order-2 md:gap-8">
          <h3 className="w-full text-center font-bold text-xl md:text-start md:text-2xl">
            Trusted by Health Professionals
          </h3>
          <p className="w-full text-start font-normal md:text-start text-[#868686]">
            Improves exchange of health information facilitating medical care.
          </p>
          <ol className="w-full text-start text-base">
            <li className="text-[#868686]">1.&nbsp;Ease of use</li>
            <li className="text-[#868686]">2.&nbsp;Secure - HIPAA compliant</li>
            <li className="text-[#868686]">3.&nbsp;Affordable</li>
          </ol>
          <Link href={ROUTES.support}>
            <p className="w-full text-center underline underline-offset-4 text-sm text-[#868686] hover:text-primary hover:font-medium md:text-start ">
              Contact Track My Care
            </p>
          </Link>
        </div>
        <div className="md:order-1 md:w-1/2">
          <Image
            src={CheckList}
            alt=""
            className="mx-auto"
            width={320}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}

export default DesignedForUtility;
