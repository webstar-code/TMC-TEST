"use client";
import Header from "components/Header";
import SideNav from "components/SideNav";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "utils/firebase";
import { useAdminStore } from "utils/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getAdmin } = useAdminStore();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        getAdmin(user.uid);
        console.log(user.uid);
      }
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
