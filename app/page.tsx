import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  MapPin,
} from "lucide-react";
import { HeroSection } from "./components/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col" suppressHydrationWarning>
      <HeroSection />

      {/* Platform Grid - Fully Responsive */}
      <main className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* TaskMaster */}
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200/50 dark:border-blue-700/30 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2 sm:mb-3">
                TaskMaster
              </h3>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 mb-4 sm:mb-6 px-2">
                Monitoring Task for teachers and parents
              </p>
              <Button className="w-full max-w-[200px] bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base">
                Launch Platform
              </Button>
            </div>
          </Card>

          {/* BusTrack */}
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200/50 dark:border-green-700/30 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-100 mb-2 sm:mb-3">
                BusTrack
              </h3>
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-4 sm:mb-6 px-2">
                Real-time school bus tracking
              </p>
              <Button disabled className="w-full max-w-[200px] bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base">
                Coming Soon
              </Button>
            </div>
          </Card>
        </div>

        {/* Simple Footer - Ultra Minimalis */}
      </main>

      <footer className="w-full mt-auto">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              © 2025 YPS HUB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
