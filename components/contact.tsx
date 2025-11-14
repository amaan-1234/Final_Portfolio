"use client"

import { useEffect, useRef } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
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
    <section id="contact" ref={sectionRef} className="py-20 px-4 bg-muted/30 section-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Contact Information</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 group hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer transform-gpu">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300">Email</p>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    amaanmohamed55@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer transform-gpu">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300">Phone</p>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    +1 (480) 690-0972
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer transform-gpu">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300">Location</p>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    Tempe, Arizona, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
