"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { staff } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Plus, Search, Edit, Trash2, Mail, Phone } from "lucide-react";

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage non-teaching staff</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Staff</p>
            <p className="text-2xl font-bold">{staff.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{staff.filter((s) => s.status === "Active").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">On Leave</p>
            <p className="text-2xl font-bold text-yellow-600">{staff.filter((s) => s.status === "On Leave").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Departments</p>
            <p className="text-2xl font-bold">{new Set(staff.map((s) => s.department)).size}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search staff..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-700">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{s.position}</TableCell>
                  <TableCell>{s.department}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{formatCurrency(s.salary)}</TableCell>
                  <TableCell>
                    <Badge variant={s.status === "Active" ? "success" : "warning"}>{s.status}</Badge>
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
