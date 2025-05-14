"use client"

import { useEffect, useState, useCallback, useRef } from "react"

export function AppBackground() {
  const [fadeState, setFadeState] = useState<"visible" | "fading-out" | "fading-in">("visible")
  const fadeStateRef = useRef<"visible" | "fading-out" | "fading-in">("visible")
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const backgroundImageUrl =
    "https://liblibai-tmp-image.liblib.cloud/sd-images/23dfd05b0f2de4af87abe6490c4b4e8682f8fd228a6fd2f00fb08d53643ee57f.png "

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
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current)
      }
    }
  }, [handleResize])

  return (
    <div
      className="fixed inset-0 bg-black"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: fadeState === "fading-out" ? 0 : 1,
        transition: `opacity ${fadeState === "fading-out" ? "200ms" : "1000ms"} ease-in-out`,
      }}
    />
  )
}
