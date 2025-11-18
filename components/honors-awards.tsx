"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { SectionBackgroundAnimation } from "@/components/section-background-animation"
import Image from "next/image"

const honorsAwards = [
  {
    title: "Runner Up at Opportunity Hacks",
    date: "Oct 2025",
    issuer: "Opportunity Hacks",
    association: "Ira A. Fulton Schools of Engineering at Arizona State University",
    description: "Won 2nd Place for the Best Education Platform.",
    image: "/1762208924065.jpeg", // Opportunity Hacks 2nd Place Award Photo
  },
  {
    title: "HackAZona v0.1",
    date: "May 2025",
    issuer: "AZ Nerd Network",
    association: "Ira A. Fulton Schools of Engineering at Arizona State University",
    description: "Won 3rd Prize- People's Choice Award for our Project - PlanWiseAI - A trip planner assistant.",
    image: null, // No image for this one
  },
  {
    title: "International Conference on Circuit Power and Computing Technologies",
    date: "Aug 2024",
    issuer: "IEEE",
    association: "Vellore Institute of Technology",
    description: "Presented my IEEE published paper.",
    image: "/ICCPCT.png", // IEEE ICCPCT Certificate
  },
  {
    title: "GI Bots",
    date: "Feb 2023",
    issuer: "GI Bots & VIT Chennai",
    association: "Vellore Institute of Technology",
    description: "Won 2nd Place in the GI Bots Hackathon.",
    image: "/GI Bots.png", // GI Bots Runner-Up Award Certificate
  },
  {
    title: "Semantic Sprint",
    date: "Sep 2022",
    issuer: "VIT Chennai",
    association: "Vellore Institute of Technology",
    description: "Won 1st Prize in Intra-College Competition.",
    image: "/Semantic.png", // Semantic Sprint Certificate of Appreciation
  },
]

export default function HonorsAwards() {
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
    <section id="honors-awards" ref={sectionRef} className="py-20 px-4 bg-muted/30 section-fade-in relative overflow-hidden">
      <SectionBackgroundAnimation />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Honors & Awards</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {honorsAwards.map((award, index) => {
            // Extract achievement level from description
            const achievementMatch = award.description.match(/(\d+(?:st|nd|rd|th)\s+(?:Place|Prize))/i)
            const achievementLevel = achievementMatch ? achievementMatch[1] : null
            // Also check for "People's Choice Award" or similar
            const peopleChoiceMatch = award.description.match(/(People's Choice Award)/i)
            const peopleChoice = peopleChoiceMatch ? peopleChoiceMatch[1] : null
            
            let descriptionWithoutAchievement = award.description
            if (achievementLevel) {
              descriptionWithoutAchievement = descriptionWithoutAchievement.replace(achievementLevel, "").trim()
            }
            if (peopleChoice && !achievementLevel) {
              descriptionWithoutAchievement = descriptionWithoutAchievement.replace(peopleChoice, "").trim()
            }

            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary break-inside-avoid mb-6"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col h-full">
                    {/* Trophy Icon and Title Row */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                        <Trophy className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                          {award.title}
                        </h3>
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full inline-flex items-center">
                          {award.date}
                        </span>
                      </div>
                    </div>

                    {/* Issuer and Association */}
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground">
                        Issued by{" "}
                        <span className="font-semibold text-foreground">
                          {award.issuer === "IEEE" || award.issuer.includes("ASU") ? (
                            <span className="text-primary">{award.issuer}</span>
                          ) : (
                            award.issuer
                          )}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Associated with{" "}
                        <span className="font-medium text-foreground">
                          {award.association.includes("ASU") || award.association.includes("IEEE") ? (
                            <span className="text-primary">{award.association}</span>
                          ) : (
                            award.association
                          )}
                        </span>
                      </p>
                    </div>

                    {/* Description with highlighted achievement */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                      {achievementLevel && (
                        <span className="font-semibold text-primary mr-1">{achievementLevel}</span>
                      )}
                      {peopleChoice && !achievementLevel && (
                        <span className="font-semibold text-primary mr-1">{peopleChoice}</span>
                      )}
                      {descriptionWithoutAchievement}
                    </p>

                    {/* Certificate Image (if available) */}
                    {award.image && (
                      <div className="mt-4 rounded-lg overflow-hidden border-2 border-border shadow-md hover:shadow-lg transition-shadow duration-300 bg-muted/30">
                        <Image
                          src={award.image}
                          alt={`${award.title} certificate`}
                          width={800}
                          height={600}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

