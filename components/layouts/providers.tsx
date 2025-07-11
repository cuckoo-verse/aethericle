"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { HeroUIProvider } from "@heroui/react"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider
      // enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <HeroUIProvider>
          {children}
      </HeroUIProvider>
    </NextThemesProvider>
  );
}