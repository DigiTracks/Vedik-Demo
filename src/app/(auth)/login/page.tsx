"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { LOGO_PATH } from "@/lib/utils";
import type { Role } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("school_admin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    loginUser(email, password, role);
    router.push("/dashboard");
  };

  const roles: { value: Role; label: string; description: string }[] = [
    { value: "master_admin", label: "Master Admin", description: "Full system access" },
    { value: "school_admin", label: "School Admin", description: "School management access" },
    { value: "teacher", label: "Teacher", description: "Class & student access" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRhMiAyIDAgMSAxLTQgMCAyIDIgMCAwIDEgNCAwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden">
            <img src={LOGO_PATH} alt="VEDIK Logo" className="h-16 w-16 object-contain" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">VEDIK School ERP</h1>
          <p className="mb-8 text-center text-lg text-blue-100">
            Complete School Management System
          </p>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-blue-100">Students</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">50+</p>
              <p className="text-sm text-blue-100">Teachers</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm text-blue-100">Modules</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-blue-100">Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 overflow-hidden">
              <img src={LOGO_PATH} alt="VEDIK Logo" className="h-12 w-12 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VEDIK School ERP</h1>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Sign in to access your dashboard
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="admin@vedik.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`rounded-lg border-2 p-3 text-center transition-all ${
                        role === r.value
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
                      }`}
                    >
                      <p className={`text-sm font-medium ${
                        role === r.value ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                      }`}>
                        {r.label}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {r.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              This is a demo. Enter any email/password to login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
