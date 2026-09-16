"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn, LOGO_PATH } from "@/lib/utils";
import { useDemoUser, DEMO_PROFILES } from "@/lib/auth";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Role } from "@/types";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  DollarSign,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  FileText,
  Bus,
  Home,
  Package,
  MessageSquare,
  Award,
  BarChart3,
  Clock,
  CreditCard,
  Briefcase,
  UserCheck,
  Shield,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: Role[];
  children?: { label: string; href: string }[];
}

const allNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4.5 w-4.5" /> },
  { label: "Students", href: "/students", icon: <GraduationCap className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin", "teacher"] },
  { label: "Teachers", href: "/teachers", icon: <Users className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin"] },
  { label: "Staff", href: "/staff", icon: <UserCheck className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin"] },
  { label: "Attendance", href: "/attendance", icon: <ClipboardList className="h-4.5 w-4.5" /> },
  {
    label: "Academics",
    href: "/academics",
    icon: <BookOpen className="h-4.5 w-4.5" />,
    children: [
      { label: "Classes", href: "/classes" },
      { label: "Sections", href: "/sections" },
      { label: "Subjects", href: "/subjects" },
      { label: "Timetable", href: "/timetable" },
    ],
  },
  {
    label: "Examinations",
    href: "/exams",
    icon: <FileText className="h-4.5 w-4.5" />,
    children: [
      { label: "Exams", href: "/exams" },
      { label: "Marks & Grades", href: "/marks" },
    ],
  },
  {
    label: "Finance",
    href: "/fees",
    icon: <DollarSign className="h-4.5 w-4.5" />,
    roles: ["master_admin", "school_admin", "student"],
    children: [
      { label: "Fee Management", href: "/fees" },
      { label: "Income & Expense", href: "/finance" },
      { label: "Staff Payroll", href: "/payroll" },
    ],
  },
  { label: "Homework", href: "/homework", icon: <Briefcase className="h-4.5 w-4.5" /> },
  { label: "Library", href: "/library", icon: <BookOpen className="h-4.5 w-4.5" /> },
  { label: "Transport", href: "/transport", icon: <Bus className="h-4.5 w-4.5" /> },
  { label: "Hostel", href: "/hostel", icon: <Home className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin", "student"] },
  { label: "Inventory", href: "/inventory", icon: <Package className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin"] },
  { label: "Communication", href: "/communication", icon: <MessageSquare className="h-4.5 w-4.5" /> },
  { label: "Certificates", href: "/certificates", icon: <Award className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin", "teacher"] },
  { label: "Reports", href: "/reports", icon: <BarChart3 className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin", "teacher"] },
  { label: "Leave Requests", href: "/leave", icon: <Clock className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin", "teacher"] },
  { label: "Settings", href: "/settings", icon: <Settings className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin"] },
  { label: "Users & Roles", href: "/users", icon: <Shield className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin"] },
  { label: "License", href: "/license", icon: <CreditCard className="h-4.5 w-4.5" />, roles: ["master_admin", "school_admin"] },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const currentUser = useDemoUser();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Academics", "Examinations"]);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleNavClick = () => {
    if (isMobile) onToggle();
  };

  const currentRole = currentUser?.role || "school_admin";
  const activeProfile = DEMO_PROFILES[currentRole as Role] || DEMO_PROFILES.school_admin;

  const filteredNavItems = allNavItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(currentRole);
  });

  const isCollapsed = isMobile ? collapsed : collapsed;

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 z-50 h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 transition-all duration-300 flex flex-col border-r border-slate-800/80 shadow-2xl",
          isMobile
            ? cn("left-0 w-64", isCollapsed && "-translate-x-full")
            : cn("lg:relative", isCollapsed ? "w-[72px]" : "w-64")
        )}
      >
        {/* Logo Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-4">
          {!isCollapsed && (
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20 shrink-0">
                <Image src={LOGO_PATH} alt="VEDIK Logo" width={24} height={24} className="h-6 w-6 object-contain" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-blue-200 bg-clip-text text-transparent leading-none">
                  VEDIK ERP
                </span>
                <span className="text-[10px] font-semibold text-blue-400 leading-none mt-1 uppercase tracking-wider">
                  School Suite
                </span>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white shrink-0 transition-colors"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        {/* Persona Indicator Pill */}
        {!isCollapsed && (
          <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-white truncate">{activeProfile.name}</p>
                <p className="text-[10px] text-blue-400 capitalize truncate">{activeProfile.badge} Mode</p>
              </div>
            </div>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              Demo Only
            </span>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 scrollbar-hide">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const isExpanded = expandedItems.includes(item.label);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <li key={item.label}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.label)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 cursor-pointer",
                          isActive
                            ? "bg-blue-600/90 text-white shadow-sm shadow-blue-500/30"
                            : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                        )}
                      >
                        <span className={cn(isActive ? "text-white" : "text-slate-400")}>{item.icon}</span>
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            {isExpanded ? <ChevronDown className="h-3.5 w-3.5 opacity-70" /> : <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
                          </>
                        )}
                      </button>
                      {!isCollapsed && isExpanded && item.children && (
                        <ul className="ml-5 mt-1 space-y-0.5 border-l border-slate-800 pl-2">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={handleNavClick}
                                  className={cn(
                                    "block rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                                    isChildActive
                                      ? "bg-blue-500/20 text-blue-300 font-semibold"
                                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150",
                        isActive
                          ? "bg-blue-600/90 text-white shadow-sm shadow-blue-500/30 font-bold"
                          : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      )}
                    >
                      <span className={cn(isActive ? "text-white" : "text-slate-400")}>{item.icon}</span>
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800/80 p-3.5">
          {!isCollapsed ? (
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">VEDIK Cloud v2.5</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
