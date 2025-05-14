import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from "next/font/google"
import { AppProviders } from "@/components/layouts/app-providers"
import { AppBackground } from "@/components/layouts/app-background"
import { AppSidebar } from "@/components/layouts/app-sidebar"
import { AppHeader } from "@/components/layouts/app-header"
import { AppView } from "@/components/layouts/app-view"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aethericle - Remeet where the grandeur of novel-7swords unfolds.",
  description: "Remeet where the grandeur of novel-7swords unfolds.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black select-none`}
      >
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <AppBackground />
            <div className="flex flex-col w-full overflow-y-hidden">
              <AppHeader />
              <div className="flex flex-row z-1 gap-4 h-full max-h-[calc(100vh-5rem)] p-4 pt-0">
                  <AppSidebar />
                  <AppView>
                    {children}
                  </AppView>
              </div>
            </div>
          </AppProviders>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={process.env.GA_ID!} />
      </body>
    </html >
  );
}
