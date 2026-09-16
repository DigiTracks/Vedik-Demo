"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDemoUser, switchDemoRole, DEMO_PROFILES } from "@/lib/auth";
import type { Role } from "@/types";
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  Shield,
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

interface TopNavProps {
  onMenuToggle: () => void;
}

export function TopNav({ onMenuToggle }: TopNavProps) {
  const currentUser = useDemoUser();
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const isDark = localStorage.getItem("vedik_dark_mode") === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("vedik_dark_mode", String(newMode));
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleRoleSelect = (role: Role) => {
    switchDemoRole(role);
  };

  const rolesList: { role: Role; label: string; icon: React.ReactNode; color: string }[] = [
    { role: "school_admin", label: "Admin", icon: <Shield className="h-3.5 w-3.5" />, color: "from-blue-600 to-indigo-600" },
    { role: "teacher", label: "Teacher", icon: <BookOpen className="h-3.5 w-3.5" />, color: "from-emerald-600 to-teal-600" },
    { role: "student", label: "Student", icon: <GraduationCap className="h-3.5 w-3.5" />, color: "from-purple-600 to-violet-600" },
  ];

  const currentRole = (currentUser?.role === "master_admin" ? "school_admin" : currentUser?.role) || "school_admin";
  const activeProfile = DEMO_PROFILES[currentUser?.role as Role] || DEMO_PROFILES.school_admin;

  const notifications = [
    { id: 1, title: "Class 10A Attendance marked", time: "5 min ago", unread: true },
    { id: 2, title: "Fee receipt #TX-892 generated", time: "1 hour ago", unread: true },
    { id: 3, title: "Mid-Term timetable published", time: "3 hours ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-3 sm:px-5 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90 transition-all">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Demo Switcher Badge / Pill Group */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-gray-800/90 rounded-2xl border border-slate-200/70 dark:border-gray-700/60 shadow-inner">
          <div className="flex items-center gap-1.5 pl-2 pr-1 text-[11px] font-bold">
            <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
              Demo Only
            </span>
          </div>

          {rolesList.map((item) => {
            const isActive = currentRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => handleRoleSelect(item.role)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer select-none",
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-md shadow-blue-500/20 scale-[1.02]`
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700/60"
                )}
                title={`Switch view to ${item.label} Demo`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && <CheckCircle2 className="h-3 w-3 ml-0.5 opacity-90 hidden sm:inline" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search students, classes, modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-44 lg:w-60 rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 text-xs focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/60 dark:text-white dark:focus:bg-gray-800 transition-all"
          />
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <Bell className="h-4.5 w-4.5" />
            {notifications.some((n) => n.unread) && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-gray-700 dark:bg-gray-800 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 p-3 dark:border-gray-700/60">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">Activity Notifications</h3>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  {notifications.filter((n) => n.unread).length} New
                </span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-gray-700/40">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      "p-3 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-gray-700/40",
                      notif.unread && "bg-blue-50/50 dark:bg-blue-950/20"
                    )}
                  >
                    <p className="text-xs font-semibold text-slate-800 dark:text-gray-200">{notif.title}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400 dark:text-gray-400">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Active Persona Badge & User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-1.5 pr-3 hover:bg-slate-100/90 dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-all cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-sm">
              {activeProfile.avatarText}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{activeProfile.name}</p>
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 leading-none">
                {activeProfile.badge}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 dark:text-gray-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-gray-700 dark:bg-gray-800 z-50 animate-fade-in">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-gray-900/60 border border-slate-100 dark:border-gray-700/40">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{activeProfile.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-gray-400">{activeProfile.title}</p>
                <p className="mt-1 text-[10px] font-mono text-blue-600 dark:text-blue-400">{activeProfile.email}</p>
              </div>

              <div className="mt-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Persona Demo
                </div>
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      handleRoleSelect(item.role);
                      setShowUserMenu(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer",
                      currentRole === item.role
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-semibold"
                        : "text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-700/60"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label} View</span>
                    </div>
                    {currentRole === item.role && <span className="text-[10px] text-blue-600 font-bold">Active</span>}
                  </button>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-gray-700/60">
                <Link
                  href="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-700/60 transition-colors"
                >
                  <Shield className="h-3.5 w-3.5" />
                  School Settings
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
