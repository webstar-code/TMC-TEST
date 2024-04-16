"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebase";
import { useActiveSusbcription, useUserStore } from "lib/store";
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
  const { getActiveSubscription } = useActiveSusbcription();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await getUser(user.uid);
        if (result.data?.customerId) {
          await getActiveSubscription(result.data?.customerId);
        }
      }
      setLoading(false);
    });
  }, [getUser, getActiveSubscription]);

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
  // if (user && !user.patientDetailsSubmitted) {
  //   router.push(ROUTES.verifyPatient);
  //   return children;
  // }

  return children;
}
