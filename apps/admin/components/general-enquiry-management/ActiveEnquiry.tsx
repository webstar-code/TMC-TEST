"use client";
import { Icons } from "components/Icons";
import MobileSortDialog from "components/MobileSortDialog";
import Image from "next/image";
import { Sort } from "public/assets/icons";
import React, { useState } from "react";

function ActiveEnquiry() {
  const [isSortActive, setSortActive] = useState<boolean>(false);
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center mt-6">
        <h1>Search By Enquiry ID</h1>
        <div className="md:hidden">
          <Image
            onClick={() => {
              setSortActive(true);
            }}
            src={Sort}
            alt=""
            height={40}
            width={40}
          />
        </div>
      </div>
      {isSortActive && (
        <MobileSortDialog isActive={isSortActive} setIsActive={setSortActive} />
      )}
    </div>
  );
}

export default ActiveEnquiry;
