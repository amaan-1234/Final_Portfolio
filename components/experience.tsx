"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code, GraduationCap, TrendingUp, Rocket, ArrowRight } from "lucide-react"

const experiences = [
  {
    icon: Code,
    title: "ReactJS Development Intern",
    company: "VIT, Chennai, India",
    date: "Jun 2022 – Jul 2022",
    description: (
      <>
        Developed <span className="font-semibold text-primary">dynamic, reusable ReactJS components</span>, including responsive tables with configurable rows/columns, and supported{" "}
        <span className="font-semibold text-primary">backend integration via APIs</span>. Improved UI stability by refining features, testing, and bug fixes, while contributing in{" "}
        <span className="font-semibold text-primary">Agile workflows</span> through code reviews and team discussions.
      </>
    ),
  },
  {
    icon: Brain,
    title: "Machine Learning Intern",
    company: "NeuralHire, Wylie, TX",
    date: "Jul 2023 – Oct 2023",
    description: (
      <>
        Built and optimized a <span className="font-semibold text-primary">real-time face detection model (HaarCascade)</span> for tracking off-screen movements, improving responsiveness in behavioral analysis and multimedia datasets. Integrated models into research pipelines and maintained{" "}
        <span className="font-semibold text-primary">10+ production scripts</span> for video/speech processing with{" "}
        <span className="font-semibold text-primary">OpenCV</span> and <span className="font-semibold text-primary">Praat</span>, ensuring scalability and reliability.
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: "Teaching Assistant for Principles of Programming course (CSE340)",
    company: "ASU Tempe",
    date: "Oct 2025 – Dec 2025",
    description: (
      <>
        Assisted in teaching this advanced course which explores the fundamental principles of programming language design, implementation, and execution. The syllabus delves into the core components of a compiler, including{" "}
        <span className="font-semibold text-primary">lexical analysis with regular expressions</span>,{" "}
        <span className="font-semibold text-primary">syntax analysis using context-free grammars</span>, and{" "}
        <span className="font-semibold text-primary">semantic analysis</span>. The curriculum also covers complex theoretical topics such as type systems, Lambda calculus, and runtime memory management, including the stack and heap. As a Teaching Assistant, I guided students through these concepts and supported their practical application by grading assignments and projects written in the{" "}
        <span className="font-semibold text-primary">C programming language</span>.
      </>
    ),
  },
]

// Phase definitions with bold colors matching the theme
const phases = [
  {
    id: "early-career",
    title: "Early Career",
    dateRange: "2022",
    color: "#059669", // Primary green - bold
    icon: Rocket,
    experiences: [experiences[0]], // ReactJS Intern
  },
  {
    id: "growth",
    title: "Growth & Development",
    dateRange: "2023",
    color: "#ea580c", // Orange - bold
    icon: TrendingUp,
    experiences: [experiences[1]], // ML Intern
  },
  {
    id: "current",
    title: "Current Role",
    dateRange: "2025",
    color: "#15803d", // Darker green - bold
    icon: GraduationCap,
    experiences: [experiences[2]], // Teaching Assistant
  },
]

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Background Animations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated Gradient Waves */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute w-full h-full animate-wave-flow"
            style={{
              background: `
                linear-gradient(90deg, 
                  rgba(5, 150, 105, 0.15) 0%, 
                  transparent 25%, 
                  rgba(234, 88, 12, 0.15) 50%, 
                  transparent 75%, 
                  rgba(21, 128, 61, 0.15) 100%
                )
              `,
            }}
          />
          <div
            className="absolute w-full h-full animate-wave-flow-reverse"
            style={{
              background: `
                linear-gradient(180deg, 
                  rgba(5, 150, 105, 0.1) 0%, 
                  transparent 30%, 
                  rgba(234, 88, 12, 0.1) 60%, 
                  transparent 100%
                )
              `,
            }}
          />
        </div>

        {/* Floating Geometric Shapes */}
        {phases.map((phase, index) => {
          const floatAnimations = ['float0', 'float1', 'float2']
          const rotateAnimations = ['rotateFloat0', 'rotateFloat1', 'rotateFloat2']
          const hexAnimations = ['hexFloat0', 'hexFloat1', 'hexFloat2']
          const floatDurations = [15, 17, 19]
          const rotateDurations = [18, 21, 24]
          const hexDurations = [20, 22, 24]

          return (
            <div key={phase.id}>
              {/* Circles */}
              <div
                className="absolute rounded-full opacity-20 blur-xl"
                style={{
                  width: `${200 + index * 50}px`,
                  height: `${200 + index * 50}px`,
                  backgroundColor: phase.color,
                  top: `${20 + index * 25}%`,
                  left: `${10 + index * 30}%`,
                  animation: `${floatAnimations[index]} ${floatDurations[index]}s ease-in-out infinite`,
                }}
              />
              {/* Triangles */}
              <div
                className="absolute opacity-15"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${60 + index * 20}px solid transparent`,
                  borderRight: `${60 + index * 20}px solid transparent`,
                  borderBottom: `${100 + index * 30}px solid ${phase.color}`,
                  top: `${40 + index * 20}%`,
                  right: `${15 + index * 25}%`,
                  animation: `${rotateAnimations[index]} ${rotateDurations[index]}s ease-in-out infinite`,
                }}
              />
              {/* Hexagons (using clip-path) */}
              <div
                className="absolute opacity-15 blur-sm"
                style={{
                  width: `${80 + index * 20}px`,
                  height: `${80 + index * 20}px`,
                  backgroundColor: phase.color,
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                  bottom: `${15 + index * 20}%`,
                  left: `${50 + index * 15}%`,
                  animation: `${hexAnimations[index]} ${hexDurations[index]}s ease-in-out infinite`,
                }}
              />
            </div>
          )
        })}
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 lg:ml-20 lg:mr-20">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="relative z-10">
          {/* Horizontal Timeline Bar with Bold Colors */}
          <div className="relative h-2 mb-16 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              {phases.map((phase, index) => {
                const phaseWidth = 100 / phases.length
                return (
                  <div
                    key={phase.id}
                    className={`transition-all duration-1000 ease-out ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      width: `${phaseWidth}%`,
                      backgroundColor: phase.color,
                      transitionDelay: `${300 + index * 200}ms`,
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* Event Markers on Timeline */}
          <div className="absolute top-0 left-0 right-0 h-2 flex items-center">
            {phases.map((phase, phaseIndex) => {
              const markerPosition = ((phaseIndex + 0.5) / phases.length) * 100
              return (
                <div
                  key={phase.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${markerPosition}%`,
                    top: "50%",
                  }}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-4 border-background shadow-lg transition-all duration-300 ${
                      isVisible ? "scale-100" : "scale-0"
                    }`}
                    style={{
                      backgroundColor: phase.color,
                      transitionDelay: `${500 + phaseIndex * 200}ms`,
                    }}
                  >
                    {/* Pulse ring effect */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: phase.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Flow Direction Arrows - Large and Prominent */}
          <div className="absolute top-0 left-0 right-0 h-2 flex items-center">
            {phases.slice(0, -1).map((phase, phaseIndex) => {
              const arrowPosition = ((phaseIndex + 1) / phases.length) * 100
              const nextPhase = phases[phaseIndex + 1]
              return (
                <div
                  key={`arrow-${phaseIndex}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    left: `${arrowPosition}%`,
                    top: "50%",
                  }}
                >
                  <div
                    className={`relative transition-all duration-300 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                    style={{
                      transitionDelay: `${700 + phaseIndex * 200}ms`,
                    }}
                  >
                    {/* Background circle for prominence */}
                    <div
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        width: "3rem",
                        height: "3rem",
                        backgroundColor: `${nextPhase.color}20`,
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%",
                      }}
                    />
                    {/* Large arrow */}
                    <ArrowRight
                      className="w-12 h-12 drop-shadow-lg"
                      style={{
                        color: nextPhase.color,
                        strokeWidth: 3,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Phase Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {phases.map((phase, phaseIndex) => {
              return (
                <div
                  key={phase.id}
                  className={`transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${400 + phaseIndex * 200}ms` }}
                >
                  {/* Experience Cards for this Phase */}
                  <div className="space-y-4">
                    {phase.experiences.map((exp, expIndex) => (
                      <Card
                        key={expIndex}
                        className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-l-4 hover:-translate-y-1"
                        style={{
                          borderLeftColor: phase.color,
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-start space-x-4">
                            <div
                              className="p-3 rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0"
                              style={{
                                backgroundColor: `${phase.color}15`,
                              }}
                            >
                              <exp.icon
                                className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300"
                                style={{ color: phase.color }}
                              />
                            </div>
                            <div className="flex-1">
                              <CardTitle
                                className="text-base md:text-lg font-bold group-hover:transition-colors duration-300"
                                style={{
                                  color: phase.color,
                                }}
                              >
                                {exp.title}
                              </CardTitle>
                              <p
                                className="font-semibold text-sm group-hover:scale-105 transition-transform duration-200 origin-left mt-1"
                                style={{ color: phase.color }}
                              >
                                {exp.company}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground transition-colors duration-300">
                                {exp.date}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                            {exp.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
