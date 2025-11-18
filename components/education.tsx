"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { SectionBackgroundAnimation } from "@/components/section-background-animation"

const education = [
  {
    degree: "MS Data Science, Analytics and Engineering",
    institution: "Arizona State University",
    location: "Tempe, AZ",
    period: "Aug 2024 – May 2026",
    gpa: "3.72/4.00",
    logo: "/asu.png",
    coursework: [
      "Statistics for Data Analysts",
      "Data Processing at Scale",
      "Data Mining",
      "Statistical Machine Learning",
      "Data Visualization",
      "Data-Driven Decision Making",
    ],
  },
  {
    degree: "B.Tech Computer Science and Engineering",
    institution: "Vellore Institute of Technology",
    location: "Chennai, India",
    period: "Aug 2020 – May 2024",
    gpa: "8.34/10.00",
    logo: "/vit.png",
    coursework: [
      "Design and Analysis of Algorithms",
      "Deep Learning: Principles and Practices",
      "Speech and Language Processing using Deep Learning",
      "Discrete Mathematics and Graph Theory",
    ],
  },
]

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            const cardIndex = entry.target.getAttribute("data-card-index")
            if (cardIndex !== null) {
              setVisibleCards((prev) => new Set([...prev, parseInt(cardIndex)]))
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = sectionRef.current
    if (section) {
      observer.observe(section)
      
      // Observe individual cards after they're rendered
      const observeCards = () => {
        const cards = section.querySelectorAll("[data-card-index]")
        if (cards.length > 0) {
          cards.forEach((card) => observer.observe(card))
        } else {
          // Retry if cards aren't ready yet
          setTimeout(observeCards, 50)
        }
      }
      observeCards()
    }

    return () => {
      if (section) {
        observer.unobserve(section)
        const cards = section.querySelectorAll("[data-card-index]")
        cards.forEach((card) => observer.unobserve(card))
      }
    }
  }, [])

  return (
    <section id="education" ref={sectionRef} className="py-20 px-4 section-fade-in relative overflow-hidden">
      <SectionBackgroundAnimation />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Education</h2>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => {
            const isVisible = visibleCards.has(index)
            return (
              <Card
                key={edu.degree}
                data-card-index={index}
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-700 ease-out hover:scale-[1.03] hover:-translate-y-2 border-l-4 border-l-transparent hover:border-l-primary transform-gpu hover:rotate-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* University Logo - Prominent Right Side */}
                {edu.logo && (
                  <div className="absolute top-4 right-4 w-32 h-32 opacity-80 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0 group-hover:scale-110">
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="w-full h-full object-contain transition-all duration-500"
                    />
                  </div>
                )}

                <CardHeader className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
                      <GraduationCap className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-all duration-300" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors duration-300 group-hover:scale-105 origin-left inline-block transform-gpu">
                        {edu.degree}
                      </CardTitle>
                      <div className="text-muted-foreground mt-2 space-y-1 group-hover:text-foreground transition-colors duration-300">
                        <p className="font-medium group-hover:scale-105 transition-transform duration-200 origin-left">
                          {edu.institution}
                        </p>
                        <p className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                          {edu.location} • {edu.period}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm font-semibold text-primary group-hover:scale-110 transition-transform duration-200 origin-left group-hover:drop-shadow-lg">
                            CGPA: <span className="font-bold">{edu.gpa}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div>
                    <h4 className="font-semibold mb-3 group-hover:text-primary transition-colors duration-300 group-hover:scale-105 origin-left inline-block transform-gpu">
                      Relevant Coursework:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, courseIndex) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm hover:bg-secondary hover:text-secondary-foreground hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 cursor-default transform-gpu hover:shadow-md hover:shadow-secondary/30 hover:z-20 relative"
                          style={{
                            transitionDelay: `${courseIndex * 30}ms`,
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500 rounded-xl pointer-events-none" />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
