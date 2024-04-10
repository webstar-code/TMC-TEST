"use client";
import Header from "components/Header";
import SideNav from "components/SideNav";
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { Toaster } from "ui";

import { useEffect, useState } from "react";
import { auth } from "lib/firebase";
import { useAdminStore } from "lib/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const [sideNavActive, setSideNavActive] = useState<boolean>(false);
  const { admin } = useAdminStore();
  useEffect(() => {
    if (!admin) {
      redirect("/login");
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* Layout UI */}
      <main className="md:flex md:flex-row">
        <div className="md:w-[48%] lg:w-[35%] xl:w-[20%]">
          <SideNav
            sideNavActive={sideNavActive}
            setSideNavActive={setSideNavActive}
          />
        </div>
        <div className="overflow-y-scroll w-full">
          <Header
            sideNavActive={sideNavActive}
            setSideNavActive={setSideNavActive}
          />
          <div className="w-full">{children}</div>
          <Toaster expand={true} richColors />
        </div>
      </main>
    </QueryClientProvider>
  );
}
