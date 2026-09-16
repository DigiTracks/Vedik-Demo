"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { switchDemoRole } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LOGO_PATH } from "@/lib/utils";
import type { Role } from "@/types";
import { Shield, BookOpen, GraduationCap, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleQuickLaunch = (role: Role) => {
    switchDemoRole(role);
    router.push("/dashboard");
  };

  const demoRoles: { value: Role; label: string; title: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      value: "school_admin",
      label: "School Admin",
      title: "Dr. Rajeshwar Rao (Principal)",
      desc: "Full school ERP management, finances, admissions & staff oversight",
      icon: <Shield className="h-6 w-6" />,
      color: "border-blue-500 bg-blue-50/50 hover:bg-blue-50 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 text-blue-600",
    },
    {
      value: "teacher",
      label: "Teacher",
      title: "Mrs. Priya Sharma (Class 10-A)",
      desc: "Class teacher dashboard, mark attendance, homework & gradebooks",
      icon: <BookOpen className="h-6 w-6" />,
      color: "border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-emerald-600",
    },
    {
      value: "student",
      label: "Student",
      title: "Aarav Patel (Class 10-A, #01)",
      desc: "Student portal, view schedule, marks, homework & fee receipts",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "border-purple-500 bg-purple-50/50 hover:bg-purple-50 dark:bg-purple-950/20 dark:hover:bg-purple-950/40 text-purple-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900 text-white items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl space-y-6">
        {/* Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/20">
            <Image src={LOGO_PATH} alt="VEDIK Logo" width={40} height={40} className="h-10 w-10 object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">VEDIK School ERP Demo</h1>
          <p className="text-sm text-slate-400">
            Select a role persona to immediately explore the system (no login credentials required).
          </p>
        </div>

        {/* 1-Click Persona Cards */}
        <div className="grid grid-cols-1 gap-3">
          {demoRoles.map((role) => (
            <div
              key={role.value}
              onClick={() => handleQuickLaunch(role.value)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${role.color}`}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center shrink-0">
                  {role.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-base">{role.label}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                      1-Click Entry
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-0.5">{role.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">{role.desc}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          ))}
        </div>

        {/* Direct Launch Button */}
        <div className="text-center pt-2">
          <Button
            size="lg"
            onClick={() => handleQuickLaunch("school_admin")}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/25 py-6"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Launch Live Demo as Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
