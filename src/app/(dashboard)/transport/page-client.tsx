"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transport } from "@/lib/mock-data";
import { Plus, Bus, Users, AlertTriangle } from "lucide-react";

export default function TransportPage() {
  const activeVehicles = transport.filter((t) => t.status === "Active").length;
  const totalCapacity = transport.reduce((sum, t) => sum + t.capacity, 0);
  const totalAssigned = transport.reduce((sum, t) => sum + t.assignedStudents, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transport</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage school transport fleet</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Vehicle</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3"><Bus className="h-6 w-6 text-blue-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Active Vehicles</p>
                <p className="text-2xl font-bold">{activeVehicles}/{transport.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3"><Users className="h-6 w-6 text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Students Assigned</p>
                <p className="text-2xl font-bold">{totalAssigned}/{totalCapacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3"><AlertTriangle className="h-6 w-6 text-yellow-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Under Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{transport.filter((t) => t.status === "Maintenance").length}</p>
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
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transport.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.vehicleNumber}</TableCell>
                  <TableCell><Badge variant="outline">{t.type}</Badge></TableCell>
                  <TableCell>{t.route}</TableCell>
                  <TableCell>{t.driver}</TableCell>
                  <TableCell>{t.capacity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${(t.assignedStudents / t.capacity) * 100}%` }} />
                      </div>
                      <span className="text-sm">{t.assignedStudents}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={t.status === "Active" ? "success" : t.status === "Maintenance" ? "warning" : "outline"}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Route</Button>
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
