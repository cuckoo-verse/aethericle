import { ReactNode } from "react"
import { Scrollbar } from "@/components/layouts/scrollbar"

interface ViewProps {
  children: ReactNode
  className?: string
}

export function View({ children, className }: ViewProps) {
  return (
    <Scrollbar className={`rounded-[var(--radius)] bg-content1 p-6 h-full ${className}`}>
      {children}
    </Scrollbar>
  )
}
