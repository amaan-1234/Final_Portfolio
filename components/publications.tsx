"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Calendar, Users, BookOpen, Award } from "lucide-react"
import { SectionBackgroundAnimation } from "@/components/section-background-animation"

const publications = [
  {
    title: "Deepfake Classification for Human Faces",
    journal:
      "Proceedings of the 7th International Conference on Circuit Power and Computing Technologies (ICCPCT 2024), IEEE",
    year: "May 2024",
    authors: "Kalemullah, Amaan Mohamed",
    abstract:
      "This paper presents a comprehensive approach to deepfake classification for human faces using advanced computer vision and deep learning techniques. The research contributes to the field of digital media authentication and security.",
    doi: "10.1109/ICCPCT61902.2024.10672973",
    link: "https://doi.org/10.1109/ICCPCT61902.2024.10672973",
    type: "IEEE Conference",
  },
]

export default function Publications() {
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
      
      const observeCards = () => {
        const cards = section.querySelectorAll("[data-card-index]")
        if (cards.length > 0) {
          cards.forEach((card) => observer.observe(card))
        } else {
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
    <section id="publications" ref={sectionRef} className="py-20 px-4 bg-muted/30 section-fade-in relative overflow-hidden">
      <SectionBackgroundAnimation />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Publications & Research</h2>
        </div>

        <div className="space-y-8">
          {publications.map((publication, index) => {
            const isVisible = visibleCards.has(index)
            return (
              <Card
                key={publication.title}
                data-card-index={index}
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-700 ease-out hover:scale-[1.02] hover:-translate-y-2 border-l-4 border-l-primary/50 hover:border-l-primary transform-gpu ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Decorative gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 transition-all duration-500 pointer-events-none" />

                <CardHeader className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50 shrink-0">
                      <BookOpen className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-all duration-300" />
                    </div>
                    <div className="flex-1 flex items-start justify-between gap-4">
                      <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors duration-300 group-hover:scale-105 origin-left inline-block transform-gpu mb-2 flex-1">
                        {publication.title}
                      </CardTitle>
                      {publication.type && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0 mt-1">
                          {publication.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="font-medium">{publication.journal}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{publication.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{publication.authors}</span>
                      </div>
                    </div>

                    {publication.doi && (
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="font-medium">DOI:</span>{" "}
                        <span className="font-mono text-xs">{publication.doi}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                  <div className="relative">
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {publication.abstract}
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 group-hover:scale-105"
                  >
                    <a href={publication.link} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Read Paper
                      <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
