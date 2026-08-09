"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { inventory } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Plus, Search, Package, AlertTriangle, CheckCircle } from "lucide-react";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = inventory.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalValue = inventory.reduce((sum, i) => sum + i.totalValue, 0);
  const lowStock = inventory.filter((i) => i.status === "Low Stock" || i.status === "Out of Stock").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage school inventory and supplies</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Add Item</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3"><Package className="h-6 w-6 text-blue-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3"><CheckCircle className="h-6 w-6 text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-red-600">{lowStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search inventory..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                  <TableCell className="font-semibold">{item.quantity}</TableCell>
                  <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell>{formatCurrency(item.totalValue)}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "In Stock" ? "success" : item.status === "Low Stock" ? "warning" : "danger"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{item.lastRestocked}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Restock</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Inventory Item">
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Item Name</label>
            <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Enter item name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
                <option>Stationery</option>
                <option>Electronics</option>
                <option>Lab Equipment</option>
                <option>Sports</option>
                <option>Furniture</option>
                <option>Medical</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Quantity</label>
              <input type="number" className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="0" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Unit Price (₹)</label>
            <input type="number" className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="0" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Add Item</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
