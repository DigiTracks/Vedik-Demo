"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { messages } from "@/lib/mock-data";
import { Plus, MessageSquare, Bell, AlertTriangle, Send } from "lucide-react";

export default function CommunicationPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState<typeof messages[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communication</h1>
          <p className="text-gray-500 dark:text-gray-400">Announcements, circulars, and notices</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> New Message</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3"><MessageSquare className="h-6 w-6 text-blue-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3"><AlertTriangle className="h-6 w-6 text-yellow-600" /></div>
              <div>
                <p className="text-sm text-gray-500">High Priority</p>
                <p className="text-2xl font-bold text-yellow-600">{messages.filter((m) => m.priority === "High").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3"><Bell className="h-6 w-6 text-green-600" /></div>
              <div>
                <p className="text-sm text-gray-500">Announcements</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.type === "Announcement").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {messages.map((msg) => (
          <Card key={msg.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedMsg(msg)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`rounded-xl p-2 ${
                    msg.type === "Announcement" ? "bg-blue-100" : msg.type === "Circular" ? "bg-purple-100" : "bg-gray-100"
                  }`}>
                    <MessageSquare className={`h-5 w-5 ${
                      msg.type === "Announcement" ? "text-blue-600" : msg.type === "Circular" ? "text-purple-600" : "text-gray-600"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{msg.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{msg.content}</p>
                  </div>
                </div>
                <Badge variant={msg.priority === "High" ? "danger" : msg.priority === "Medium" ? "warning" : "outline"}>
                  {msg.priority}
                </Badge>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>By {msg.sender}</span>
                <span>{msg.date}</span>
              </div>
              <div className="mt-2">
                <Badge variant="info">{msg.type}</Badge>
                <span className="ml-2 text-xs text-gray-500">To: {msg.recipients}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={!!selectedMsg} onClose={() => setSelectedMsg(null)} title={selectedMsg?.title}>
        {selectedMsg && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>From: {selectedMsg.sender}</span>
              <span>|</span>
              <span>{selectedMsg.date}</span>
            </div>
            <div className="flex gap-2">
              <Badge variant={selectedMsg.type === "Announcement" ? "default" : selectedMsg.type === "Circular" ? "info" : "outline"}>{selectedMsg.type}</Badge>
              <Badge variant={selectedMsg.priority === "High" ? "danger" : selectedMsg.priority === "Medium" ? "warning" : "outline"}>{selectedMsg.priority}</Badge>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedMsg.content}</p>
            <div className="text-sm text-gray-500">To: {selectedMsg.recipients}</div>
          </div>
        )}
      </Modal>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Message">
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Message title" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Type</label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
                <option>Announcement</option>
                <option>Circular</option>
                <option>Notice</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Priority</label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Recipients</label>
            <select className="w-full rounded-lg border border-gray-300 p-2 text-sm">
              <option>All</option>
              <option>All Students</option>
              <option>All Parents</option>
              <option>All Teachers</option>
              <option>All Staff</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Content</label>
            <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm" rows={4} placeholder="Write your message..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}><Send className="h-4 w-4" /> Send</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
