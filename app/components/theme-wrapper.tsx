"use client";

import { ThemeToggle } from "@/components/theme-toggle";

export function ThemeWrapper() {
  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
      <ThemeToggle />
    </div>
  );
}