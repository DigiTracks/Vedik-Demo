"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { exams } from "@/lib/mock-data";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function ExamsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Examinations</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage all examinations</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Create Exam</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Exams</p>
            <p className="text-2xl font-bold">{exams.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Upcoming</p>
            <p className="text-2xl font-bold text-blue-600">{exams.filter((e) => e.status === "Upcoming").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{exams.filter((e) => e.status === "Completed").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.name}</TableCell>
                  <TableCell><Badge variant="outline">{exam.type}</Badge></TableCell>
                  <TableCell>{exam.class}</TableCell>
                  <TableCell>{exam.startDate}</TableCell>
                  <TableCell>{exam.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={exam.status === "Completed" ? "success" : exam.status === "Ongoing" ? "warning" : "info"}>
                      {exam.status}
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

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create New Exam">
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Exam Name</label>
            <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Enter exam name" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Type</label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
                <option>Mid-Term</option>
                <option>Final</option>
                <option>Unit Test</option>
                <option>Quiz</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Class</label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
                <option>All Classes</option>
                <option>Class 10</option>
                <option>Class 9</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Start Date</label>
              <input type="date" className="w-full rounded-lg border border-gray-300 p-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">End Date</label>
              <input type="date" className="w-full rounded-lg border border-gray-300 p-2 text-sm" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Create Exam</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
