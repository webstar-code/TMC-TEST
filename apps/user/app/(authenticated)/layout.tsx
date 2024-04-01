"use client"

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebase";
import { useVendorStore } from "lib/store";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { getUser } = useVendorStore();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid);
      }
    })
  }, []);

  return <>
    {children}
  </>
}