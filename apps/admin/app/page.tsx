"use client";
import Image from "next/image";
import { cn } from "ui";
import { spaceGrotesk } from "./layout";
import { Button } from "ui";
import SideNav from "components/SideNav";
import Header from "components/Header";
import { useState } from "react";
export default function Home() {
  const [sideNavActive, setSideNavActive] = useState<boolean>(false);
  return (
    <div className="">
      <Header
        sideNavActive={sideNavActive}
        setSideNavActive={setSideNavActive}
      />
      <SideNav
        sideNavActive={sideNavActive}
        setSideNavActive={setSideNavActive}
      />
    </div>
  );
}
