"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Video,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { getMe, getToken, clearToken, type User } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VeridicWordmark } from "@/components/admin/veridic-wordmark";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/watch-notes", label: "Watch Notes", icon: Video },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "denied" | "login">(
    "loading"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const checkAuth = useCallback(async () => {
    // Allow login page through without auth
    if (pathname === "/admin/login") {
      setStatus("ok");
      return;
    }

    const token = getToken();
    if (!token) {
      setStatus("login");
      router.replace("/admin/login");
      return;
    }

    try {
      const me = await getMe();
      if (me.role !== "admin") {
        setStatus("denied");
        setTimeout(() => router.replace("/"), 2000);
        return;
      }
      setUser(me);
      setStatus("ok");
    } catch {
      clearToken();
      setStatus("login");
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    clearToken();
    router.replace("/admin/login");
  };

  // Login page — render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verifying access…</p>
        </div>
      </div>
    );
  }

  // Access denied
  if (status === "denied") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-center">
          <Shield className="h-12 w-12 text-destructive" />
          <h1 className="text-lg font-medium">Access Denied</h1>
          <p className="text-sm text-muted-foreground">
            You do not have admin privileges. Redirecting…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border/60 bg-background transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo / Brand */}
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-5">
          <Link
            href="/admin"
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4 text-muted-foreground" />
            <VeridicWordmark className="text-xl" />
          </Link>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="flex flex-col gap-1.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                      isActive
                        ? "bg-muted/80 text-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground font-medium"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-3 py-3">
          <div className="mb-2 truncate px-3 text-xs text-muted-foreground">
            {user?.email}
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="flex h-14 items-center border-b border-border px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="ml-2">
            <VeridicWordmark className="text-xl" />
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
