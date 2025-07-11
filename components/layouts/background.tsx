"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useTheme } from "next-themes"
// TODO: 需要添加背景图
// import backgroundDark from '@/public/images/background-dark.png'
// import backgroundLight from '@/public/images/background-light.png'
import { useIsElectron } from '@/hooks/use-is-electron'

export function Background() {
  const [fadeState, setFadeState] = useState<"visible" | "fading-out" | "fading-in">("visible")
  const fadeStateRef = useRef<"visible" | "fading-out" | "fading-in">("visible")
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const { resolvedTheme } = useTheme()
  const isElectron = useIsElectron()
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>("")
  
  useEffect(() => {
    if (!isElectron) return
    
    if (resolvedTheme === "dark") {
      setBackgroundImageUrl("/images/background-dark.png")
    } else {
      setBackgroundImageUrl("")
    }
  }, [resolvedTheme, isElectron])

  const handleResize = useCallback(() => {
    if (fadeStateRef.current !== "fading-out") {
      fadeStateRef.current = "fading-out"
      setFadeState("fading-out")
    }

    if (resizeTimerRef.current) {
      clearTimeout(resizeTimerRef.current)
    }

    resizeTimerRef.current = setTimeout(() => {
      fadeStateRef.current = "fading-in"
      setFadeState("fading-in")

      setTimeout(() => {
        fadeStateRef.current = "visible"
        setFadeState("visible")
      }, 500) // Match the duration of fade-in
    }, 500) // 0.5 seconds delay before fade in
  }, [])

  useEffect(() => {
    if (!isElectron) return
    
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current)
      }
    }
  }, [handleResize, isElectron])

  if (!isElectron) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-background"
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: fadeState === "fading-out" ? 0 : 1,
        transition: `opacity ${fadeState === "fading-out" ? "200ms" : "1000ms"} ease-in-out`,
      }}
    />
  )
}
