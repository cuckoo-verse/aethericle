"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Tooltip } from "@heroui/tooltip"
import { HomeIcon, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { NavAvatar } from "@/components/layouts/nav-avatar"
import { globalData } from "@/data/global"
import { useElectron } from "@/hooks/use-electron"
import { useSidebarStore } from "@/store/sidebar"
import { cn } from "@/utils/cn"

export function AppHeader() {
  const t = useTranslations("app-header")
  const isElectronApp = useElectron()
  const { toggleCollapse } = useSidebarStore()
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="flex sticky top-0 h-[var(--header-height)] shrink-0 items-center justify-between w-full px-4 transition-[width,height] ease-linear">
      <Tooltip content={t('library')} placement="right">
        <Button 
          isIconOnly 
          disableRipple 
          radius="full" 
          variant="light" 
          className="size-12 flex items-center justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:opacity-100 opacity-80 transition-opacity duration-200" 
          onPress={toggleCollapse}
        >
          <Image width={28} height={28} src={globalData.logo} alt="logo" />
        </Button>
      </Tooltip>

      <div className="md:fixed flex gap-2 md:left-1/2 md:-translate-x-1/2 md:w-[32rem] z-10">
        <Tooltip content={t('home')}>
          <Button
            isIconOnly
            disableRipple
            as={Link}
            href="/"
            radius="full"
            size="lg"
            startContent={<HomeIcon size={24} />}
            tabIndex={0}
            className="[&:focus]:outline-none [&:focus-visible]:outline-none hover:opacity-100 opacity-80 transition-opacity duration-200"
          />
        </Tooltip>
        <Input
          radius="full"
          className="w-full"
          size="lg"
          startContent={<Search size={16} />}
          placeholder={isSearchFocused ? t('search-placeholder') : undefined}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>

      <div className={cn(
        "flex items-center ml-auto",
        isElectronApp && "fixed right-[9rem]"
      )}>
        <NavAvatar />
      </div>
    </header>
  )
}