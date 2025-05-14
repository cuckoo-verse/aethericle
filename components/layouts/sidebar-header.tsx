"use client"

import { BookIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/utils/cn"
import { useSidebarStore } from "@/store/sidebar"
import { Button } from "@/components/ui/button"

interface SidebarHeaderProps {
  isCollapsed: boolean
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
  const t = useTranslations("sidebar")
  const { toggleCollapse } = useSidebarStore()

  return (
    <Button
      variant="ghost"
      className={cn(
      `items-center gap-2 w-auto`,
      "hover-to-opacity",
      "hover:bg-transparent hover:cursor-pointer",
      isCollapsed ? "justify-start ml-2" : "justify-start"
      )}
      onClick={toggleCollapse}
    >
      <BookIcon className="shrink-0 aspect-square" size={16} />
      {!isCollapsed && (
      <span className="text-large font-medium">
        {t('bookshelf')}
      </span>
      )}
    </Button>
  )
}