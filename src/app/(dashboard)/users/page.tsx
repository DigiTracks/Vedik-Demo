"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Shield, Edit, Trash2, UserPlus } from "lucide-react";
import type { Role } from "@/types";

const users = [
  { id: "U001", name: "Master Admin", email: "admin@vedik.edu.in", role: "master_admin" as Role, lastLogin: "2026-07-26", status: "Active" },
  { id: "U002", name: "School Admin", email: "schooladmin@vedik.edu.in", role: "school_admin" as Role, lastLogin: "2026-07-25", status: "Active" },
  { id: "U003", name: "Mrs. Priya Sharma", email: "priya@vedik.edu.in", role: "teacher" as Role, lastLogin: "2026-07-26", status: "Active" },
  { id: "U004", name: "Mr. Amit Verma", email: "amit@vedik.edu.in", role: "teacher" as Role, lastLogin: "2026-07-24", status: "Active" },
  { id: "U005", name: "Ramesh Yadav", email: "ramesh@vedik.edu.in", role: "school_admin" as Role, lastLogin: "2026-07-23", status: "Active" },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = users.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage user accounts and roles</p>
        </div>
        <Button onClick={() => setShowModal(true)}><UserPlus className="h-4 w-4" /> Add User</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "master_admin" || u.role === "school_admin").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Teachers</p>
            <p className="text-2xl font-bold text-green-600">{users.filter((u) => u.role === "teacher").length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "master_admin" ? "danger" : user.role === "school_admin" ? "default" : "info"}>
                      {user.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
                  <TableCell>
                    <Badge variant="success">{user.status}</Badge>
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

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New User">
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Full name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input type="email" className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="email@vedik.edu.in" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
              <option value="teacher">Teacher</option>
              <option value="school_admin">School Admin</option>
              <option value="master_admin">Master Admin</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input type="password" className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Set password" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Create User</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
