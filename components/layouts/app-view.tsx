import { ReactNode } from "react"

interface AppViewProps {
  children: ReactNode
  className?: string
}

export function AppView({ children, className }: AppViewProps) {
  return (
    <div
      className="rounded-[var(--radius)] bg-default-50 p-6 w-full overflow-auto"
    >
      {children}
    </div>
  )
}
