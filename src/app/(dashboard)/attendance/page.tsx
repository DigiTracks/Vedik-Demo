"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { attendanceData } from "@/lib/mock-data";
import { Calendar, Check, X, Clock, Download, Hourglass } from "lucide-react";

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-07-25");
  const [selectedClass, setSelectedClass] = useState("all");

  const filteredAttendance = attendanceData.filter((a) => {
    const matchesClass = selectedClass === "all" || a.class === selectedClass;
    return matchesClass;
  });

  const presentCount = filteredAttendance.filter((a) => a.status === "Present").length;
  const absentCount = filteredAttendance.filter((a) => a.status === "Absent").length;
  const lateCount = filteredAttendance.filter((a) => a.status === "Late").length;
  const halfDayCount = filteredAttendance.filter((a) => a.status === "Half Day").length;
  const total = filteredAttendance.length;
  const attendanceRate = total > 0 ? ((presentCount / total) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance</h1>
          <p className="text-gray-500 dark:text-gray-400">Track and manage student attendance</p>
        </div>
        <Button>
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-xs text-gray-500">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{presentCount}</p>
            <p className="text-xs text-gray-500">Present</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{absentCount}</p>
            <p className="text-xs text-gray-500">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
            <p className="text-xs text-gray-500">Late</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <Hourglass className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{halfDayCount}</p>
            <p className="text-xs text-gray-500">Half Day</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <span className="text-lg font-bold text-purple-600">%</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{attendanceRate}%</p>
            <p className="text-xs text-gray-500">Attendance Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div>
              <label className="mb-1 block text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="all">All Classes</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 7">Class 7</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Record - {selectedDate}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Mark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                        {a.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{a.studentName}</p>
                        <p className="text-xs text-gray-500">{a.studentId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{a.class}</TableCell>
                  <TableCell>{a.section}</TableCell>
                  <TableCell>
                    <Badge variant={
                      a.status === "Present" ? "success" :
                      a.status === "Absent" ? "danger" :
                      a.status === "Late" ? "warning" : "info"
                    }>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="text-green-600">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
