"use client";

import { useUserStore } from "lib/store";
import Link from "next/link";
import { ROUTES } from "utils/routes";

export default function ExamsPage() {
  const { user } = useUserStore();
  return (
    <div className="flex flex-col">
      <div className="container w-full h-16 border flex justify-end items-center">
        <h1>{user?.email}</h1>
      </div>
      <div className="container py-8 flex flex-col gap-10">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold">Exam history</h1>
        </div>

        <div className="w-full flex justify-between items-end p-6 rounded-lg bg-white drop-shadow-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">
              Subscribe to start using Track My Care!
            </h1>
            <p className="text-sm">
              Subscribe now to have access to your TrackMyCare account and take
              control of your health information and journey.
            </p>
          </div>
          <Link href={ROUTES.subscription}>
            <p className="text-primary text-sm underline font-semibold">
              View Plans
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
