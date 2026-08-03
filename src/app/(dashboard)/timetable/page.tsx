"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const timetableData: Record<string, Record<string, { subject: string; teacher: string }>> = {
  Monday: {
    "9:00 AM": { subject: "Mathematics", teacher: "Mrs. Priya Sharma" },
    "10:00 AM": { subject: "Physics", teacher: "Mr. Amit Verma" },
    "11:00 AM": { subject: "English", teacher: "Mrs. Neha Gupta" },
    "12:00 PM": { subject: "Chemistry", teacher: "Mr. Rahul Deshmukh" },
    "2:00 PM": { subject: "Biology", teacher: "Mrs. Sunita Patil" },
    "3:00 PM": { subject: "Computer Science", teacher: "Mrs. Kavita Singh" },
  },
  Tuesday: {
    "9:00 AM": { subject: "Physics", teacher: "Mr. Amit Verma" },
    "10:00 AM": { subject: "Mathematics", teacher: "Mrs. Priya Sharma" },
    "11:00 AM": { subject: "Hindi", teacher: "Mrs. Kavita Singh" },
    "1:00 PM": { subject: "Chemistry", teacher: "Mr. Rahul Deshmukh" },
    "2:00 PM": { subject: "English", teacher: "Mrs. Neha Gupta" },
    "3:00 PM": { subject: "Physical Education", teacher: "Mr. Suresh Kumar" },
  },
  Wednesday: {
    "9:00 AM": { subject: "English", teacher: "Mrs. Neha Gupta" },
    "10:00 AM": { subject: "Chemistry", teacher: "Mr. Rahul Deshmukh" },
    "11:00 AM": { subject: "Mathematics", teacher: "Mrs. Priya Sharma" },
    "1:00 PM": { subject: "Physics", teacher: "Mr. Amit Verma" },
    "2:00 PM": { subject: "Biology", teacher: "Mrs. Sunita Patil" },
  },
  Thursday: {
    "9:00 AM": { subject: "Biology", teacher: "Mrs. Sunita Patil" },
    "10:00 AM": { subject: "Mathematics", teacher: "Mrs. Priya Sharma" },
    "11:00 AM": { subject: "Physics", teacher: "Mr. Amit Verma" },
    "1:00 PM": { subject: "English", teacher: "Mrs. Neha Gupta" },
    "2:00 PM": { subject: "Hindi", teacher: "Mrs. Kavita Singh" },
    "3:00 PM": { subject: "Computer Science", teacher: "Mrs. Kavita Singh" },
  },
  Friday: {
    "9:00 AM": { subject: "Chemistry", teacher: "Mr. Rahul Deshmukh" },
    "10:00 AM": { subject: "English", teacher: "Mrs. Neha Gupta" },
    "11:00 AM": { subject: "Biology", teacher: "Mrs. Sunita Patil" },
    "1:00 PM": { subject: "Mathematics", teacher: "Mrs. Priya Sharma" },
    "2:00 PM": { subject: "Physics", teacher: "Mr. Amit Verma" },
    "3:00 PM": { subject: "Physical Education", teacher: "Mr. Suresh Kumar" },
  },
};

const subjectColors: Record<string, string> = {
  Mathematics: "bg-blue-100 border-blue-300 text-blue-800",
  Physics: "bg-green-100 border-green-300 text-green-800",
  Chemistry: "bg-purple-100 border-purple-300 text-purple-800",
  Biology: "bg-yellow-100 border-yellow-300 text-yellow-800",
  English: "bg-pink-100 border-pink-300 text-pink-800",
  Hindi: "bg-orange-100 border-orange-300 text-orange-800",
  "Computer Science": "bg-indigo-100 border-indigo-300 text-indigo-800",
  "Physical Education": "bg-red-100 border-red-300 text-red-800",
};

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Timetable</h1>
        <p className="text-gray-500 dark:text-gray-400">Class 10 - Section A Weekly Schedule</p>
      </div>

      <Card>
        <CardContent className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left text-sm font-medium text-gray-500">Time</th>
                {days.map((day) => (
                  <th key={day} className="border border-gray-200 dark:border-gray-700 p-3 text-left text-sm font-medium text-gray-500">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((period) => (
                <tr key={period}>
                  <td className="border border-gray-200 dark:border-gray-700 p-3 text-sm font-medium">{period}</td>
                  {days.map((day) => {
                    const cell = timetableData[day]?.[period];
                    return (
                      <td key={`${day}-${period}`} className="border border-gray-200 dark:border-gray-700 p-2">
                        {cell ? (
                          <div className={`rounded-lg border-l-4 p-2 ${subjectColors[cell.subject] || "bg-gray-100 border-gray-300"}`}>
                            <p className="text-xs font-semibold">{cell.subject}</p>
                            <p className="text-[10px] opacity-75">{cell.teacher}</p>
                          </div>
                        ) : (
                          <div className="p-2 text-center text-xs text-gray-400">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
