"use client";

import { useSyncExternalStore } from "react";
import { Role, User } from "@/types";

const AUTH_KEY = "vedik_auth";

export interface DemoProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  title: string;
  avatarText: string;
  badge: string;
}

export const DEMO_PROFILES: Record<Role, DemoProfile> = {
  school_admin: {
    id: "admin-1",
    name: "Dr. Rajeshwar Rao",
    email: "admin@vedik.edu.in",
    role: "school_admin",
    title: "Principal & School Administrator",
    avatarText: "RR",
    badge: "Admin",
  },
  master_admin: {
    id: "admin-master",
    name: "Super Admin",
    email: "master@vedik.edu.in",
    role: "master_admin",
    title: "System Master Admin",
    avatarText: "SA",
    badge: "Master Admin",
  },
  teacher: {
    id: "teacher-1",
    name: "Mrs. Priya Sharma",
    email: "priya.sharma@vedik.edu.in",
    role: "teacher",
    title: "Senior Math Teacher (Class 10-A)",
    avatarText: "PS",
    badge: "Teacher",
  },
  student: {
    id: "student-1",
    name: "Aarav Patel",
    email: "aarav.patel@vedik.edu.in",
    role: "student",
    title: "Class 10-A | Roll No: #01",
    avatarText: "AP",
    badge: "Student",
  },
};

export const DEFAULT_ROLE: Role = "school_admin";

const authListeners = new Set<() => void>();
let cachedUser: User | null = null;

function readUser(): User {
  if (typeof window === "undefined") {
    return DEMO_PROFILES[DEFAULT_ROLE];
  }

  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && parsed.role && DEMO_PROFILES[parsed.role as Role]) {
        return parsed;
      }
    }
  } catch {
    localStorage.removeItem(AUTH_KEY);
  }

  return DEMO_PROFILES[DEFAULT_ROLE];
}

export function useDemoUser(): User {
  return useSyncExternalStore(
    (listener) => {
      authListeners.add(listener);
      return () => authListeners.delete(listener);
    },
    () => {
      cachedUser ??= readUser();
      return cachedUser;
    },
    () => DEMO_PROFILES[DEFAULT_ROLE]
  );
}

export function switchDemoRole(role: Role): User {
  const profile = DEMO_PROFILES[role] || DEMO_PROFILES[DEFAULT_ROLE];
  const user: User = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    role: profile.role,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    cachedUser = user;
    authListeners.forEach((listener) => listener());
  }

  return user;
}

/** Reset the demo back to the default persona. */
export function logoutUser(): User {
  return switchDemoRole(DEFAULT_ROLE);
}
