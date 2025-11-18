"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Copy, Check, Code, Database, Brain, Sparkles, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionBackgroundAnimation } from "@/components/section-background-animation"
import Image from "next/image"

const techLogos: { [key: string]: string } = {
  Python: "/python-logo.png",
  Java: "/java-logo.png",
  SQL: "/sql-database-logo.png",
  MongoDB: "/mongodb-logo.png",
  ReactJS: "/react-logo.png",
  NodeJS: "/nodejs-logo.png",
  JavaScript: "/javascript-logo.png",
  PostgreSQL: "/postgresql-logo.png",
  TensorFlow: "/tensorflow-logo.png",
  PyTorch: "/pytorch-logo.png",
  "Scikit-learn": "/scikit-learn-logo.png",
  OpenCV: "/opencv-logo.png",
  Tableau: "/tableau-logo.png",
  R: "/r-programming-logo.png",
  "Power BI": "/power-bi-logo.png",
  Git: "/git-logo.png",
  Docker: "/docker-logo.png",
  AWS: "/aws-logo.png",
  Streamlit: "/streamlit-logo.png",
  Jupyter: "/jupyter-logo.png",
  Kubernetes: "/kubernetes-logo.png",
  FastAPI: "/fastapi-logo.png",
  HuggingFace: "/huggingface-logo.png",
  LangChain: "/langchain-logo.png",
  "HTML/CSS": "/html-css-logo.png",
  Pandas: "/pandas-logo.png",
  NumPy: "/numpy-logo.png",
  Matplotlib: "/matplotlib-logo.png",
  Seaborn: "/seaborn-logo.png",
  "Microsoft Excel": "/microsoft-excel-logo.png",
  MLflow: "/mlflow-logo.jpg",
  ChromaDB: "/chromadb-logo.jpg",
}

const categoryIcons: { [key: string]: typeof Code } = {
  "frameworks-visualization": Code,
  "databases-cloud": Database,
  "data-science-ml": Brain,
  "deep-learning-ai": Sparkles,
  "mlops-deployment": Rocket,
}

