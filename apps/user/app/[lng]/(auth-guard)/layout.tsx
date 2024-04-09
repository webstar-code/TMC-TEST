"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebase";
import { useUserStore } from "lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "utils/routes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { getUser, user } = useUserStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid);
      }
      setLoading(false);
    });
  }, [getUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    router.push(ROUTES.login);
  }

  if (user && (!user.tncConsent || !user.privacyPolicyConsent)) {
    router.push(ROUTES.acceptLegal);
    return children;
  }

  if (
    user &&
    (!user.tncConsent?.accepted || !user.privacyPolicyConsent?.accepted)
  ) {
    router.push(ROUTES.acceptLegal);
    return children;
  }
  if (user && !user.patientDetailsSubmitted) {
    router.push(ROUTES.verifyPatient);
    return children;
  }

  return children;
}
