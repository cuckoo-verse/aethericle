'use client'

import { useState, useEffect } from 'react'

/**
 * A hook to check if the code is running in an Electron environment on the client-side.
 * This should only be used in Client Components.
 */
export function useIsElectron() {
  const [isElectron, setIsElectron] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && /Electron/.test(navigator.userAgent)) {
      setIsElectron(true);
    } else {
      setIsElectron(false);
    }
  }, []);

  return isElectron
} 