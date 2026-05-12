"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

type Category = "all" | "ml-ai" | "nlp-llm" | "data-analytics"

const categoryMeta: Record<Category, { label: string; color: string; bg: string }> = {
  "all":            { label: "All",            color: "text-foreground",   bg: "bg-muted" },
  "ml-ai":          { label: "ML / AI",         color: "text-primary",      bg: "bg-primary/10" },
  "nlp-llm":        { label: "NLP / LLM",       color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10" },
  "data-analytics": { label: "Data Analytics",  color: "text-blue-600 dark:text-blue-400",     bg: "bg-blue-500/10" },
}

const projects: {
  title: string
  date: string
  category: Exclude<Category, "all">
  description: string
  features: string[]
  tech: string[]
  github: string
}[] = [
  {
    title: "Real-time Conversational AI Platform with Historical Figures",
    date: "Nov 2025",
    category: "nlp-llm",
    description:
      "Built a real-time conversational AI platform enabling users to chat with historical figures using Groq API (Llama 3.3 70B), voice cloning, and server-side streaming architecture.",
    features: [
      "Integrated Groq API with Next.js 16 App Router and ReadableStream API for sub-second response streaming across 8+ historical figure personas",
      "Developed voice-first experience using FastAPI microservice for voice cloning (XTTS v2 + Bark) with Web Speech API and automatic fallback to browser TTS",
      "Implemented Wikipedia API for figure validation and dynamic prompt system with automatic language detection",
    ],
    tech: ["Groq API", "Llama 3.3 70B", "Next.js 16", "FastAPI", "XTTS v2", "Bark", "Web Speech API", "TypeScript"],
    github: "https://github.com/jayasurya3012/Technicia",
  },
  {
    title: "Reinforcement Learning for EV Charging Optimization",
    date: "Jun 2025 – Nov 2025",
    category: "ml-ai",
    description:
      "Created a reinforcement learning system to optimize EV fleet charging schedules, training PPO, SAC, and TD3 agents in a custom Gymnasium environment across 15,500+ real-world sessions.",
    features: [
      "Reduced peak demand by 15–25% and costs by 10–20% vs FIFO baseline over 400,000 training timesteps",
      "Identified PPO as top-performing agent with 39% lower peak load vs baseline",
      "Engineered multi-objective environment supporting V2G, dynamic pricing, and stochastic arrivals",
    ],
    tech: ["Python", "PyTorch", "Stable-Baselines3", "Gymnasium", "PPO/SAC/TD3", "PySpark", "Streamlit"],
    github: "https://github.com/amaan-1234/RL_Project",
  },
  {
    title: "AI-Powered Clinical Trial Outcome Predictor",
    date: "Apr 2025 – Aug 2025",
    category: "ml-ai",
    description:
      "Developed a multi-modal AI system combining PyTorch deep learning, ensemble ML models, and GPT-based protocol analysis to predict clinical trial success with 85% accuracy.",
    features: [
      "Achieved 85% accuracy and 94.6% AUC-ROC with end-to-end pipeline covering EDA, feature engineering, and hyperparameter tuning",
      "Deployed FastAPI backend and Streamlit interface for real-time inference and protocol analysis",
      "Production-ready API for pharmaceutical companies to optimize R&D investments",
    ],
    tech: ["PyTorch", "Random Forest", "XGBoost", "OpenAI GPT", "FastAPI", "Streamlit", "Scikit-learn"],
    github: "https://github.com/amaan-1234/medical-project-Pharma",
  },
  {
    title: "Online Smart Search",
    date: "Jun 2025 – Jul 2025",
    category: "nlp-llm",
    description:
      "Built an AI-powered product search and summarization tool using SerpAPI, HuggingFace (DistilBART), and Semantic Kernel for live Google Search retrieval.",
    features: [
      "Implemented modular Python functions for product filtering, summarization, and fallback handling",
      "Integrated real-time Google Search API for dynamic product discovery",
      "Built intelligent summarization pipeline using DistilBART for concise product descriptions",
    ],
    tech: ["Python", "SerpAPI", "HuggingFace", "Semantic Kernel", "DistilBART"],
    github: "https://github.com/amaan-1234/OnlineSmartSearch",
  },
  {
    title: "RAG Chatbot with Groq AI",
    date: "2024",
    category: "nlp-llm",
    description:
      "Built a Retrieval-Augmented Generation chatbot with Streamlit frontend and FastAPI backend, integrating Groq AI (Llama3), HuggingFace embeddings, and ChromaDB vector search.",
    features: [
      "Implemented document ingestion pipeline using LangChain for multi-format uploads (PDF, TXT, MD)",
      "Enabled efficient document retrieval and context-aware Q&A with vector search",
      "Deployed on Streamlit Cloud with real-time conversational interface and progress tracking",
    ],
    tech: ["Groq AI", "Llama3", "HuggingFace", "ChromaDB", "LangChain", "Streamlit", "FastAPI"],
    github: "https://github.com/amaan-1234/rag-chatbot-groq",
  },
  {
    title: "HR Analytics Dashboard",
    date: "2024",
    category: "data-analytics",
    description:
      "Developed an interactive Power BI dashboard tracking HR KPIs and delivering actionable insights for workforce planning, attrition analysis, and retention strategy.",
    features: [
      "Built drill-down visualizations enabling attrition analysis by age, salary, job role, department, and tenure",
      "Tracked key metrics including attrition rate, salary trends, demographics, and tenure patterns",
      "Helped HR teams identify high-risk segments and design targeted retention strategies",
    ],
    tech: ["Power BI", "DAX", "Power Query", "Data Modeling", "HR Analytics"],
    github: "https://github.com/amaan-1234/HR_Analytics",
  },
  {
    title: "A/B Testing Simulator",
    date: "2024",
    category: "data-analytics",
    description:
      "Built an interactive Bayesian A/B Testing Simulator with real-time controls for sample size, conversion rates, and priors, enabling posterior distribution visualization.",
    features: [
      "Implemented Bayesian inference with Beta-binomial conjugacy for conversion outcome simulation",
      "Computed posterior probabilities via Monte Carlo sampling for probabilistic decision-making",
      "Provided intuitive variant comparisons with interactive Streamlit visualizations",
    ],
    tech: ["Python", "Streamlit", "Bayesian Statistics", "Monte Carlo Simulation", "A/B Testing"],
    github: "https://github.com/amaan-1234/ABtest",
  },
  {
    title: "Tableau Data Visualization",
    date: "2024",
    category: "data-analytics",
    description:
      "Designed interactive Tableau dashboards for Customer Personality Analysis with bar charts, line graphs, KPI cards, and filters to uncover demographic and behavioral insights.",
    features: [
      "Developed multiple worksheets and parameter-driven dashboards for exploratory analysis and storytelling",
      "Created comprehensive visualizations for customer segmentation and behavior analysis",
      "Used real-world Kaggle data for practical, business-applicable insights",
    ],
    tech: ["Tableau", "Data Visualization", "Customer Analytics", "Dashboard Design"],
    github: "https://github.com/amaan-1234/Tableau",
  },
  {
    title: "Customer Churn Prediction",
    date: "May 2025 – Aug 2025",
    category: "ml-ai",
    description:
      "Developed an ML pipeline for telecom churn prediction on the IBM Telco dataset, achieving ~80% accuracy using Random Forest and Gradient Boosting with SHAP-based explainability.",
    features: [
      "Achieved ~80% accuracy by building an ML pipeline with Random Forest and Gradient Boosting, streamlining ETL, encoding, and feature selection",
      "Identified key churn drivers (contract type, tenure) using EDA and SHAP values for actionable business insights",
      "Processed ~7K records with 21 features through a comprehensive data preprocessing pipeline",
    ],
    tech: ["Python", "Scikit-learn", "Random Forest", "Gradient Boosting", "SHAP", "EDA", "Feature Engineering"],
    github: "https://github.com/amaan-1234/Churn-Prediction",
  },
  {
    title: "Form Understanding with LayoutLMv3",
    date: "2024",
    category: "nlp-llm",
    description:
      "Fine-tuned LayoutLMv3 on the FUNSD dataset for token-level NER with bounding box awareness, automating form field extraction from scanned documents.",
    features: [
      "Integrated multimodal features (text, layout, image embeddings) for accurate form field classification",
      "Extracted key-value pairs from scanned documents with high precision",
      "Classified form fields (QUESTION, ANSWER, HEADER, OTHER) to improve document automation workflows",
    ],
    tech: ["LayoutLMv3", "Transformers", "NER", "Computer Vision", "Document AI", "HuggingFace"],
    github: "https://github.com/amaan-1234/FUNSD_OCR",
  },
]

const MAX_TECH_SHOWN = 5

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState<Category>("all")

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

  const filters: Category[] = ["all", "ml-ai", "nlp-llm", "data-analytics"]

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const counts: Record<Category, number> = {
    all: projects.length,
    "ml-ai": projects.filter((p) => p.category === "ml-ai").length,
    "nlp-llm": projects.filter((p) => p.category === "nlp-llm").length,
    "data-analytics": projects.filter((p) => p.category === "data-analytics").length,
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 bg-muted/30 section-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">All Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => {
              const meta = categoryMeta[f]
              const isActive = activeFilter === f
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-background"
                  }`}
                >
                  {meta.label}
                  <span className={`ml-1.5 text-xs ${isActive ? "opacity-80" : "opacity-60"}`}>
                    ({counts[f]})
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const meta = categoryMeta[project.category]
            const extraTech = project.tech.length - MAX_TECH_SHOWN
            return (
              <Card
                key={project.title}
                className="flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border hover:border-primary/30"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${meta.bg} ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{project.date}</span>
                  </div>
                  <CardTitle className="text-base font-bold text-foreground leading-snug">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 space-y-4 pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.slice(0, MAX_TECH_SHOWN).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded font-medium">
                        {tech}
                      </span>
                    ))}
                    {extraTech > 0 && (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded font-medium">
                        +{extraTech} more
                      </span>
                    )}
                  </div>

                  {/* GitHub button */}
                  <Button variant="outline" size="sm" asChild className="w-full mt-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
