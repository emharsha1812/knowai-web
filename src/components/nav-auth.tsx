"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isLoggedIn, clearToken } from "@/lib/auth";

export function NavAuth() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  function handleSignOut() {
    clearToken();
    setLoggedIn(false);
    router.push("/");
    router.refresh();
  }

  if (loggedIn) {
    return (
      <button
        onClick={handleSignOut}
        className="border border-foreground/80 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm uppercase tracking-wider px-6 py-2.5 font-medium rounded-md"
      >
        Sign Out
      </button>
    );
  }

  return (
    <>
      <Link
        href="/sign-in"
        className="hidden sm:block text-base text-muted-foreground hover:text-foreground transition-colors px-3"
      >
        Sign In
      </Link>
      <Link
        href="/sign-in"
        className="border border-foreground/80 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm uppercase tracking-wider px-6 py-2.5 font-medium rounded-md"
      >
        Early Access
      </Link>
    </>
  );
}
