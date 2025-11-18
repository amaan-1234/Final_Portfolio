"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

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
          <div className="mb-8">
            <img
              src="/amaan-profile.jpg"
              alt="Amaan Mohamed Kalemullah"
              className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover mx-auto mb-6 border-4 border-primary shadow-lg animate-pulse-glow"
            />
          </div>

          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 whitespace-nowrap text-center">
            <span className="text-primary">AMAAN MOHAMED KALEMULLAH</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
            MS Data Science @ ASU | <span className="font-semibold text-primary">Machine Learning Engineer</span> |{" "}
            <span className="font-semibold text-primary">AI Researcher</span> | Based in Tempe, Arizona
          </p>

          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            A passionate Data Scientist and Machine Learning Engineer currently pursuing my Master's in Data Science at
            Arizona State University. With over <span className="font-semibold text-primary">3 years of experience</span> in AI/ML, I specialize in developing innovative
            solutions using cutting-edge technologies like <span className="font-semibold text-primary">Deep Learning</span>, <span className="font-semibold text-primary">Computer Vision</span>, and <span className="font-semibold text-primary">Natural Language
            Processing</span>.
          </p>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              VIEW MY PROJECTS
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
      </div>
    </section>
  )
}
