"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { cn } from "@/utils/cn"
import { SidebarHeader } from "./sidebar-header"
import { NovelCard } from "./novel-card"
import { useSidebarStore } from "@/store/sidebar"

// Temporary mock data
const mockNovels = [
  {
    id: 1,
    title: "神州折剑录",
    cover: "/images/covers/shenzhoubrokenswordlegend.jpg",
    wordCount: 150000,
    progress: 0
  },
  {
    id: 2,
    title: "野猪公主",
    cover: "/images/covers/shenzhoubrokenswordlegend2.jpg",
    wordCount: 180000,
    progress: 0
  },
  {
    id: 3,
    title: "剑来",
    cover: "/images/covers/shenzhoubrokenswordlegend3.jpg",
  },
  {
    id: 4,
    title: "剑来",
    cover: "/images/covers/shenzhoubrokenswordlegend3.jpg",
  },
  {
    id: 5,
    title: "剑来",
    cover: "/images/covers/shenzhoubrokenswordlegend3.jpg",
  },
  {
    id: 6,
    title: "剑来",
    cover: "/images/covers/shenzhoubrokenswordlegend3.jpg",
  },
  {
    id: 7,
    title: "剑来",
    cover: "/images/covers/shenzhoubrokenswordlegend3.jpg",
  },
  {
    id: 8,
    title: "剑来",
    cover: "/images/covers/shenzhoubrokenswordlegend3.jpg",
  },
  {
    id: 9,
    title: "剑来",
    cover: "/images/covers/shenzhoubrokenswordlegend3.jpg",
  },
]

export function AppSidebar() {
  const { isCollapsed } = useSidebarStore()
  const t = useTranslations("sidebar")
  const [isAnimating, setIsAnimating] = React.useState(false)
  const prevCollapsed = React.useRef(isCollapsed)

  React.useEffect(() => {
    if (prevCollapsed.current !== isCollapsed) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      prevCollapsed.current = isCollapsed
      return () => clearTimeout(timer)
    }
  }, [isCollapsed])

  return (
    <aside
      style={{ width: isCollapsed ? '5rem' : '18rem' }}
      className={cn(
        "flex flex-col max-h-screen rounded-md overflow-auto",
        "bg-sidebar",
        "transition-[width] duration-300 ease-in-out"
      )}
    >
      <div className="flex flex-col p-1.5">
        <SidebarHeader isCollapsed={isCollapsed} />
        <div className={cn(
          "gap-1 overflow-x-hidden"
        )}>
          {mockNovels.map((novel) => (
            <NovelCard
              key={novel.id}
              title={novel.title}
              cover={novel.cover}
              wordCount={novel.wordCount}
              progress={novel.progress}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}