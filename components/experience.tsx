"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code, GraduationCap } from "lucide-react"

const experiences = [
  {
    icon: GraduationCap,
    title: "Teaching Assistant for Principles of Programming course (CSE340)",
    company: "ASU Tempe",
    date: "Oct 2025 – Dec 2025",
    description:
      "Assisted in teaching this advanced course which explores the fundamental principles of programming language design, implementation, and execution. The syllabus delves into the core components of a compiler, including lexical analysis with regular expressions, syntax analysis using context-free grammars, and semantic analysis. The curriculum also covers complex theoretical topics such as type systems, Lambda calculus, and runtime memory management, including the stack and heap. As a Teaching Assistant, I guided students through these concepts and supported their practical application by grading assignments and projects written in the C programming language.",
  },
  {
    icon: Brain,
    title: "Machine Learning Intern",
    company: "NeuralHire, Wylie, TX",
    date: "Jul 2023 – Oct 2023",
    description:
      "Built and optimized a real-time face detection model (HaarCascade) for tracking off-screen movements, improving responsiveness in behavioral analysis and multimedia datasets. Integrated models into research pipelines and maintained 10+ production scripts for video/speech processing with OpenCV and Praat, ensuring scalability and reliability.",
  },
  {
    icon: Code,
    title: "ReactJS Development Intern",
    company: "VIT, Chennai, India",
    date: "Jun 2022 – Jul 2022",
    description:
      "Developed dynamic, reusable ReactJS components, including responsive tables with configurable rows/columns, and supported backend integration via APIs. Improved UI stability by refining features, testing, and bug fixes, while contributing in Agile workflows through code reviews and team discussions.",
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
      className={`py-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div
            className={`absolute left-8 md:left-1/2 top-0 w-0.5 bg-primary/20 transition-all duration-2000 ease-out ${
              isVisible ? "h-full" : "h-0"
            }`}
          />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-12 last:mb-0 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : index % 2 === 0
                    ? "opacity-0 -translate-x-8"
                    : "opacity-0 translate-x-8"
              }`}
              style={{
                transitionDelay: `${500 + index * 200}ms`,
              }}
            >
              <div
                className={`absolute left-8 md:left-1/2 w-4 h-4 -ml-2 bg-primary rounded-full border-4 border-background shadow-lg transition-all duration-300 z-10 ${
                  isVisible ? "scale-100" : "scale-0"
                }`}
                style={{ transitionDelay: `${700 + index * 200}ms` }}
              >
                {/* Pulse ring effect */}
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
              </div>

              {/* Content card - alternating sides on desktop */}
              <div
                className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-l-4 border-l-transparent hover:border-l-primary hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                        <exp.icon className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors duration-300">
                          {exp.title}
                        </CardTitle>
                        <p className="text-primary font-semibold group-hover:scale-105 transition-transform duration-200 origin-left">
                          {exp.company}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors duration-300">
                          {exp.date}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
