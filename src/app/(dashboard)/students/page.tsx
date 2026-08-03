"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { students, schoolSettings } from "@/lib/mock-data";
import { BASE_PATH } from "@/lib/utils";
import { Plus, Search, Eye, Edit, Trash2, Printer, Download, X, Save, UserPlus } from "lucide-react";

type Student = typeof students[0];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<Student | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || s.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEdit = (student: Student) => {
    setEditForm({ ...student });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setShowEditModal(false);
    setEditForm(null);
  };

  const handlePrintIdCard = (student: Student) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>ID Card - ${student.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f0f0; }
          .card { width: 340px; border: 2px solid #1a1a1a; border-radius: 16px; overflow: hidden; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
          .card-header { background: linear-gradient(135deg, #2563eb, #4f46e5); color: white; padding: 16px; text-align: center; }
          .card-header img { height: 40px; margin-bottom: 4px; }
          .card-header h2 { font-size: 16px; font-weight: 700; letter-spacing: 1px; }
          .card-header p { font-size: 10px; opacity: 0.8; }
          .card-body { padding: 16px; text-align: center; }
          .photo { width: 80px; height: 80px; border-radius: 50%; background: #e0e7ff; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #2563eb; border: 3px solid #2563eb; }
          .name { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
          .class-info { font-size: 12px; color: #666; margin-bottom: 12px; }
          .details { text-align: left; font-size: 11px; }
          .details .row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #ddd; }
          .details .label { color: #888; }
          .details .value { font-weight: 600; }
          .card-footer { background: #f8fafc; padding: 10px 16px; text-align: center; font-size: 10px; color: #888; border-top: 1px solid #eee; }
          @media print { body { background: none; } .card { box-shadow: none; } }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="card-header">
            <img src="${window.location.origin}${BASE_PATH}/logo.png" alt="Logo" onerror="this.style.display='none'" />
            <h2>${schoolSettings.name.toUpperCase()}</h2>
            <p>${schoolSettings.phone}</p>
          </div>
          <div class="card-body">
            <div class="photo">${student.name.charAt(0)}</div>
            <div class="name">${student.name}</div>
            <div class="class-info">${student.class} - ${student.section} | Roll #${student.rollNumber}</div>
            <div class="details">
              <div class="row"><span class="label">ID:</span><span class="value">${student.id}</span></div>
              <div class="row"><span class="label">DOB:</span><span class="value">${student.dateOfBirth}</span></div>
              <div class="row"><span class="label">Parent:</span><span class="value">${student.parentName}</span></div>
              <div class="row"><span class="label">Phone:</span><span class="value">${student.parentPhone}</span></div>
            </div>
          </div>
          <div class="card-footer">VEDIK School ERP v2.0 | ${schoolSettings.academicYear}</div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage all student records</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <UserPlus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Classes</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 6">Class 6</option>
            </select>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.parentName}</TableCell>
                  <TableCell>
                    <Badge variant={student.feeStatus === "Paid" ? "success" : student.feeStatus === "Pending" ? "warning" : student.feeStatus === "Partial" ? "info" : "danger"}>
                      {student.feeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "success" : "outline"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="View Profile" onClick={() => handleView(student)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit Student" onClick={() => handleEdit(student)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Print ID Card" onClick={() => handlePrintIdCard(student)}>
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ===== VIEW STUDENT MODAL ===== */}
      <Modal open={showViewModal} onClose={() => setShowViewModal(false)} title="Student Profile">
        {selectedStudent && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-500">{selectedStudent.id} | {selectedStudent.class} - {selectedStudent.section}</p>
                <Badge variant={selectedStudent.status === "Active" ? "success" : "outline"} className="mt-1">{selectedStudent.status}</Badge>
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-3">
              <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Personal Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedStudent.email}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedStudent.phone}</span></div>
                <div><span className="text-gray-500">DOB:</span> <span className="font-medium">{selectedStudent.dateOfBirth}</span></div>
                <div><span className="text-gray-500">Gender:</span> <span className="font-medium">{selectedStudent.gender}</span></div>
                <div><span className="text-gray-500">Roll No:</span> <span className="font-medium">{selectedStudent.rollNumber}</span></div>
                <div><span className="text-gray-500">Admission:</span> <span className="font-medium">{selectedStudent.admissionDate}</span></div>
              </div>
              <div className="text-sm"><span className="text-gray-500">Address:</span> <span className="font-medium">{selectedStudent.address}</span></div>
            </div>
            <div className="rounded-xl border p-4 space-y-3">
              <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Parent / Guardian</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium">{selectedStudent.parentName}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedStudent.parentPhone}</span></div>
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-3">
              <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Fee Status</h4>
              <div className="flex items-center gap-3">
                <Badge variant={selectedStudent.feeStatus === "Paid" ? "success" : selectedStudent.feeStatus === "Pending" ? "warning" : selectedStudent.feeStatus === "Partial" ? "info" : "danger"} className="text-sm">
                  {selectedStudent.feeStatus}
                </Badge>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => handlePrintIdCard(selectedStudent)}>
                <Printer className="h-4 w-4" /> Print ID Card
              </Button>
              <Button onClick={() => { setShowViewModal(false); handleEdit(selectedStudent); }}>
                <Edit className="h-4 w-4" /> Edit
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ===== EDIT STUDENT MODAL ===== */}
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Student">
        {editForm && (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">First Name</label>
                <Input
                  value={editForm.name.split(" ")[0] || ""}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value + " " + (editForm.name.split(" ")[1] || "") })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Last Name</label>
                <Input
                  value={editForm.name.split(" ").slice(1).join(" ") || ""}
                  onChange={(e) => setEditForm({ ...editForm, name: (editForm.name.split(" ")[0] || "") + " " + e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Class</label>
                <select
                  value={editForm.class}
                  onChange={(e) => setEditForm({ ...editForm, class: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option>Class 10</option>
                  <option>Class 9</option>
                  <option>Class 8</option>
                  <option>Class 7</option>
                  <option>Class 6</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Section</label>
                <select
                  value={editForm.section}
                  onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Address</label>
              <Input value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Parent Name</label>
                <Input value={editForm.parentName} onChange={(e) => setEditForm({ ...editForm, parentName: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Parent Phone</label>
                <Input value={editForm.parentPhone} onChange={(e) => setEditForm({ ...editForm, parentPhone: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Student["status"] })}
                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Graduated</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button type="submit"><Save className="h-4 w-4" /> Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* ===== ADD STUDENT MODAL ===== */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Student">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">First Name</label>
              <Input placeholder="Enter first name" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Last Name</label>
              <Input placeholder="Enter last name" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input type="email" placeholder="student@vedik.edu.in" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <Input placeholder="9876543210" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Class</label>
              <select className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                <option>Select Class</option>
                <option>Class 6</option>
                <option>Class 7</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Section</label>
              <select className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                <option>Select Section</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Date of Birth</label>
            <Input type="date" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Gender</label>
            <select className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Address</label>
            <Input placeholder="Full address" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Parent Name</label>
              <Input placeholder="Parent/Guardian name" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Parent Phone</label>
              <Input placeholder="9876543210" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit"><UserPlus className="h-4 w-4" /> Add Student</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