const skillCategories = [
  {
    id: "frameworks-visualization",
    title: "Frameworks & Visualization",
    skills: [
      "ReactJS",
      "NodeJS",
      "HTML/CSS",
      "JavaScript",
      "Tableau",
      "R",
      "Power BI",
      "Matplotlib",
      "Seaborn",
      "Microsoft Excel",
    ],
  },
  {
    id: "databases-cloud",
    title: "Databases & Cloud",
    skills: ["SQL", "MongoDB", "PostgreSQL", "AWS"],
  },
  {
    id: "data-science-ml",
    title: "Data Science & ML",
    skills: [
      "Python",
      "PySpark",
      "Data Mining",
      "NLP",
      "Generative AI",
      "Prompt Engineering",
      "LLMs",
      "SLMs",
      "GROQ",
      "Causal Discovery & Inference",
      "MCP",
      "Machine Learning",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Data Analysis",
      "Statistical Modeling",
      "Model Evaluation Metrics",
      "Data Manipulation",
      "User Segmentation",
      "Data Wrangling",
    ],
  },
  {
    id: "deep-learning-ai",
    title: "Deep Learning & AI",
    skills: [
      "Deep Learning",
      "Computer Vision",
      "CNN",
      "RNN",
      "Transformers",
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "Artificial Intelligence",
      "GPT",
      "Large Language Models (LLMs)",
    ],
  },
  {
    id: "mlops-deployment",
    title: "MLOps & Deployment",
    skills: [
      "Git",
      "Docker",
      "Kubernetes",
      "FastAPI",
      "Streamlit",
      "Jupyter",
      "MLflow",
      "HuggingFace",
      "LangChain",
      "ChromaDB",
      "MLOps",
      "DevOps",
      "REST APIs",
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState("data-science-ml")
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)

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

  // Auto-switch tab when search query matches skills in other categories
  useEffect(() => {
    if (searchQuery.trim() === "") {
      return
    }

    const queryLower = searchQuery.toLowerCase()
    
    // Check if current active tab has matches
    const currentCategory = skillCategories.find((cat) => cat.id === activeTab)
    const currentHasMatches = currentCategory?.skills.some((skill) =>
      skill.toLowerCase().includes(queryLower)
    )

    // If current tab doesn't have matches, find and switch to a category that does
    if (!currentHasMatches) {
      const matchingCategory = skillCategories.find((cat) =>
        cat.skills.some((skill) => skill.toLowerCase().includes(queryLower))
      )

      if (matchingCategory) {
        setActiveTab(matchingCategory.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  // Get all skills for copy functionality
  const allSkills = skillCategories.flatMap((cat) => cat.skills)
  const allSkillsText = allSkills.join(", ")

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(allSkillsText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Helper function to filter skills for a category
  const getFilteredSkills = (category: typeof skillCategories[0]) => {
    if (searchQuery.trim() === "") {
      return category.skills
    }
    const queryLower = searchQuery.toLowerCase()
    return category.skills.filter((skill) =>
      skill.toLowerCase().includes(queryLower)
    )
  }

  // Check if a category has matching skills
  const hasMatches = (category: typeof skillCategories[0]) => {
    return getFilteredSkills(category).length > 0
  }

  // Sort categories: matching ones first when searching, original order otherwise
  const sortedCategories = searchQuery.trim() === "" 
    ? skillCategories 
    : [...skillCategories].sort((a, b) => {
        const aHasMatches = hasMatches(a)
        const bHasMatches = hasMatches(b)
        const aMatchCount = getFilteredSkills(a).length
        const bMatchCount = getFilteredSkills(b).length

        // Categories with matches come first
        if (aHasMatches && !bHasMatches) return -1
        if (!aHasMatches && bHasMatches) return 1
        
        // If both have matches or both don't, sort by match count (descending)
        if (aHasMatches && bHasMatches) {
          return bMatchCount - aMatchCount
        }
        
        // If neither has matches, maintain original order
        return 0
      })

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 bg-muted/30 section-fade-in relative overflow-hidden">
      <SectionBackgroundAnimation />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search and Copy Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyAll}
              className="border-primary text-primary hover:bg-primary/10 transition-all"
              aria-label="Copy all skills"
            >
              {copied ? (
                <Check className="h-5 w-5" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Category Cards Grid - Masonry Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {sortedCategories.map((category) => {
              const filteredSkills = getFilteredSkills(category)
              const isActive = activeTab === category.id
              const categoryHasMatches = hasMatches(category)
              const queryLower = searchQuery.toLowerCase()

              const CategoryIcon = categoryIcons[category.id] || Code
              
              return (
                <Card
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id)
                    setSearchQuery("")
                  }}
                  className={`
                    cursor-pointer transition-all duration-300 break-inside-avoid mb-6
                    transform-gpu
                    hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20
                    hover:-translate-y-1
                    ${isActive 
                      ? "border-primary border-2 shadow-lg bg-primary/5 ring-2 ring-primary/20" 
                      : "border-border hover:border-primary/50 shadow-md"
                    }
                    ${searchQuery.trim() !== "" && !categoryHasMatches 
                      ? "opacity-50 pointer-events-none" 
                      : "opacity-100"
                    }
                  `}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {category.title}
                        </CardTitle>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {filteredSkills.length}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 min-h-[100px]">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill) => {
                          const isHighlighted = searchQuery.trim() !== "" && 
                            skill.toLowerCase().includes(queryLower)
                          
                          return (
                            <span
                              key={skill}
                              className={`
                                px-2.5 py-1.5 bg-primary/10 text-primary rounded-md text-xs font-medium 
                                hover:bg-primary/20 hover:scale-105 transition-all duration-200 
                                cursor-default transform-gpu flex items-center gap-1.5
                                ${isHighlighted ? "ring-2 ring-primary/50 bg-primary/20" : ""}
                              `}
                            >
                              {techLogos[skill] && (
                                <Image
                                  src={techLogos[skill] || "/placeholder.svg"}
                                  alt={`${skill} logo`}
                                  width={22}
                                  height={22}
                                  className="rounded-sm flex-shrink-0"
                                />
                              )}
                              <span className="truncate">{skill}</span>
                            </span>
                          )
                        })
                      ) : (
                        <div className="col-span-full text-sm text-muted-foreground text-center py-4">
                          No matching skills
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
