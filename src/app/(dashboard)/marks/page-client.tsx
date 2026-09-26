"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { marks } from "@/lib/mock-data";
import { Search, Download, BarChart3 } from "lucide-react";

export default function MarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("all");

  const filtered = marks.filter((m) => {
    const matchSearch = m.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchExam = selectedExam === "all" || m.examName === selectedExam;
    return matchSearch && matchExam;
  });

  const avgMarks = filtered.length > 0
    ? (filtered.reduce((sum, m) => sum + m.marksObtained, 0) / filtered.length).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marks</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage student marks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><BarChart3 className="h-4 w-4" /> Analytics</Button>
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Entries</p>
            <p className="text-2xl font-bold">{marks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Average Marks</p>
            <p className="text-2xl font-bold">{avgMarks}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Highest Score</p>
            <p className="text-2xl font-bold text-green-600">{Math.max(...marks.map((m) => m.marksObtained))}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">A1 Grades</p>
            <p className="text-2xl font-bold text-blue-600">{marks.filter((m) => m.grade === "A1").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search by student name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="all">All Exams</option>
              <option value="Half Yearly Exam">Half Yearly Exam</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Class</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((mark) => (
                <TableRow key={mark.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                        {mark.studentName.charAt(0)}
                      </div>
                      <span className="font-medium">{mark.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{mark.examName}</TableCell>
                  <TableCell>{mark.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${(mark.marksObtained / mark.totalMarks) >= 0.9 ? "bg-green-500" : (mark.marksObtained / mark.totalMarks) >= 0.7 ? "bg-blue-500" : (mark.marksObtained / mark.totalMarks) >= 0.5 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${(mark.marksObtained / mark.totalMarks) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{mark.marksObtained}/{mark.totalMarks}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={mark.grade === "A1" ? "success" : mark.grade === "A2" ? "info" : mark.grade === "B1" ? "default" : "warning"}>
                      {mark.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>{mark.class}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
