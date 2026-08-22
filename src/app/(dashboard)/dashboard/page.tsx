"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { students, teachers, transactions, fees, attendanceData, classes, homework, messages, exams, marks } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { getStoredUser, DEMO_PROFILES } from "@/lib/auth";
import type { Role, User as UserType } from "@/types";
import {
  GraduationCap,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  BookOpen,
  Bus,
  Clock,
  Download,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Shield,
  FileCheck,
  Award,
  ChevronRight,
  Flame,
  Send,
  UserCheck,
  CreditCard,
  Bell,
  Activity,
  Layers,
  FileText,
  UserPlus,
  Receipt,
  CheckSquare,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", income: 850000, expense: 620000 },
  { month: "Feb", income: 920000, expense: 680000 },
  { month: "Mar", income: 780000, expense: 590000 },
  { month: "Apr", income: 1100000, expense: 720000 },
  { month: "May", income: 950000, expense: 650000 },
  { month: "Jun", income: 850000, expense: 600000 },
  { month: "Jul", income: 1200000, expense: 750000 },
];

const attendanceChart = [
  { day: "Mon", present: 420, absent: 35, late: 25 },
  { day: "Tue", present: 440, absent: 20, late: 20 },
  { day: "Wed", present: 410, absent: 40, late: 30 },
  { day: "Thu", present: 450, absent: 15, late: 15 },
  { day: "Fri", present: 430, absent: 25, late: 25 },
];

const classDistribution = [
  { name: "Class 6", value: 120, color: "#3B82F6", percent: 92 },
  { name: "Class 7", value: 85, color: "#10B981", percent: 85 },
  { name: "Class 8", value: 80, color: "#F59E0B", percent: 80 },
  { name: "Class 9", value: 75, color: "#EC4899", percent: 75 },
  { name: "Class 10", value: 70, color: "#8B5CF6", percent: 70 },
];

