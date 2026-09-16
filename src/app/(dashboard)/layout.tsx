"use client";

import React, { useState } from "react";
import { useSyncExternalStore } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/topnav";
import { ToastProvider } from "@/components/ui/toast";
import { useMediaQuery } from "@/hooks/use-media-query";

const emptySubscribe = () => () => {};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const collapsed = isMobile ? !mobileOpen : sidebarCollapsed;

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen((open) => !open);
    } else {
      setSidebarCollapsed((value) => !value);
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-xs font-medium text-gray-500">Loading VEDIK ERP...</p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
        <div className="flex min-w-0 flex-1 flex-col transition-all duration-300">
          <TopNav onMenuToggle={toggleSidebar} />
          <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
