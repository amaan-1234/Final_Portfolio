"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"

type Issuer = "IBM" | "LinkedIn" | "Google" | "Simplilearn"

interface Certification {
  name: string
  issuer: Issuer
  date: string
}

const issuerMeta: Record<Issuer, { color: string; bg: string; border: string }> = {
  IBM:        { color: "text-[#1F70C1]",                            bg: "bg-[#1F70C1]/10", border: "border-l-[#1F70C1]" },
  LinkedIn:   { color: "text-[#0077B5]",                            bg: "bg-[#0077B5]/10", border: "border-l-[#0077B5]" },
  Google:     { color: "text-[#4285F4]",                            bg: "bg-[#4285F4]/10", border: "border-l-[#4285F4]" },
  Simplilearn:{ color: "text-orange-600 dark:text-orange-400",      bg: "bg-orange-500/10", border: "border-l-orange-500" },
}

const certifications: Certification[] = [
  { name: "Docker Foundations Professional Certificate",  issuer: "LinkedIn",    date: "Jan 2026" },
  { name: "Artificial Intelligence Analyst",              issuer: "IBM",         date: "May 2023" },
  { name: "Docker Essentials: A Developer Introduction",  issuer: "IBM",         date: "Jul 2025" },
  { name: "Hadoop 101",                                   issuer: "IBM",         date: "Jul 2025" },
  { name: "Transformer Models and BERT Model",            issuer: "Google",      date: "Jul 2025" },
  { name: "Introduction to Responsible AI",               issuer: "Google",      date: "Jul 2025" },
  { name: "Build AI Agents using LangGraph",              issuer: "Simplilearn", date: "Jul 2025" },
  { name: "Introduction to Data Visualization",           issuer: "Simplilearn", date: "Jul 2025" },
  { name: "Open Source Models with Hugging Face",         issuer: "Simplilearn", date: "Jul 2025" },
  { name: "No Code AI Agent Builder",                     issuer: "Simplilearn", date: "Jun 2025" },
  { name: "Build a Chatbot Using LangChain",              issuer: "Simplilearn", date: "Jul 2025" },
  { name: "Introduction to Multimodal RAG Systems",       issuer: "Simplilearn", date: "Jul 2025" },
]

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 },
    )
    const section = sectionRef.current
    if (section) observer.observe(section)
    return () => { if (section) observer.disconnect() }
  }, [])

  const issuers: Issuer[] = ["IBM", "LinkedIn", "Google", "Simplilearn"]

  return (
    <section id="certifications" ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Certifications</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-sm">
            {certifications.length} certifications across AI, ML, Cloud, and Data
          </p>
        </div>

        {/* Issuer legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {issuers.map((issuer) => {
            const meta = issuerMeta[issuer]
            const count = certifications.filter((c) => c.issuer === issuer).length
            return (
              <div key={issuer} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${meta.bg} ${meta.color} border border-current/20`}>
                <Award className="w-3.5 h-3.5" />
                {issuer} <span className="opacity-70">({count})</span>
              </div>
            )
          })}
        </div>

        {/* Certification cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => {
            const meta = issuerMeta[cert.issuer]
            return (
              <Card
                key={index}
                className={`border-l-4 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${meta.border} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-snug mb-2">
                        {cert.name}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${meta.bg} ${meta.color}`}>
                          {cert.issuer}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{cert.date}</span>
                      </div>
                    </div>
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
