"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizes[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={alt || fallback} fill sizes="48px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300">
          {fallback}
        </div>
      )}
    </div>
  );
}

export { Avatar };
