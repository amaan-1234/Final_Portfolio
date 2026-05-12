"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Briefcase } from "lucide-react"

const stats = [
  { number: 10, label: "Projects Completed", showPlus: true },
  { number: 3, label: "Years Experience", showPlus: true },
  { number: 45, label: "Technologies", showPlus: true },
  { number: 1, label: "IEEE Publication", showPlus: false },
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate numbers
          stats.forEach((stat, index) => {
            let current = 0
            const increment = stat.number / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.number) {
                current = stat.number
                clearInterval(timer)
              }
              setAnimatedStats((prev) => {
                const newStats = [...prev]
                newStats[index] = Math.floor(current)
                return newStats
              })
            }, 30)
          })
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
      id="about"
      ref={sectionRef}
      className={`py-20 bg-muted/30 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Amaan Mohamed Kalemullah, a passionate Data Scientist and Machine Learning Engineer currently pursuing
              my Master's in Data Science at Arizona State University. With over <span className="font-semibold text-primary">3 years of experience</span> in AI/ML, I
              specialize in developing innovative solutions using cutting-edge technologies like <span className="font-semibold text-primary">Deep Learning</span>, <span className="font-semibold text-primary">Computer
              Vision</span>, and <span className="font-semibold text-primary">Natural Language Processing</span>.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My expertise spans from building <span className="font-semibold text-primary">end-to-end ML pipelines</span> to deploying <span className="font-semibold text-primary">scalable AI applications</span>. I've
              worked on diverse projects including automated document processing, video summarization, predictive
              analytics, and intelligent automation systems. I'm particularly interested in solving real-world problems
              through <span className="font-semibold text-primary">data-driven approaches</span> and creating impactful AI solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {animatedStats[index]}
                    {stat.showPlus ? "+" : ""}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What I'm Looking For */}
        <div className={`mt-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Card className="border border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Actively Seeking</h3>
                <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Available Now
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Target Roles</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Data Analyst", "Business Analyst", "Data Scientist", "Data Engineer"].map((role) => (
                      <span key={role} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Employment Type</p>
                  <p className="text-sm text-foreground font-medium">Full-time</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Location</p>
                  <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    In-person or Remote
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
