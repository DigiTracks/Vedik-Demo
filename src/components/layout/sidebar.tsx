"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, LOGO_PATH } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
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
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Students", href: "/students", icon: <GraduationCap className="h-5 w-5" /> },
  { label: "Teachers", href: "/teachers", icon: <Users className="h-5 w-5" /> },
  { label: "Staff", href: "/staff", icon: <UserCheck className="h-5 w-5" /> },
  { label: "Attendance", href: "/attendance", icon: <ClipboardList className="h-5 w-5" /> },
  {
    label: "Academics",
    href: "/academics",
    icon: <BookOpen className="h-5 w-5" />,
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
    icon: <FileText className="h-5 w-5" />,
    children: [
      { label: "Exams", href: "/exams" },
      { label: "Marks", href: "/marks" },
    ],
  },
  {
    label: "Finance",
    href: "/fees",
    icon: <DollarSign className="h-5 w-5" />,
    children: [
      { label: "Fees", href: "/fees" },
      { label: "Finance", href: "/finance" },
      { label: "Payroll", href: "/payroll" },
    ],
  },
  { label: "Homework", href: "/homework", icon: <Briefcase className="h-5 w-5" /> },
  { label: "Library", href: "/library", icon: <BookOpen className="h-5 w-5" /> },
  { label: "Transport", href: "/transport", icon: <Bus className="h-5 w-5" /> },
  { label: "Hostel", href: "/hostel", icon: <Home className="h-5 w-5" /> },
  { label: "Inventory", href: "/inventory", icon: <Package className="h-5 w-5" /> },
  { label: "Communication", href: "/communication", icon: <MessageSquare className="h-5 w-5" /> },
  { label: "Certificates", href: "/certificates", icon: <Award className="h-5 w-5" /> },
  { label: "Reports", href: "/reports", icon: <BarChart3 className="h-5 w-5" /> },
  { label: "Leave", href: "/leave", icon: <Clock className="h-5 w-5" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  { label: "Users", href: "/users", icon: <Shield className="h-5 w-5" /> },
  { label: "License", href: "/license", icon: <CreditCard className="h-5 w-5" /> },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleNavClick = () => {
    if (isMobile) onToggle();
  };

  const sidebarVisible = isMobile ? !collapsed : !collapsed;
  const isCollapsed = isMobile ? collapsed : collapsed;

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 z-50 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col",
          isMobile
            ? cn(
                "left-0 w-64",
                isCollapsed && "-translate-x-full"
              )
            : cn(
                "lg:relative",
                isCollapsed ? "w-[70px]" : "w-64"
              )
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <img src={LOGO_PATH} alt="VEDIK Logo" className="h-9 w-9 rounded-lg object-contain shrink-0" />
                <span className="text-xl font-black tracking-wide leading-none">VEDIK</span>
              </div>
              <span className="text-[11px] font-bold text-white leading-none mt-1.5 tracking-wider pl-11">School Management</span>
            </div>
          )}
          <button onClick={onToggle} className="rounded-lg p-2 hover:bg-gray-700 shrink-0">
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
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
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        )}
                      >
                        {item.icon}
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </>
                        )}
                      </button>
                      {!isCollapsed && isExpanded && item.children && (
                        <ul className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={handleNavClick}
                                  className={cn(
                                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                                    isChildActive
                                      ? "bg-blue-600/20 text-blue-400"
                                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
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
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      )}
                    >
                      {item.icon}
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4">
          {!isCollapsed && (
            <div className="text-xs text-gray-400">
              <p>VEDIK School ERP</p>
              <p>v2.0.0</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
