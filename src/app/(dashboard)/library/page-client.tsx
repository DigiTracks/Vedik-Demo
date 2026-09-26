"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { books } from "@/lib/mock-data";
import { Plus, Search, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = books.filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalBooks = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const availableBooks = books.reduce((sum, b) => sum + b.availableCopies, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Library</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage library inventory and issued books</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Add Book</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3"><BookOpen className="h-6 w-6 text-blue-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Total Books</p>
                <p className="text-2xl font-bold">{totalBooks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3"><CheckCircle className="h-6 w-6 text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-2xl font-bold text-green-600">{availableBooks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3"><AlertTriangle className="h-6 w-6 text-yellow-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Issued</p>
                <p className="text-2xl font-bold text-yellow-600">{totalBooks - availableBooks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search books..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell className="font-mono text-xs">{book.isbn}</TableCell>
                  <TableCell><Badge variant="outline">{book.category}</Badge></TableCell>
                  <TableCell>
                    <span className={book.availableCopies === 0 ? "text-red-600 font-semibold" : ""}>
                      {book.availableCopies}/{book.totalCopies}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{book.location}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Issue</Button>
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
