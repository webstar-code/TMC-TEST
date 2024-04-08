"use client";
import SideNav from "components/SideNav";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [sideNavActive, setSideNavActive] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  });

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
