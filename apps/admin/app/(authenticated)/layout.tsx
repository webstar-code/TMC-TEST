"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
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
      }
    });
  });

  return <main>{children}</main>;
}
