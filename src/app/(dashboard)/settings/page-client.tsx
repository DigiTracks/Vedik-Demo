"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabPanel } from "@/components/ui/tabs";
import { schoolSettings } from "@/lib/mock-data";
import { School, Bell, Palette, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("school");
  const [darkMode, setDarkMode] = useState(false);

  const tabs = [
    { id: "school", label: "School Profile", icon: <School className="h-4 w-4" /> },
    { id: "theme", label: "Theme", icon: <Palette className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Configure your school ERP settings</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        <TabPanel active={activeTab} id="school">
          <Card>
            <CardHeader><CardTitle>School Profile</CardTitle></CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">School Name</label>
                    <Input defaultValue={schoolSettings.name} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Email</label>
                    <Input defaultValue={schoolSettings.email} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Phone</label>
                    <Input defaultValue={schoolSettings.phone} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Website</label>
                    <Input defaultValue={schoolSettings.website} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium">Address</label>
                    <Input defaultValue={schoolSettings.address} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Academic Year</label>
                    <Input defaultValue={schoolSettings.academicYear} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Timezone</label>
                    <Input defaultValue={schoolSettings.timezone} />
                  </div>
                </div>
                <Button><Save className="h-4 w-4" /> Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel active={activeTab} id="theme">
          <Card>
            <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-500">Toggle dark mode for the application</p>
                  </div>
                  <button
                    onClick={() => { setDarkMode(!darkMode); document.documentElement.classList.toggle("dark"); }}
                    className={`relative h-7 w-12 rounded-full transition-colors ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}
                  >
                    <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
                <div>
                  <h3 className="mb-3 font-medium">Primary Color</h3>
                  <div className="flex gap-3">
                    {["bg-blue-600", "bg-green-600", "bg-purple-600", "bg-indigo-600", "bg-rose-600"].map((color) => (
                      <button key={color} className={`h-10 w-10 rounded-full ${color} ring-2 ring-offset-2 ring-transparent transition-all hover:ring-gray-400`} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel active={activeTab} id="notifications">
          <Card>
            <CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Fee Payment Alerts", description: "Get notified when fees are paid or overdue" },
                  { label: "Attendance Alerts", description: "Get notified for absent students" },
                  { label: "Exam Notifications", description: "Exam schedule and result notifications" },
                  { label: "Leave Requests", description: "New leave request notifications" },
                  { label: "System Updates", description: "System maintenance and update notifications" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl border p-4">
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <button className="relative h-7 w-12 rounded-full bg-blue-600">
                      <span className="absolute top-0.5 right-0.5 h-6 w-6 rounded-full bg-white shadow" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabPanel>
      </Tabs>
    </div>
  );
}
