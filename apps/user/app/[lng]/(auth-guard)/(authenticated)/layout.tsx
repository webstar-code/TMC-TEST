"use client";
import { BottomNav } from "components/bottom-nav";
import { SideNav } from "components/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[1600px] mx-auto relative h-full min-h-screen flex items-start">
      <div className="sticky top-0 h-full hidden md:flex flex-col flex-shrink-0">
        <SideNav />
      </div>
      <div className="fixed bottom-0 left-0 w-full block md:hidden overflow-hidden z-40">
        <BottomNav />
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
