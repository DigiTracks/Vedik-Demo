"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabPanel } from "@/components/ui/tabs";
import { Users, DollarSign, BookOpen, Download, Calendar } from "lucide-react";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/charts";

const Bars = dynamic(() => import("@/components/charts").then((m) => m.Bars), {
  ssr: false,
  loading: () => <ChartSkeleton height={256} />,
});
const Donut = dynamic(() => import("@/components/charts").then((m) => m.Donut), {
  ssr: false,
  loading: () => <ChartSkeleton height={256} />,
});

const reportTabs = [
  { id: "student", label: "Student Reports", icon: <Users className="h-4 w-4" /> },
  { id: "attendance", label: "Attendance Reports", icon: <Calendar className="h-4 w-4" /> },
  { id: "fee", label: "Fee Reports", icon: <DollarSign className="h-4 w-4" /> },
  { id: "exam", label: "Exam Reports", icon: <BookOpen className="h-4 w-4" /> },
];

const studentDistribution = [
  { name: "Class 6", count: 120 },
  { name: "Class 7", count: 85 },
  { name: "Class 8", count: 80 },
  { name: "Class 9", count: 75 },
  { name: "Class 10", count: 70 },
];

const feeCollection = [
  { month: "Apr", collected: 4200000, pending: 800000 },
  { month: "May", collected: 3800000, pending: 1200000 },
  { month: "Jun", collected: 4500000, pending: 500000 },
  { month: "Jul", collected: 3200000, pending: 1800000 },
];

const gradeDistribution = [
  { name: "A1", value: 45, color: "#10B981" },
  { name: "A2", value: 35, color: "#3B82F6" },
  { name: "B1", value: 25, color: "#F59E0B" },
  { name: "B2", value: 15, color: "#F97316" },
  { name: "C1", value: 8, color: "#EF4444" },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">Comprehensive analytics and reports</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4" /> Export All</Button>
      </div>

      <Tabs tabs={reportTabs} activeTab={activeTab} onTabChange={setActiveTab}>
        <TabPanel active={activeTab} id="student">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Student Distribution by Class</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bars
                    data={studentDistribution}
                    xKey="name"
                    height={256}
                    legend={false}
                    margin={{ top: 5, right: 5, bottom: 0, left: 0 }}
                    series={[{ dataKey: "count", name: "Students", color: "#3B82F6" }]}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Key Metrics</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Students", value: "430", change: "+12%", color: "text-blue-600" },
                    { label: "New Admissions", value: "45", change: "+8%", color: "text-green-600" },
                    { label: "Dropout Rate", value: "2.1%", change: "-0.5%", color: "text-red-600" },
                    { label: "Pass Rate", value: "94%", change: "+3%", color: "text-purple-600" },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-xl border p-4">
                      <p className="text-sm text-gray-500">{metric.label}</p>
                      <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                      <p className="text-xs text-gray-400">{metric.change} vs last year</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        <TabPanel active={activeTab} id="attendance">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-green-600">92%</p>
                <p className="text-sm text-gray-500">Average Attendance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-yellow-600">5%</p>
                <p className="text-sm text-gray-500">Late Arrivals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-red-600">3%</p>
                <p className="text-sm text-gray-500">Absent Rate</p>
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        <TabPanel active={activeTab} id="fee">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Fee Collection Trend</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bars
                    data={feeCollection}
                    xKey="month"
                    yFormat="lakh"
                    height={256}
                    margin={{ top: 5, right: 5, bottom: 0, left: 0 }}
                    series={[
                      { dataKey: "collected", name: "Collected", color: "#10B981" },
                      { dataKey: "pending", name: "Pending", color: "#EF4444" },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Collection Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Total Collected", value: "₹1,57,00,000", color: "text-green-600" },
                    { label: "Total Pending", value: "₹43,00,000", color: "text-yellow-600" },
                    { label: "Collection Rate", value: "78.5%", color: "text-blue-600" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border p-4">
                      <span className="text-gray-600">{item.label}</span>
                      <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        <TabPanel active={activeTab} id="exam">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Grade Distribution</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <Donut data={gradeDistribution} innerRadius={50} outerRadius={80} height={256} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Exam Statistics</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Average Score", value: "72%", color: "text-blue-600" },
                    { label: "Highest Score", value: "98%", color: "text-green-600" },
                    { label: "Pass Rate", value: "94%", color: "text-purple-600" },
                    { label: "Top Performers", value: "45 students", color: "text-yellow-600" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border p-4">
                      <span className="text-gray-600">{item.label}</span>
                      <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
