"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { homework } from "@/lib/mock-data";
import { Plus, Calendar, BookOpen } from "lucide-react";

export default function HomeworkPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("all");

  const filtered = selectedClass === "all" ? homework : homework.filter((h) => h.class === selectedClass);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Homework</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage homework assignments</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Assign Homework</Button>
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((hw) => (
          <Card key={hw.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <Badge variant={hw.status === "Pending" ? "warning" : hw.status === "Submitted" ? "info" : "success"}>
                  {hw.status}
                </Badge>
                <span className="text-xs text-gray-500">{hw.class} - {hw.section}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">{hw.title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{hw.description}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="h-4 w-4" />
                  {hw.subject}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Due: {hw.dueDate}
                </div>
                <p className="text-gray-500">Assigned by: {hw.assignedBy}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Assign Homework">
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Subject</label>
            <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
              <option>Select Subject</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>English</option>
              <option>Biology</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Class</label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
                <option>Select Class</option>
                <option>Class 10</option>
                <option>Class 9</option>
                <option>Class 8</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Section</label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
                <option>A</option>
                <option>B</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Homework title" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm" rows={3} placeholder="Describe the homework..." />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Due Date</label>
            <input type="date" className="w-full rounded-lg border border-gray-300 p-2 text-sm" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Assign</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
