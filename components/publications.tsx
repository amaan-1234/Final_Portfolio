"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"
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
  },
]

export default function Publications() {
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
    <section id="publications" ref={sectionRef} className="py-20 px-4 bg-muted/30 section-fade-in relative overflow-hidden">
      <SectionBackgroundAnimation />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Publications & Research</h2>
        </div>

        <div className="space-y-8">
          {publications.map((publication, index) => (
            <Card
              key={publication.title}
              className="group hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">
                  {publication.title}
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="font-medium">{publication.journal}</span>
                  <span>{publication.year}</span>
                  <span>{publication.authors}</span>
                </div>
                {publication.doi && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">DOI:</span> {publication.doi}
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{publication.abstract}</p>

                <Button variant="outline" size="sm" asChild>
                  <a href={publication.link} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Read Paper
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
