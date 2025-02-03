"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
        {children}
    </NextThemesProvider>
  );
}