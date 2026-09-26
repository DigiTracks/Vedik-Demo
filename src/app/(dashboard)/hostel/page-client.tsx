"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hostels } from "@/lib/mock-data";
import { Plus, Home, Users, BedDouble } from "lucide-react";

export default function HostelPage() {
  const totalRooms = hostels.reduce((sum, h) => sum + h.totalRooms, 0);
  const occupiedRooms = hostels.reduce((sum, h) => sum + h.occupiedRooms, 0);
  const totalCapacity = hostels.reduce((sum, h) => sum + h.capacity, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hostel</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage hostel accommodations</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Hostel</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3"><Home className="h-6 w-6 text-blue-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Total Hostels</p>
                <p className="text-2xl font-bold">{hostels.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3"><BedDouble className="h-6 w-6 text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Rooms Occupied</p>
                <p className="text-2xl font-bold">{occupiedRooms}/{totalRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3"><Users className="h-6 w-6 text-purple-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Total Capacity</p>
                <p className="text-2xl font-bold">{totalCapacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hostels.map((h) => (
          <Card key={h.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{h.name}</h3>
                  <Badge variant={h.type === "Boys" ? "info" : "success"} className="mt-1">{h.type}</Badge>
                </div>
                <Badge variant={h.occupancy > 85 ? "danger" : h.occupancy > 70 ? "warning" : "success"}>
                  {h.occupancy}% Full
                </Badge>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rooms</span>
                    <span>{h.occupiedRooms}/{h.totalRooms}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: `${(h.occupiedRooms / h.totalRooms) * 100}%` }} />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Warden</span>
                  <span className="font-medium">{h.warden}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capacity</span>
                  <span>{h.capacity} students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
