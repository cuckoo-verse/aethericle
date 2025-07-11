"use client"

import React, { useEffect, useRef } from "react"
import { Panel, PanelGroup, PanelResizeHandle, ImperativePanelHandle } from "react-resizable-panels"
import { Sidebar } from "@/components/layouts/sidebar"
import { View } from "@/components/layouts/view"
import { useSidebarStore } from "@/store/sidebar"

interface PanelsProps {
  children: React.ReactNode
  defaultLayout?: number[]
}

export function Panels({ children, defaultLayout = [20, 80] }: PanelsProps) {
  const { isCollapsed, toggleCollapse } = useSidebarStore()

  const COLLAPSED_SIZE = 6
  const EXPANDED_MIN   = 15

  const sidebarRef = useRef<ImperativePanelHandle>(null)

  useEffect(() => {
    if (!sidebarRef.current) return
    if (isCollapsed) sidebarRef.current.collapse?.()
    else sidebarRef.current.expand?.(EXPANDED_MIN)
  }, [isCollapsed])

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
  }

  return (
    <PanelGroup
      direction="horizontal"
      className="group z-1 h-full max-h-[calc(100vh-5rem)] p-4 pt-0"
      onLayout={onLayout}
    >
      <Panel
        ref={sidebarRef}
        defaultSize={defaultLayout[0]}
        minSize={EXPANDED_MIN}
        collapsible
        collapsedSize={COLLAPSED_SIZE}
        onCollapse={() => {
          if (!isCollapsed) toggleCollapse()
        }}
        onExpand={() => {
          if (isCollapsed) toggleCollapse()
        }}
        className="transition-base"
      >
        <Sidebar />
      </Panel>
      <PanelResizeHandle className="w-[var(--handle-width)] bg-default rounded-full mx-1 opacity-0 transition-opacit hover:opacity-100 hover:delay-0" />
      <Panel defaultSize={defaultLayout[1]} minSize={30}>
        <View>{children}</View>
      </Panel>
    </PanelGroup>
  )
}