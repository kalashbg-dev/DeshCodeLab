"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Evitar renderizar el botón hasta que el componente esté montado en el cliente
  if (!mounted) {
    return (
      <button 
        className="inline-flex items-center justify-center p-1 opacity-50 cursor-default" 
        aria-hidden="true" 
        tabIndex={-1}
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`inline-flex items-center justify-center hover:text-primary transition-colors p-1 ${className}`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
