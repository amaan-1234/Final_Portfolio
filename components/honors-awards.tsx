"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Presentation } from "lucide-react"
import Image from "next/image"

const awards = [
  {
    title: "HackAZona v1.0 — 1st Place, Cognite Track",
    date: "Apr 2026",
    issuer: "HackAZona",
    association: "Ira A. Fulton Schools of Engineering at Arizona State University",
    description: "Won 1st Place in the Cognite Track at HackAZona v1.0 as a member of Team Tokyo. Built an NPA Digital Twin platform that transforms time-series industrial sensor data into an interactive 3D environment — featuring real-time data visualization, anomaly detection, agentic query support, and enabling faster data-driven operational decisions.",
    image: "/hackazona-v1.jpg",
  },
  {
    title: "Runner Up at Opportunity Hacks",
    date: "Oct 2025",
    issuer: "Opportunity Hacks",
    association: "Ira A. Fulton Schools of Engineering at Arizona State University",
    description: "Won 2nd Place for the Best Education Platform.",
    image: "/1762208924065.jpeg",
  },
  {
    title: "HackAZona v0.1",
    date: "May 2025",
    issuer: "AZ Nerd Network",
    association: "Ira A. Fulton Schools of Engineering at Arizona State University",
    description: "Won 3rd Prize — People's Choice Award for PlanWiseAI, a trip planner assistant.",
    image: null,
  },
  {
    title: "GI Bots Hackathon",
    date: "Feb 2023",
    issuer: "GI Bots & VIT Chennai",
    association: "Vellore Institute of Technology",
    description: "Won 2nd Place in the GI Bots Hackathon.",
    image: "/GI Bots.png",
  },
  {
    title: "Semantic Sprint",
    date: "Sep 2022",
    issuer: "VIT Chennai",
    association: "Vellore Institute of Technology",
    description: "Won 1st Prize in Intra-College Competition.",
    image: "/Semantic.png",
  },
]

const presentations = [
  {
    title: "International Conference on Circuit Power and Computing Technologies (ICCPCT 2024)",
    date: "Aug 2024",
    issuer: "IEEE",
    association: "Vellore Institute of Technology",
    description: "Presented IEEE-published paper: Deepfake Classification for Human Faces.",
    image: "/ICCPCT.png",
  },
]

function AchievementBadge({ description }: { description: string }) {
  const match = description.match(/(\d+(?:st|nd|rd|th)\s+(?:Place|Prize))/i)
  const peopleChoice = description.match(/(People's Choice Award)/i)
  if (match) return <span className="font-semibold text-primary mr-1">{match[1]}</span>
  if (peopleChoice) return <span className="font-semibold text-primary mr-1">{peopleChoice[1]}</span>
  return null
}

function AwardCard({ award, icon: Icon, borderColor }: {
  award: typeof awards[0]
  icon: typeof Trophy
  borderColor: string
}) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 break-inside-avoid mb-6`} style={{ borderLeftColor: borderColor }}>
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary transition-all duration-300 shrink-0">
              <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-serif font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {award.title}
              </h3>
              <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full inline-flex items-center">
                {award.date}
              </span>
            </div>
          </div>

          <div className="mb-2">
            <p className="text-xs text-muted-foreground">
              Issued by <span className="font-semibold text-foreground">{award.issuer}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Associated with <span className="font-medium text-foreground">{award.association}</span>
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
            <AchievementBadge description={award.description} />
            {award.description
              .replace(/\d+(?:st|nd|rd|th)\s+(?:Place|Prize)/gi, "")
              .replace(/People's Choice Award/gi, "")
              .trim()}
          </p>

          {award.image && (
            <div className="mt-2 rounded-lg overflow-hidden border border-border shadow-sm bg-muted/30">
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
}

export default function HonorsAwards() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        })
      },
      { threshold: 0.1 },
    )
    const section = sectionRef.current
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  return (
    <section id="honors-awards" ref={sectionRef} className="py-20 px-4 section-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Honors & Awards</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Awards & Hackathons */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-foreground">Awards & Hackathons</h3>
            <div className="flex-1 h-px bg-border ml-2" />
          </div>
          <div className="columns-1 md:columns-2 lg:columns-2 gap-6">
            {awards.map((award, index) => (
              <AwardCard key={index} award={award} icon={Trophy} borderColor="#059669" />
            ))}
          </div>
        </div>

        {/* Conferences & Presentations */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Presentation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-foreground">Conferences & Presentations</h3>
            <div className="flex-1 h-px bg-border ml-2" />
          </div>
          <div className="columns-1 md:columns-2 gap-6">
            {presentations.map((award, index) => (
              <AwardCard key={index} award={award} icon={Presentation} borderColor="#2563eb" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
