import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { cookies } from 'next/headers'
// import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/layouts/providers"
import { Background } from "@/components/layouts/background"
import { Topbar } from "@/components/layouts/topbar"
import { Panels } from "@/components/layouts/panels"
import "./globals.css"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// })

// TODO: 需要添加字体

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// })

export const metadata: Metadata = {
  title: "Aethericle - Remeet where the grandeur of novel-7swords unfolds.",
  description: "Remeet where the grandeur of novel-7swords unfolds.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()
  const layout = (await cookies()).get("react-resizable-panels:layout")
  let defaultLayout
  if (layout) defaultLayout = JSON.parse(layout.value)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background select-none`}
        className={`antialiased bg-background select-none`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Background />
            <div className="flex flex-col h-screen w-full overflow-y-hidden">
              <Topbar />
              <Panels defaultLayout={defaultLayout}>
                {children}
              </Panels>
            </div>
          </Providers>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={process.env.GA_ID!} />
      </body>
    </html>
  )
}
