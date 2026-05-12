"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Profile Photo */}
          <div className="mb-6">
            <img
              src="/amaan-profile.jpg"
              alt="Amaan Mohamed Kalemullah"
              className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover mx-auto border-4 border-primary shadow-lg animate-pulse-glow"
            />
          </div>

          {/* Open to Work Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Open to full-time roles · Available May 2026
              </span>
            </div>
          </div>

          {/* Name */}
          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-center">
            <span className="text-primary">AMAAN MOHAMED KALEMULLAH</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
            MS Data Science @ ASU &nbsp;·&nbsp;{" "}
            <span className="font-semibold text-primary">Machine Learning Engineer</span>
            &nbsp;·&nbsp;{" "}
            <span className="font-semibold text-primary">AI Researcher</span>
            &nbsp;·&nbsp; Tempe, Arizona
          </p>

          {/* Bio */}
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Data Scientist and ML Engineer with{" "}
            <span className="font-semibold text-primary">3+ years of experience</span> building end-to-end AI/ML pipelines. Specializing in{" "}
            <span className="font-semibold text-primary">Deep Learning</span>,{" "}
            <span className="font-semibold text-primary">NLP</span>, and{" "}
            <span className="font-semibold text-primary">Computer Vision</span> — from research to production deployment.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              VIEW MY PROJECTS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 gap-2"
              asChild
            >
              <a href="/DS_Resume.pdf" download="Amaan_Mohamed_Resume.pdf">
                <Download className="w-5 h-5" />
                DOWNLOAD RESUME
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground/50">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  )
}
