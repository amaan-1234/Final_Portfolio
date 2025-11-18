"use client"

import { useEffect, useRef } from "react"
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = sectionRef.current
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
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
          {education.map((edu, index) => (
            <Card
              key={edu.degree}
              className="group hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-primary transform-gpu"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <GraduationCap className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors duration-300">
                      {edu.degree}
                    </CardTitle>
                    <div className="text-muted-foreground mt-2 space-y-1 group-hover:text-foreground transition-colors duration-300">
                      <p className="font-medium group-hover:scale-105 transition-transform duration-200 origin-left">
                        {edu.institution}
                      </p>
                      <p className="text-sm">
                        {edu.location} • {edu.period}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm font-semibold text-primary group-hover:scale-110 transition-transform duration-200 origin-left">
                          CGPA: <span className="font-bold">{edu.gpa}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    Relevant Coursework:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-200 cursor-default transform-gpu"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
