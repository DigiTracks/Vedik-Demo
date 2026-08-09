import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const BASE_PATH = "/School-Demo";
export const LOGO_PATH = `${BASE_PATH}/logo.png`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
