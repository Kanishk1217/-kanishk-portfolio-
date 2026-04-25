"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="font-mono text-[10px] tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase cursor-pointer"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  )
}
