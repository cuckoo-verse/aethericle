"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { HeroUIProvider } from "@heroui/react"
import { SidebarProvider } from "@/components/ui/sidebar"

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <HeroUIProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}