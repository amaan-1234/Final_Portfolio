"use client"

import { Github, Linkedin, Phone, Mail, BookOpen } from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/amaan-mohamed-k/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/amaan-1234", label: "GitHub" },
  { type: "image", src: "/leetcode-logo.png", href: "https://leetcode.com/u/k34m2Ncqvy/", label: "LeetCode" },
  { icon: BookOpen, href: "https://medium.com/@amaanmohamed55", label: "Medium" },
  { icon: Mail, href: "mailto:amaanmohamed55@gmail.com", label: "Email" },
  { icon: Phone, href: "tel:+14806900972", label: "Phone" },
]

export default function SocialSidebar() {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-col space-y-4">
          {socialLinks.map((link, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-3 bg-card hover:bg-primary text-muted-foreground hover:text-primary-foreground rounded-lg shadow-md transition-all duration-300 hover:scale-110 group"
                  aria-label={link.label}
                >
                  {link.type === "image" ? (
                    <Image
                      src={link.src || "/placeholder.svg"}
                      alt={link.label}
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  ) : (
                    <link.icon className="h-5 w-5" />
                  )}
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  )
}
