"use client"

import { BookIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/utils/cn"
import { useSidebarStore } from "@/store/sidebar"
import { Button } from "@heroui/react"

interface SidebarHeaderProps {
  isCollapsed: boolean
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
  const t = useTranslations("sidebar-header")
  const { toggleCollapse } = useSidebarStore()

  return (
    <Button
      disableRipple
      variant="light"
      className={cn(
        "sticky z-10 items-center gap-2 w-auto bg-content1",
        "bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent data-[hover]:bg-transparent",
        isCollapsed ? "justify-start ml-2" : "justify-start"
      )}
      onPress={toggleCollapse}
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