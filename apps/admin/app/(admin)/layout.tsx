"use client";
import Header from "components/Header";
import SideNav from "components/SideNav";
import { onAuthStateChanged } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    if (!admin) {
      router.push("/login");
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* Layout UI */}
      <main className="md:flex md:flex-row">
        <div className="md:w-[30%] lg:w-[25%] xl:w-[18%] fixed">
          <SideNav
            sideNavActive={sideNavActive}
            setSideNavActive={setSideNavActive}
          />
        </div>
        <div className="w-full md:ml-[30%] lg:ml-[25%] xl:ml-[18%]">
          <Header
            sideNavActive={sideNavActive}
            setSideNavActive={setSideNavActive}
          />
          <div className="w-full">{children}</div>
          <Toaster expand={true} richColors />
          {children}
          <Toaster />
        </div>
      </main>
    </QueryClientProvider>
  );
}
