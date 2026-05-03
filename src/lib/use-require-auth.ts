"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, tryRefresh } from "@/lib/auth";

export function useRequireAuth() {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn()) return;
    // Access token missing or expired — try refreshing before redirecting
    tryRefresh().then((ok) => {
      if (!ok) router.replace("/sign-in");
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
