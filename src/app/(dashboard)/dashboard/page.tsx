"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { students, teachers, transactions, fees, attendanceData, classes } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  GraduationCap,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BookOpen,
  Bus,
  Package,
  Clock,
  Download,
  RefreshCw,
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
  LineChart,
  Line,
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
  { name: "Class 6", value: 120, color: "#3B82F6" },
  { name: "Class 7", value: 85, color: "#10B981" },
  { name: "Class 8", value: 80, color: "#F59E0B" },
  { name: "Class 9", value: 75, color: "#EF4444" },
  { name: "Class 10", value: 70, color: "#8B5CF6" },
];

const recentAdmissions = students.slice(0, 5);
const recentPayments = fees.filter((f) => f.status === "Paid").slice(0, 5);

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalRevenue = transactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);
  const pendingFees = fees.filter((f) => f.status === "Pending" || f.status === "Overdue").reduce((sum, f) => sum + (f.amount - f.paidAmount), 0);
  const presentToday = attendanceData.filter((a) => a.status === "Present").length;
  const attendanceRate = ((presentToday / attendanceData.length) * 100).toFixed(1);

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      change: "+12%",
      trend: "up" as const,
      icon: <GraduationCap className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Total Teachers",
      value: totalTeachers,
      change: "+3%",
      trend: "up" as const,
      icon: <Users className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Revenue",
      value: formatCurrency(totalRevenue),
      change: "+18%",
      trend: "up" as const,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-purple-500",
    },
    {
      title: "Pending Fees",
      value: formatCurrency(pendingFees),
      change: "-8%",
      trend: "down" as const,
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back! Here&apos;s what&apos;s happening at your school.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`rounded-xl p-3 ${stat.color} text-white`}>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <div className="flex gap-1">
                {["weekly", "monthly", "yearly"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                      selectedPeriod === period
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Area type="monotone" dataKey="income" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="expense" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Attendance</CardTitle>
              <Badge variant="success">{attendanceRate}% Present</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="late" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Distribution & Quick Stats */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Class Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Class Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {classDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Admissions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Admissions</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAdmissions.map((student) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{student.class} - {student.section}</p>
                    </div>
                  </div>
                  <Badge variant={student.feeStatus === "Paid" ? "success" : student.feeStatus === "Pending" ? "warning" : "danger"}>
                    {student.feeStatus}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Payments</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((fee) => (
                <div key={fee.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{fee.studentName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{fee.feeType}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(fee.paidAmount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Upcoming */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Add Student", icon: <GraduationCap className="h-5 w-5" />, color: "bg-blue-500" },
                { label: "Mark Attendance", icon: <Calendar className="h-5 w-5" />, color: "bg-green-500" },
                { label: "Create Exam", icon: <BookOpen className="h-5 w-5" />, color: "bg-purple-500" },
                { label: "Fee Collection", icon: <DollarSign className="h-5 w-5" />, color: "bg-yellow-500" },
                { label: "Transport", icon: <Bus className="h-5 w-5" />, color: "bg-indigo-500" },
                { label: "Inventory", icon: <Package className="h-5 w-5" />, color: "bg-pink-500" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-900/20"
                >
                  <div className={`rounded-lg p-2 text-white ${action.color}`}>{action.icon}</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Button variant="ghost" size="sm">View Calendar</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "PTM Meeting", date: "25 Jul 2026", type: "meeting", color: "bg-blue-100 text-blue-700" },
                { title: "Unit Test 1", date: "28 Jul 2026", type: "exam", color: "bg-red-100 text-red-700" },
                { title: "Sports Day", date: "05 Aug 2026", type: "event", color: "bg-green-100 text-green-700" },
                { title: "Independence Day", date: "15 Aug 2026", type: "holiday", color: "bg-purple-100 text-purple-700" },
                { title: "Mid-Term Exam", date: "15 Sep 2026", type: "exam", color: "bg-red-100 text-red-700" },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${event.color}`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
