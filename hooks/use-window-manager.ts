'use client'

import { useState, useEffect } from 'react'
import { useElectron } from './use-electron'

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
  const isElectron = useElectron()
  const [isMinimized, setIsMinimized] = useState(false)

  /**
   * 初始化 Electron IPC 事件监听
   */
  useEffect(() => {
    if (!isElectron || !window.electron) return

    // 监听窗口状态变化
    const stateCleanup = window.electron.ipcRenderer.on('window:state-changed', 
      (event: Electron.IpcRendererEvent, state: { isMinimized: boolean }) => {
        setIsMinimized(state.isMinimized)
    })

    return () => {
      stateCleanup()
    }
  }, [isElectron])

  /**
   * 最小化当前窗口
   */
  const minimize = () => {
    window.electron?.window.minimize()
  }

  /**
   * 关闭当前窗口
   */
  const close = () => {
    window.electron?.window.close()
  }

  return {
    isMinimized,
    minimize,
    close,
  }
}