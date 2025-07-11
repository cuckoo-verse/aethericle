"use client"

import * as React from "react"
import { cn } from "@/utils/cn"
import { SidebarHeader } from "@/components/layouts/sidebar-header"
import { SidebarItem } from "@/components/layouts/sidebar-item"
import { useSidebarStore } from "@/store/sidebar"
import { Scrollbar } from "@/components/layouts/scrollbar"

interface SidebarProps {
  className?: string
}

const mockNovels = [
  {
    id: 1,
    title: "神州折剑录",
    cover: "https://ts3.tc.mm.bing.net/th/id/OIP-C.-edFDcSqlon5xMykpg5qMgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    wordCount: 150000,
    progress: 0
  },
  {
    id: 2,
    title: "野猪公主",
    cover: "/images/covers/shenzhoubrokenswordlegend2.jpg",
    wordCount: 180000,
    progress: 12
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

export function Sidebar({ className }: SidebarProps) {
  const { isCollapsed } = useSidebarStore()

  const prevCollapsed = React.useRef(isCollapsed)

  React.useEffect(() => {
    if (prevCollapsed.current !== isCollapsed) {
      const timer = setTimeout(() => {
        // TODO: 当动画结束时的逻辑
      }, 300)
      prevCollapsed.current = isCollapsed
      return () => clearTimeout(timer)
    }
  }, [isCollapsed])

  return (
    <aside
      className={cn(
        "flex flex-col h-full rounded-md overflow-y-auto overflow-x-hidden",
        "bg-content1",
        className
      )}
    >
      <div className="flex flex-col p-1.5">
        <SidebarHeader isCollapsed={isCollapsed} />
        <Scrollbar className="gap-1 overflow-x-hidden">
          {mockNovels.map((novel) => (
            <SidebarItem
              key={novel.id}
              title={novel.title}
              cover={novel.cover}
              wordCount={novel.wordCount}
              progress={novel.progress}
              isCollapsed={isCollapsed}
            />
          ))}
        </Scrollbar>
      </div>
    </aside>
  )
}