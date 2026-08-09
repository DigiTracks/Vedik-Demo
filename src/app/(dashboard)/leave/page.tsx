"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { leaves } from "@/lib/mock-data";
import { Plus, Clock, CheckCircle, XCircle } from "lucide-react";

export default function LeavePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage staff leave requests</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Apply Leave</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3"><Clock className="h-6 w-6 text-yellow-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{leaves.filter((l) => l.status === "Pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3"><CheckCircle className="h-6 w-6 text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">{leaves.filter((l) => l.status === "Approved").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3"><XCircle className="h-6 w-6 text-red-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{leaves.filter((l) => l.status === "Rejected").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell className="font-medium">{leave.staffName}</TableCell>
                  <TableCell><Badge variant="outline">{leave.type}</Badge></TableCell>
                  <TableCell>{leave.startDate}</TableCell>
                  <TableCell>{leave.endDate}</TableCell>
                  <TableCell className="max-w-xs truncate">{leave.reason}</TableCell>
                  <TableCell>{leave.appliedOn}</TableCell>
                  <TableCell>
                    <Badge variant={leave.status === "Approved" ? "success" : leave.status === "Rejected" ? "danger" : "warning"}>
                      {leave.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {leave.status === "Pending" && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="text-green-600">Approve</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Reject</Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Apply for Leave">
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Leave Type</label>
            <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Earned Leave</option>
              <option>Maternity Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">From Date</label>
              <input type="date" className="w-full rounded-lg border border-gray-300 p-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">To Date</label>
              <input type="date" className="w-full rounded-lg border border-gray-300 p-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Reason</label>
            <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm" rows={3} placeholder="Enter reason for leave" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
