import { create } from 'zustand'

interface SidebarState {
  isCollapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapse: () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed }))
}))