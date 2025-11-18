"use client"

import { Github, Linkedin, Phone, Mail, BookOpen } from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

const socialLinks = [
  { 
    icon: Linkedin, 
    href: "https://www.linkedin.com/in/amaan-mohamed-k/", 
    label: "LinkedIn",
    color: "rgba(0, 119, 181, 0.15)", // Light blue
    hoverColor: "rgba(0, 119, 181, 0.25)",
    iconColor: "rgba(0, 119, 181, 0.8)",
  },
  { 
    icon: Github, 
    href: "https://github.com/amaan-1234", 
    label: "GitHub",
    color: "rgba(51, 51, 51, 0.15)", // Light gray/black
    hoverColor: "rgba(51, 51, 51, 0.25)",
    iconColor: "rgba(51, 51, 51, 0.8)",
  },
  { 
    type: "image", 
    src: "/leetcode-logo.png", 
    href: "https://leetcode.com/u/k34m2Ncqvy/", 
    label: "LeetCode",
    color: "rgba(255, 161, 22, 0.15)", // Light orange
    hoverColor: "rgba(255, 161, 22, 0.25)",
    iconColor: "rgba(255, 161, 22, 0.8)",
  },
  { 
    icon: BookOpen, 
    href: "https://medium.com/@amaanmohamed55", 
    label: "Medium",
    color: "rgba(5, 150, 105, 0.15)", // Light green (primary)
    hoverColor: "rgba(5, 150, 105, 0.25)",
    iconColor: "rgba(5, 150, 105, 0.8)",
  },
  { 
    icon: Mail, 
    href: "mailto:amaanmohamed55@gmail.com", 
    label: "Email",
    color: "rgba(234, 88, 12, 0.15)", // Light orange (secondary)
    hoverColor: "rgba(234, 88, 12, 0.25)",
    iconColor: "rgba(234, 88, 12, 0.8)",
  },
  { 
    icon: Phone, 
    href: "tel:+14806900972", 
    label: "Phone",
    color: "rgba(139, 92, 246, 0.15)", // Light purple
    hoverColor: "rgba(139, 92, 246, 0.25)",
    iconColor: "rgba(139, 92, 246, 0.8)",
  },
]

export default function SocialSidebar() {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-col space-y-4">
          {socialLinks.map((link, index) => {
            const IconComponent = link.type !== "image" ? link.icon : null
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-3 rounded-lg shadow-md transition-all duration-300 hover:scale-110 group border border-transparent hover:border-opacity-30"
                    style={{
                      backgroundColor: link.color,
                      borderColor: link.iconColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = link.hoverColor
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = link.color
                    }}
                    aria-label={link.label}
                  >
                    {link.type === "image" ? (
                      <Image
                        src={link.src || "/placeholder.svg"}
                        alt={link.label}
                        width={20}
                        height={20}
                        className="h-5 w-5"
                        style={{ filter: `opacity(0.8)` }}
                      />
                    ) : IconComponent ? (
                      <IconComponent 
                        className="h-5 w-5 transition-colors duration-300" 
                        style={{ color: link.iconColor }}
                      />
                    ) : null}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
}
