'use client'

import { useCallback, useEffect, useState } from 'react'
import { useIsElectron } from '@/hooks/use-is-electron'

/**
 * 窗口可用选项接口
 * 继承自 Electron.BrowserWindowConstructorOptions，包含所有 BrowserWindow 构造函数选项
 */
export type WindowOptions = Partial<Electron.BrowserWindowConstructorOptions>

/**
 * 窗口管理器 Hook
 * 
 * 提供在 Electron 环境中管理主窗口的基本功能，包括：
 * - 控制当前窗口（最小化、关闭等）
 * 
 * @returns 窗口管理器对象
 */
export function useWindowManager() {
  const isElectron = useIsElectron()
  const [isMinimized, setIsMinimized] = useState(false)

  /**
   * 初始化 Electron IPC 事件监听
   */
  useEffect(() => {
    if (isElectron) {
      const handler = (_: any, state: boolean) => setIsMinimized(state)
      window.electron.ipcRenderer.on('window-minimized-state', handler)
    }
  }, [isElectron])

  /**
   * 最小化当前窗口
   */
  const minimize = useCallback(() => {
    if (isElectron) {
      window.electron.ipcRenderer.send('window-minimize')
    }
  }, [isElectron])

  /**
   * 关闭当前窗口
   */
  const close = useCallback(() => {
    if (isElectron) {
      window.electron.ipcRenderer.send('window-close')
    }
  }, [isElectron])

  return { isMinimized, minimize, close }
}