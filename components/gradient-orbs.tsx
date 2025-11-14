"use client"

import { useEffect, useState } from "react"

export function GradientOrbs() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(5,150,105,0.4) 0%, transparent 70%)",
          top: `${20 + scrollY * 0.1}%`,
          left: "10%",
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
          top: `${40 + scrollY * 0.15}%`,
          right: "5%",
          transform: `translateY(${scrollY * -0.15}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(5,150,105,0.35) 0%, transparent 70%)",
          top: `${70 + scrollY * 0.08}%`,
          left: "15%",
          transform: `translateY(${scrollY * 0.25}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 20% 30%, rgba(5,150,105,0.15) 0px, transparent 50%),
              radial-gradient(at 80% 20%, rgba(16,185,129,0.1) 0px, transparent 50%),
              radial-gradient(at 40% 70%, rgba(5,150,105,0.12) 0px, transparent 50%),
              radial-gradient(at 90% 80%, rgba(16,185,129,0.08) 0px, transparent 50%)
            `,
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>
    </div>
  )
}
