'use client'

import { useState, useEffect, useMemo } from 'react'

export function useElectron() {
  const [isElectron, setIsElectron] = useState(false)

  const checkElectron = useMemo(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      return !!(window as any).electronAPI || navigator.userAgent.includes("Electron")
    }
    return false
  }, [])

  useEffect(() => {
    setIsElectron(checkElectron)
  }, [checkElectron])

  return isElectron
}