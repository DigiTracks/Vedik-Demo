"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/topnav";
import { ToastProvider } from "@/components/ui/toast";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
