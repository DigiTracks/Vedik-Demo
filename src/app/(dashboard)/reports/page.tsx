"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabPanel } from "@/components/ui/tabs";
import { BarChart3, Users, DollarSign, BookOpen, FileText, Download, Calendar } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

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
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
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
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feeCollection}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip formatter={(v) => `₹${(Number(v) / 100000).toFixed(1)}L`} />
                      <Legend />
                      <Bar dataKey="collected" fill="#10B981" name="Collected" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" fill="#EF4444" name="Pending" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
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
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                        {gradeDistribution.map((entry, index) => (
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
