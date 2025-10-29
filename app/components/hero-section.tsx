"use client";

import { ThemeToggle } from "@/components/theme-toggle";

export function HeroSection() {
  return (
    <div className="text-center px-4 py-12 sm:py-16 md:py-20 lg:py-24 relative">
      {/* Theme Toggle - Mobile & Desktop */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        {/* Logo - Responsive sizing */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-2xl md:text-3xl shadow-xl">
            YPS
          </div>
          <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-sans">
            HUB
          </div>
        </div>

        {/* Title - Responsive typography */}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-sans max-w-xs sm:max-w-md md:max-w-lg px-4">
          Digital Gateway SMP YPS SINGKOLE
        </h1>
      </div>
    </div>
  );
}