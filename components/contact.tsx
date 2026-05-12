"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Status = "idle" | "sending" | "success" | "error"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const response = await fetch("https://formspree.io/f/xlgzoqrr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (response.ok) {
        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 section-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm actively looking for full-time opportunities. Whether you have a role in mind or just want to connect — my inbox is open.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="shadow-lg border-primary/10">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Send a Message</h3>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                  <CheckCircle className="w-12 h-12 text-primary" />
                  <p className="text-lg font-semibold text-foreground">Message sent!</p>
                  <p className="text-muted-foreground text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => setStatus("idle")}>
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about the role or project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  {status === "error" && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      Something went wrong. Try emailing me directly.
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 lg:pt-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-5">
                <a
                  href="mailto:amaanmohamed55@gmail.com"
                  className="flex items-center gap-4 group hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shrink-0">
                    <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">Email</p>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      amaanmohamed55@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+14806900972"
                  className="flex items-center gap-4 group hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shrink-0">
                    <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">Phone</p>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      +1 (480) 690-0972
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-lg shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">Tempe, Arizona, USA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability note */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">Available for opportunities</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Graduating May 2026. Open to Data Analyst, Business Analyst, Data Scientist, and Data Engineer roles — in-person or remote.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
