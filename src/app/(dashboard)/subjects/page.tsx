"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { subjects } from "@/lib/mock-data";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function SubjectsPage() {
  const [selectedClass, setSelectedClass] = useState("all");

  const filtered = selectedClass === "all" ? subjects : subjects.filter((s) => s.class === selectedClass);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subjects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage subjects and curriculum</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Subject</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="all">All Classes</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 8">Class 8</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-mono text-sm">{sub.code}</TableCell>
                  <TableCell className="font-medium">{sub.name}</TableCell>
                  <TableCell>{sub.class}</TableCell>
                  <TableCell>{sub.teacher}</TableCell>
                  <TableCell>
                    <Badge variant={sub.type === "Theory" ? "default" : sub.type === "Practical" ? "info" : "warning"}>
                      {sub.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
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