const studentMarksData = [
  { subject: "Math", marks: 85, maxMarks: 100, classAvg: 72 },
  { subject: "Physics", marks: 78, maxMarks: 100, classAvg: 68 },
  { subject: "Chem", marks: 82, maxMarks: 100, classAvg: 70 },
  { subject: "Bio", marks: 88, maxMarks: 100, classAvg: 74 },
  { subject: "English", marks: 92, maxMarks: 100, classAvg: 80 },
  { subject: "CS", marks: 96, maxMarks: 100, classAvg: 82 },
];

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<UserType>(() => getStoredUser());
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [markedAttendance, setMarkedAttendance] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    const handleRoleChanged = (e: Event) => {
      const customEvent = e as CustomEvent<UserType>;
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail);
      } else {
        setCurrentUser(getStoredUser());
      }
    };
    window.addEventListener("vedik_role_changed", handleRoleChanged);
    window.addEventListener("storage", handleRoleChanged);

    return () => {
      window.removeEventListener("vedik_role_changed", handleRoleChanged);
      window.removeEventListener("storage", handleRoleChanged);
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const currentRole = (currentUser?.role === "master_admin" ? "school_admin" : currentUser?.role) || "school_admin";
  const activeProfile = DEMO_PROFILES[currentUser?.role as Role] || DEMO_PROFILES.school_admin;

  // Aggregate stats
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalRevenue = transactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
  const pendingFees = fees.filter((f) => f.status === "Pending" || f.status === "Overdue").reduce((sum, f) => sum + (f.amount - f.paidAmount), 0);
  const presentToday = attendanceData.filter((a) => a.status === "Present").length;
  const attendanceRate = ((presentToday / attendanceData.length) * 100).toFixed(1);

  const recentAdmissions = students.slice(0, 5);
  const recentPayments = fees.filter((f) => f.status === "Paid").slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Hero Banner with Dynamic Persona Greetings and Session Badges */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-blue-900/15 border border-white/10">
        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold backdrop-blur-md border border-amber-400/40 text-amber-300 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
                DEMO ONLY
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-200 border border-emerald-400/30">
                Academic Session: 2026-2027
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentRole === "school_admin" && `Welcome back, ${activeProfile.name} 👑`}
              {currentRole === "teacher" && `Good morning, ${activeProfile.name} 👩‍🏫`}
              {currentRole === "student" && `Welcome, ${activeProfile.name} 🎓`}
            </h1>

            <p className="text-sm sm:text-base text-blue-100 max-w-2xl font-normal leading-relaxed">
              {currentRole === "school_admin" && "Institutional snapshot: 520 Students enrolled, 58 Staff members active, with 94.2% daily attendance."}
              {currentRole === "teacher" && "Class 10-A Class Teacher & Senior Mathematics Faculty. 2 periods scheduled for today."}
              {currentRole === "student" && "Class 10 - Section A | Roll #01 | Overall Score: 91.4% (Grade A1) • All fees cleared."}
            </p>
          </div>

          {/* Session metadata badge */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur-md border border-white/15 self-start lg:self-center">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-medium text-blue-200">Current Term</p>
              <p className="text-xs font-bold text-white">Term 1 (Half Yearly)</p>
            </div>
            <div className="h-8 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">System Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ADMIN EXECUTIVE DASHBOARD VIEW */}
      {/* ========================================================================= */}
      {currentRole === "school_admin" && (
        <div className="space-y-6 animate-fade-in">
          {/* Quick Action Shortcut Hub */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "New Admission", href: "/students", icon: <UserPlus className="h-4.5 w-4.5" />, color: "from-blue-600 to-indigo-600" },
              { label: "Collect Fee", href: "/fees", icon: <Receipt className="h-4.5 w-4.5" />, color: "from-emerald-600 to-teal-600" },
              { label: "Take Attendance", href: "/attendance", icon: <CheckSquare className="h-4.5 w-4.5" />, color: "from-amber-500 to-orange-600" },
              { label: "Schedule Exam", href: "/exams", icon: <Calendar className="h-4.5 w-4.5" />, color: "from-purple-600 to-indigo-600" },
              { label: "Send Notice", href: "/communication", icon: <Send className="h-4.5 w-4.5" />, color: "from-rose-500 to-pink-600" },
              { label: "View Reports", href: "/reports", icon: <FileText className="h-4.5 w-4.5" />, color: "from-cyan-600 to-blue-600" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${action.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* 4 Premium KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Students Card */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400">Total Enrolled</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">520</p>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold pt-1">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      <span>+12.4%</span>
                      <span className="text-slate-400 font-normal">YoY Growth</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Capacity: 600 Seats</span>
                  <span className="font-semibold text-blue-600">86.6% Full</span>
                </div>
              </CardContent>
            </Card>

            {/* Staff Card */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400">Faculty & Staff</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">58</p>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold pt-1">
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>56 Present</span>
                      <span className="text-slate-400 font-normal">(96.5%)</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Teachers: 50 | Admin: 8</span>
                  <span className="font-semibold text-emerald-600">2 on leave</span>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Card */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400">Collected Revenue</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold pt-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>+18.4%</span>
                      <span className="text-slate-400 font-normal">Target pacing</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Net Fiscal Surplus</span>
                  <span className="font-semibold text-purple-600">₹32.8 Lakhs</span>
                </div>
              </CardContent>
            </Card>

            {/* Pending Dues Card */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400">Pending Receivables</p>
                    <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{formatCurrency(pendingFees)}</p>
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold pt-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>89.2% Realized</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Pending Notices: 14</span>
                  <span className="font-semibold text-amber-600">Auto Reminded</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Financial Performance Area Chart */}
            <Card className="lg:col-span-2 rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-gray-800/80">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Revenue & Expenditure Dynamics</CardTitle>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Monthly fiscal cashflow comparisons</p>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-gray-800 p-1 rounded-xl text-xs">
                  {["monthly", "quarterly"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg font-semibold transition-all capitalize",
                        selectedPeriod === period ? "bg-white dark:bg-gray-700 text-blue-600 shadow-xs" : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.6} />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }} />
                      <Area name="Fee Revenue" type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#incomeGrad)" />
                      <Area name="Operating Expenses" type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#expenseGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Campus Attendance Breakdown */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-gray-800/80 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Campus Attendance</CardTitle>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Weekly student attendance breakdown</p>
                </div>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {attendanceRate}% Avg
                </span>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceChart} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.6} />
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                      <Bar name="Present" dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar name="Absent" dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
                      <Bar name="Late" dataKey="late" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operational Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Class Enrollment Distribution */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-gray-800/80">
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Class Enrollment Density</CardTitle>
                <p className="text-xs text-slate-500 dark:text-gray-400">Total 520 students enrolled across grades</p>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={classDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {classDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-1.5 border-t border-slate-100 dark:border-gray-800 pt-3">
                  {classDistribution.slice(0, 3).map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-2 dark:bg-gray-800 overflow-hidden">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percent}%` }} />
                        </div>
                        <span className="font-bold text-slate-800 dark:text-white">{item.value} std</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Admissions Stream */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-gray-800/80">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Recent Admissions</CardTitle>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Latest registered student files</p>
                </div>
                <Link href="/students" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="space-y-3">
                  {recentAdmissions.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800/60 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-xs dark:bg-blue-900/40 dark:text-blue-300">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-white">{student.name}</p>
                          <p className="text-[11px] text-slate-400">{student.class} • Sec {student.section}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                        student.feeStatus === "Paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      )}>
                        {student.feeStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Fee Collections */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-gray-800/80">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Fee Realization Feed</CardTitle>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Recent online receipts</p>
                </div>
                <Link href="/fees" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="space-y-3">
                  {recentPayments.map((f) => (
                    <div key={f.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800/60 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-white">{f.studentName}</p>
                          <p className="text-[10px] text-slate-400">{f.feeType} • {f.class}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        +{formatCurrency(f.paidAmount)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TEACHER WORKSPACE DASHBOARD VIEW */}
      {/* ========================================================================= */}
      {currentRole === "teacher" && (
        <div className="space-y-6 animate-fade-in">
          {/* Teacher Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-gray-400">Assigned Class</p>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white">Class 10-A</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">35 Students Enrolled</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center dark:bg-blue-900/30">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-gray-400">Today's Class Attendance</p>
                    <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">33 / 35</p>
                    <p className="text-xs text-slate-400 mt-1">94.3% Present (2 Absent)</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center dark:bg-emerald-900/30">
                    <UserCheck className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-gray-400">Homework to Review</p>
                    <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">6 Submissions</p>
                    <p className="text-xs text-slate-400 mt-1">Math Exercise 4.3</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center dark:bg-purple-900/30">
                    <FileCheck className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-gray-400">Upcoming Test</p>
                    <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">In 3 Days</p>
                    <p className="text-xs text-slate-400 mt-1">Unit Test 1 - Math</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center dark:bg-amber-900/30">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teacher Schedule & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Teaching Timetable */}
            <Card className="lg:col-span-2 rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-gray-800">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Today's Teaching Schedule</CardTitle>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Mrs. Priya Sharma • Mathematics Faculty</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/40">Today: Monday</Badge>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="space-y-3">
                  {[
                    { period: "Period 1", time: "08:30 AM - 09:15 AM", class: "Class 10-A", topic: "Quadratic Equations (Ex 4.3)", room: "Room 101", status: "Completed" },
                    { period: "Period 3", time: "10:15 AM - 11:00 AM", class: "Class 9-A", topic: "Coordinate Geometry Introduction", room: "Room 204", status: "Ongoing" },
                    { period: "Period 5", time: "12:15 PM - 01:00 PM", class: "Class 10-B", topic: "Problem Solving & Doubts", room: "Room 102", status: "Upcoming" },
                    { period: "Period 7", time: "02:00 PM - 02:45 PM", class: "Class 8-A", topic: "Linear Equations Practice", room: "Room 305", status: "Upcoming" },
                  ].map((p, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 dark:border-gray-800 dark:bg-gray-800/40 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xs shrink-0">
                          {p.period.split(" ")[1]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{p.class}</span>
                            <span className="text-[11px] text-slate-500">• {p.room}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-gray-300 font-medium">{p.topic}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{p.time}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold px-2.5 py-1 rounded-full self-start sm:self-center",
                        p.status === "Completed" ? "bg-slate-200 text-slate-700 dark:bg-gray-700 dark:text-gray-300" :
                        p.status === "Ongoing" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 animate-pulse" :
                        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      )}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Attendance One-Click Action Card */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-gray-800">
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Class 10-A Attendance</CardTitle>
                <p className="text-xs text-slate-500 dark:text-gray-400">Quick marker for Class Teacher</p>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="rounded-2xl bg-blue-50/80 p-4 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-center space-y-2">
                  <Flame className="h-8 w-8 text-amber-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Class 10-A Attendance Status</p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400">
                    {markedAttendance ? "✅ Attendance recorded successfully (33 Present, 2 Absent)." : "Ready to mark today's roll call for 35 registered students."}
                  </p>
                </div>

                <Button
                  onClick={() => setMarkedAttendance(true)}
                  className={cn(
                    "w-full rounded-xl text-xs font-bold py-2.5 transition-all gap-2 shadow-sm",
                    markedAttendance ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                  )}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {markedAttendance ? "Attendance Recorded for Today" : "1-Click Mark All Present"}
                </Button>

                <div className="border-t border-slate-100 dark:border-gray-800 pt-3 space-y-2">
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Recent Homework Submissions</p>
                  <div className="space-y-1.5 text-xs">
                    {homework.slice(0, 3).map((hw) => (
                      <div key={hw.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-gray-800/40">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-white text-[11px]">{hw.title}</p>
                          <p className="text-[10px] text-slate-400">{hw.class} • Due: {hw.dueDate}</p>
                        </div>
                        <Badge variant="outline" className="text-[9px]">{hw.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. STUDENT PORTAL DASHBOARD VIEW */}
      {/* ========================================================================= */}
      {currentRole === "student" && (
        <div className="space-y-6 animate-fade-in">
          {/* Student Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-gray-400">Attendance Score</p>
                    <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">94.8%</p>
                    <p className="text-xs text-slate-400 mt-1">Eligible for Exams (&gt;75%)</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center dark:bg-emerald-900/30">
                    <UserCheck className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-gray-400">Academic Standing</p>
                    <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">Rank #02</p>
                    <p className="text-xs text-slate-400 mt-1">Grade: A1 (Overall 91.4%)</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center dark:bg-blue-900/30">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-gray-400">Pending Homework</p>
                    <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">1 Task Due</p>
                    <p className="text-xs text-slate-400 mt-1">Math Worksheet (Tomorrow)</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center dark:bg-amber-900/30">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-gray-400">Fee Clearance</p>
                    <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">All Paid</p>
                    <p className="text-xs text-slate-400 mt-1">Receipt #VED-2026-901</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center dark:bg-purple-900/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Schedule & Performance Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subject Marks Graph */}
            <Card className="lg:col-span-2 rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-gray-800">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Subject-wise Performance</CardTitle>
                  <p className="text-xs text-slate-500 dark:text-gray-400">Aarav Patel • Half Yearly Examinations</p>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40">Overall: 91.4%</Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentMarksData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.6} />
                      <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "5px" }} />
                      <Bar name="Your Score" dataKey="marks" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                      <Bar name="Class Average" dataKey="classAvg" fill="#CBD5E1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Today's Classes for Student */}
            <Card className="rounded-2xl border-slate-200/90 bg-white/95 dark:border-gray-800 dark:bg-gray-900/90 shadow-sm">
              <CardHeader className="pb-2 border-b border-slate-100 dark:border-gray-800">
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Today's Class Timetable</CardTitle>
                <p className="text-xs text-slate-500 dark:text-gray-400">Class 10 - Section A</p>
              </CardHeader>
              <CardContent className="pt-3 space-y-3">
                {[
                  { subject: "Mathematics", teacher: "Mrs. Priya Sharma", time: "08:30 - 09:15", room: "101" },
                  { subject: "Physics", teacher: "Mr. Amit Verma", time: "09:15 - 10:00", room: "Lab 2" },
                  { subject: "English", teacher: "Mrs. Neha Gupta", time: "10:15 - 11:00", room: "101" },
                  { subject: "Computer Science", teacher: "Mrs. Kavita Singh", time: "11:00 - 11:45", room: "Comp Lab" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50/80 dark:border-gray-800 dark:bg-gray-800/40">
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{item.subject}</p>
                      <p className="text-[11px] text-slate-500 dark:text-gray-400">{item.teacher} • Room {item.room}</p>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                      {item.time}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
