"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Moon, Sun, Type } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

export default function SettingsPanel() {
  const [isDark, setIsDark] = useState(false)
  const [fontSize, setFontSize] = useState(100)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    // Check for saved font size
    const savedFontSize = localStorage.getItem("fontSize")
    if (savedFontSize) {
      const size = Number.parseInt(savedFontSize)
      setFontSize(size)
      document.documentElement.style.fontSize = `${size}%`
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleFontSizeChange = (value: number[]) => {
    const size = value[0]
    setFontSize(size)
    document.documentElement.style.fontSize = `${size}%`
    localStorage.setItem("fontSize", size.toString())
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 transform-gpu bg-transparent"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-4">
        <DropdownMenuLabel className="text-lg font-semibold">Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Theme Toggle */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              Theme
            </span>
          </div>
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            className="w-full justify-start hover:bg-primary/10 transition-colors duration-200 bg-transparent"
          >
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Button>
        </div>

        <DropdownMenuSeparator />

        {/* Font Size Slider */}
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4" />
              Font Size
            </span>
            <span className="text-xs text-muted-foreground">{fontSize}%</span>
          </div>
          <Slider
            value={[fontSize]}
            onValueChange={handleFontSizeChange}
            min={80}
            max={120}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
