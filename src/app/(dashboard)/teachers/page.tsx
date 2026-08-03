"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { teachers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Plus, Search, Eye, Edit, Trash2, Mail, Phone } from "lucide-react";

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teachers</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage teacher profiles and assignments</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Teachers</p>
            <p className="text-2xl font-bold">{teachers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{teachers.filter((t) => t.status === "Active").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">On Leave</p>
            <p className="text-2xl font-bold text-yellow-600">{teachers.filter((t) => t.status === "On Leave").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search teachers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                    {teacher.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{teacher.name}</h3>
                    <p className="text-sm text-gray-500">{teacher.subject}</p>
                  </div>
                </div>
                <Badge variant={teacher.status === "Active" ? "success" : teacher.status === "On Leave" ? "warning" : "outline"}>
                  {teacher.status}
                </Badge>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {teacher.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {teacher.phone}
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-medium">{teacher.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Salary</span>
                  <span className="font-medium">{formatCurrency(teacher.salary)}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { setSelectedTeacher(teacher); setShowModal(true); }}>
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Teacher Details Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Teacher Profile">
        {selectedTeacher && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                {selectedTeacher.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedTeacher.name}</h3>
                <p className="text-gray-500">{selectedTeacher.subject}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Email:</span> {selectedTeacher.email}</div>
              <div><span className="text-gray-500">Phone:</span> {selectedTeacher.phone}</div>
              <div><span className="text-gray-500">Qualification:</span> {selectedTeacher.qualification}</div>
              <div><span className="text-gray-500">Experience:</span> {selectedTeacher.experience}</div>
              <div><span className="text-gray-500">Salary:</span> {formatCurrency(selectedTeacher.salary)}</div>
              <div><span className="text-gray-500">Join Date:</span> {selectedTeacher.joinDate}</div>
              <div className="col-span-2"><span className="text-gray-500">Classes:</span> {selectedTeacher.classesAssigned.join(", ")}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
