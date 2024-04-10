"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "lib/firebase";
import { useAdminStore } from "lib/store";

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
      }
    });
  });

  return <main>{children}</main>;
}
