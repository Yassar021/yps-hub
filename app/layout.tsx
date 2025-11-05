import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YPS HUB - Digital Gateway SMP YPS SINGKOLE",
  description: "Your Digital Gateway to YPS - One Hub, All Platforms",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "YPS HUB",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "YPS HUB",
    title: "YPS HUB - Digital Gateway SMP YPS SINGKOLE",
    description: "Your Digital Gateway to YPS - One Hub, All Platforms",
  },
  twitter: {
    card: "summary",
    title: "YPS HUB - Digital Gateway SMP YPS SINGKOLE",
    description: "Your Digital Gateway to YPS - One Hub, All Platforms",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  other: {
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Force update service worker to ensure latest changes
              if ('serviceWorker' in navigator) {
                const isDevelopment = window.location.hostname.includes('localhost');

                window.addEventListener('load', () => {
                  // Unregister all old service workers first
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(let registration of registrations) {
                      console.log('Unregistering old SW:', registration.scope);
                      registration.unregister();
                    }

                    // Register new service worker with fresh cache
                    navigator.serviceWorker.register('/sw.js')
                      .then((registration) => {
                        console.log('New SW registered: ', registration);

                        // Force update if there's a waiting worker
                        if (registration.waiting) {
                          registration.waiting.postMessage({type: 'SKIP_WAITING'});
                        }

                        // Listen for updates
                        registration.addEventListener('updatefound', () => {
                          const newWorker = registration.installing;
                          if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('SW updated, reloading...');
                                window.location.reload();
                              }
                            });
                          }
                        });
                      })
                      .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });

                  // Clear old caches
                  if ('caches' in window && !isDevelopment) {
                    caches.keys().then(function(cacheNames) {
                      cacheNames.forEach(function(cacheName) {
                        if (!cacheName.includes('yps-hub-v2')) {
                          caches.delete(cacheName);
                        }
                      });
                    });
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
