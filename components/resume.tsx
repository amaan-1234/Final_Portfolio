"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye } from "lucide-react"

export default function Resume() {
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
    <section id="resume" ref={sectionRef} className="py-20 px-4 bg-muted/30 section-fade-in">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Resume</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Download my complete resume to learn more about my experience and qualifications
        </p>

        <Card className="group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Download className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-semibold mb-2">Amaan Mohamed Kalemullah</h3>
                <p className="text-muted-foreground mb-6">Data Scientist & Machine Learning Engineer</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group/btn" asChild>
                  <a href="/resume.pdf" download="Amaan_Mohamed_Kalemullah_Resume.pdf">
                    <Download className="w-5 h-5 mr-2 group-hover/btn:animate-bounce" />
                    Download Resume
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Eye className="w-5 h-5 mr-2" />
                    View Online
                  </a>
                </Button>
              </div>

              
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
