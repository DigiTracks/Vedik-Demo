"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { classes, subjects } from "@/lib/mock-data";
import { BookOpen, Layers, Tag, Clock, ArrowRight } from "lucide-react";

export default function AcademicsPage() {
  const modules = [
    { title: "Classes", description: "Manage all classes", icon: <Layers className="h-6 w-6" />, href: "/classes", count: classes.length, color: "bg-blue-500" },
    { title: "Sections", description: "Manage class sections", icon: <BookOpen className="h-6 w-6" />, href: "/sections", count: classes.reduce((sum, c) => sum + c.sections.length, 0), color: "bg-green-500" },
    { title: "Subjects", description: "Manage subjects", icon: <Tag className="h-6 w-6" />, href: "/subjects", count: subjects.length, color: "bg-purple-500" },
    { title: "Timetable", description: "Class schedule", icon: <Clock className="h-6 w-6" />, href: "/timetable", count: 0, color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academics</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage academic structure and curriculum</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((mod) => (
          <Link key={mod.title} href={mod.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                <div className={`mb-4 inline-flex rounded-xl p-3 text-white ${mod.color}`}>
                  {mod.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mod.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{mod.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">{mod.count} items</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
