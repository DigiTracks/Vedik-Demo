"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { classes } from "@/lib/mock-data";
import { Plus, Users } from "lucide-react";

export default function SectionsPage() {
  const allSections = classes.flatMap((cls) =>
    cls.sections.map((sec) => ({
      class: cls.name,
      section: sec,
      classTeacher: cls.classTeacher,
      students: Math.floor(cls.totalStudents / cls.sections.length),
    }))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sections</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage class sections</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Section</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {allSections.map((sec, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{sec.class} - {sec.section}</h3>
                <Badge variant="info">Active</Badge>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{sec.students} Students</span>
                </div>
                <p>Class Teacher: {sec.classTeacher}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
