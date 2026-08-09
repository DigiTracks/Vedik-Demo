"use client";

import { Role, User } from "@/types";

const AUTH_KEY = "vedik_auth";

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

export function loginUser(email: string, password: string, role: Role): User | null {
  const user: User = {
    id: "1",
    name: role === "master_admin" ? "Master Admin" : role === "school_admin" ? "School Admin" : "Mrs. Priya Sharma",
    email,
    role,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn(): boolean {
  return getStoredUser() !== null;
}
