"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, BarChart3, Database, Wrench, Users, Award } from "lucide-react"
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

const skillCategories = [
  {
    title: "Machine Learning & AI",
    icon: Brain,
    skills: [
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Large Language Models (LLMs)",
      "GPT",
      "Artificial Intelligence",
      "Machine Learning",
      "CNN",
      "RNN",
      "Transformers",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
    ],
  },
  {
    title: "Programming Languages & Database",
    icon: Code,
    skills: [
      "Python",
      "Java",
      "SQL",
      "MongoDB",
      "ReactJS",
      "NodeJS",
      "HTML/CSS",
      "JavaScript",
      "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    title: "Data Analysis & Visualization",
    icon: BarChart3,
    skills: ["Tableau", "R", "Power BI", "Matplotlib", "Microsoft Excel", "Pandas", "NumPy", "Seaborn"],
  },
  {
    title: "Data Science Concepts",
    icon: Database,
    skills: [
      "Data Analysis",
      "Statistical Modeling",
      "Model Evaluation Metrics",
      "Data Manipulation",
      "User Segmentation",
      "Data Wrangling",
      "DevOps",
      "MLOps",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Streamlit",
      "Jupyter",
      "MLflow",
      "Kubernetes",
      "FastAPI",
      "HuggingFace",
      "LangChain",
      "ChromaDB",
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: [
      "Time Management",
      "Research Collaboration",
      "Adaptability",
      "Communication Skills",
      "Critical Thinking",
      "Analytical Skills",
      "Willingness to Learn",
    ],
  },
  {
    title: "Certifications",
    icon: Award,
    skills: ["IBM Artificial Intelligence Analyst (May 2023)"],
  },
]

export default function Skills() {
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
    <section id="skills" ref={sectionRef} className="py-20 px-4 bg-muted/30 section-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Technical Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <category.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-200 cursor-default transform-gpu flex items-center gap-2"
                    >
                      {techLogos[skill] && (
                        <Image
                          src={techLogos[skill] || "/placeholder.svg"}
                          alt={`${skill} logo`}
                          width={16}
                          height={16}
                          className="rounded-sm"
                        />
                      )}
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
