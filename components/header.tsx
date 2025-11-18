"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "./theme-toggle"

const navigation = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Honors & Awards", href: "#honors-awards" },
  { name: "Publications", href: "#publications" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)

      // Calculate scroll progress
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (currentScrollY / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener("scroll", handleScroll)
    // Calculate initial progress
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const header = document.querySelector("header")
      const headerHeight = header ? header.offsetHeight + 20 : 100

      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary/20">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="font-serif text-xl font-bold text-foreground">Amaan Mohamed Kalemullah</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium cursor-pointer relative group hover:scale-105 transform-gpu"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium cursor-pointer hover:translate-x-2 transform-gpu"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
