"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ChevronLeft, ChevronRight } from "lucide-react"
import { SectionBackgroundAnimation } from "@/components/section-background-animation"

// Light color palette matching social sidebar buttons
const projectColors = [
  "rgba(5, 150, 105, 0.35)", // Light green (primary theme)
  "rgba(234, 88, 12, 0.25)", // Light orange (secondary theme)
  "rgba(0, 119, 181, 0.25)", // Light blue
  "rgba(139, 92, 246, 0.25)", // Light purple
  "rgba(20, 184, 166, 0.25)", // Light teal
  "rgba(236, 72, 153, 0.25)", // Light pink
]

const projects = [
  {
    title: "Real-time Conversational AI Platform with Historical Figures",
    date: "Nov 2025",
    description:
      "Built a real-time conversational AI platform enabling users to chat with historical figures using Groq API (Llama 3.3 70B), voice cloning, and server-side streaming architecture.",
    features: [
      "Integrated Groq API with Next.js 16 App Router and ReadableStream API for sub-second response streaming across 8+ historical figure personas with custom prompt engineering",
      "Developed voice-first experience using FastAPI microservice for voice cloning (XTTS v2 + Bark) with Web Speech API, delivering character-specific voices with automatic fallback to browser TTS",
      "Implemented Wikipedia API for figure validation and dynamic prompt system with 8+ pre-configured historical personas, achieving authentic responses with automatic language detection",
    ],
    tech: [
      "Groq API",
      "Llama 3.3 70B",
      "Next.js 16",
      "FastAPI",
      "XTTS v2",
      "Bark",
      "Web Speech API",
      "Wikipedia API",
      "Vercel",
      "Python",
      "ReadableStream API",
      "TypeScript",
    ],
    github: "https://github.com/jayasurya3012/Technicia",
    demo: "#",
  },
  {
    title: "Reinforcement Learning for EV Charging Optimization",
    date: "Jun 2025 – Nov 2025",
    description:
      "Created a reinforcement learning system to optimize EV fleet charging schedules at a depot by processing over 15,500 real-world charging sessions and 56,000 hourly energy price points, training multiple RL agents (PPO, SAC, TD3) within a custom Gymnasium environment.",
    features: [
      "Successfully reduced peak demand by 15-25% and overall costs by 10-20% compared to standard FIFO baseline model",
      "Trained and benchmarked three advanced RL algorithms (SAC, PPO, TD3) for 400,000 timesteps each, identifying PPO as top-performing with 39% lower peak load",
      "Engineered custom multi-objective optimization environment supporting continuous actions, dynamic price signals, stochastic arrivals, and Vehicle-to-Grid (V2G) capabilities",
    ],
    tech: [
      "Reinforcement Learning",
      "Python",
      "PyTorch",
      "Stable-Baselines3",
      "Gymnasium",
      "PPO/SAC/TD3",
      "Streamlit",
      "Pandas",
      "V2G",
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "AI-Powered Clinical Trial Outcome Predictor",
    date: "2024",
    description:
      "Developed a comprehensive multi-modal AI system that combines deep learning neural networks (PyTorch), machine learning algorithms (Random Forest), and Large Language Models (OpenAI GPT) to predict clinical trial success with 85% accuracy.",
    features: [
      "Built an end-to-end machine learning pipeline with data preprocessing, feature engineering, and model training achieving 94.6% AUC-ROC",
      "Features FastAPI backend and Streamlit web interface for real-time predictions and protocol analysis",
      "Production-ready API endpoints for pharmaceutical companies to optimize R&D investments and reduce clinical trial failures",
    ],
    tech: ["PyTorch", "Random Forest", "OpenAI GPT", "FastAPI", "Streamlit", "Machine Learning"],
    github: "https://github.com/amaan-1234/medical-project-Pharma",
    demo: "#",
  },
  {
    title: "Online Smart Search",
    date: "Jun 2025 – Jul 2025",
    description:
      "Built an AI-powered product search and summarization tool using SerpAPI, HuggingFace (DistilBART), and Semantic Kernel for live Google Search retrieval.",
    features: [
      "Implemented modular Python functions for product filtering, summarization, and fallback handling to ensure robustness and reusability",
      "Integrated real-time Google Search API for dynamic product discovery",
      "Built intelligent summarization pipeline using DistilBART for concise product descriptions",
    ],
    tech: ["Python", "SerpAPI", "HuggingFace", "Semantic Kernel", "DistilBART"],
    github: "https://github.com/amaan-1234/OnlineSmartSearch",
    demo: "#",
  },
  {
    title: "RAG Chatbot with Groq AI",
    date: "2024",
    description:
      "Built a Retrieval-Augmented Generation (RAG) chatbot with Streamlit frontend and FastAPI backend, integrating Groq AI (Llama3-8b-8192), HuggingFace embeddings, and ChromaDB.",
    features: [
      "Implemented document ingestion and processing pipeline using LangChain for multi-format uploads (PDF, TXT, MD)",
      "Enabled efficient document retrieval and context-aware Q&A with vector search capabilities",
      "Deployed on Streamlit Cloud with real-time conversational interface and progress tracking",
    ],
    tech: ["Groq AI", "Llama3", "HuggingFace", "ChromaDB", "LangChain", "Streamlit", "FastAPI"],
    github: "https://github.com/amaan-1234/rag-chatbot-groq",
    demo: "#",
  },
  {
    title: "Recipe Sharing App",
    date: "Jun 2025 – Jul 2025",
    description:
      "Developed a full-stack MERN application enabling users to add, browse, edit, and delete recipes with responsive UI and smooth client-side routing.",
    features: [
      "Designed and integrated a RESTful Express API with MongoDB, secured via environment configs",
      "Built responsive React frontend with smooth client-side routing and modern UI components",
      "Deployed the frontend on Vercel with optimized performance and SEO",
    ],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Vercel"],
    github: "https://github.com/amaan-1234/recipe-sharing-app",
    demo: "#",
  },
  {
    title: "HR Analytics Dashboard",
    date: "2024",
    description:
      "Developed an interactive HR Analytics Dashboard in Power BI leveraging DAX, Power Query, and advanced data modeling to track KPIs and deliver actionable insights for workforce planning.",
    features: [
      "Built drill-down visualizations and dynamic filters enabling attrition analysis by age, salary slab, job role, department, and tenure",
      "Tracked key metrics including attrition rate, salary trends, demographics, and tenure patterns",
      "Helped HR teams identify high-risk segments and design targeted retention strategies",
    ],
    tech: ["Power BI", "DAX", "Power Query", "Data Modeling", "HR Analytics"],
    github: "https://github.com/amaan-1234/HR_Analytics",
    demo: "#",
  },
  {
    title: "A/B Testing Simulator",
    date: "2024",
    description:
      "Built an interactive Bayesian A/B Testing Simulator using Streamlit with real-time controls for sample size, conversion rates, and priors, enabling posterior distribution visualization.",
    features: [
      "Implemented Bayesian inference with Beta-binomial conjugacy to simulate conversion outcomes",
      "Computed posterior probabilities via Monte Carlo sampling for probabilistic decision-making insights",
      "Provided intuitive comparisons between test variants with interactive visualizations",
    ],
    tech: ["Python", "Streamlit", "Bayesian Statistics", "Monte Carlo", "A/B Testing"],
    github: "https://github.com/amaan-1234/ABtest",
    demo: "#",
  },
  {
    title: "Tableau Data Visualization",
    date: "2024",
    description:
      "Designed interactive Tableau dashboards for Customer Personality Analysis, integrating bar charts, line graphs, KPI cards, and filters to uncover customer demographics and behavioral insights.",
    features: [
      "Developed multiple worksheets and parameter-driven dashboards enabling exploratory analysis and storytelling",
      "Created comprehensive visualizations for customer segmentation and behavior analysis",
      "Used real-world data sourced from Kaggle for practical applicability",
    ],
    tech: ["Tableau", "Data Visualization", "Customer Analytics", "Dashboard Design"],
    github: "https://github.com/amaan-1234/Tableau",
    demo: "#",
  },
  {
    title: "Customer Churn Prediction",
    date: "2024",
    description:
      "Developed a machine learning pipeline for telecom churn prediction using data cleaning, feature engineering, and exploratory analysis on the IBM Telco Churn dataset.",
    features: [
      "Trained and evaluated Random Forest Classifier with 80/20 split, achieving ~80% accuracy and balanced F1-score",
      "Processed ~7K records with 21 features through comprehensive data preprocessing pipeline",
      "Uncovered key churn drivers such as contract type, tenure, and internet service through feature analysis",
    ],
    tech: ["Python", "Random Forest", "Scikit-learn", "Data Analysis", "Feature Engineering"],
    github: "https://github.com/amaan-1234/Churn-Prediction",
    demo: "#",
  },
  {
    title: "Form Understanding with LayoutLMv3",
    date: "2024",
    description:
      "Fine-tuned LayoutLMv3 transformer model on the FUNSD dataset for form understanding, performing token-level Named Entity Recognition (NER) with bounding box awareness.",
    features: [
      "Integrated multimodal features (text, layout, and image embeddings) for accurate form field classification",
      "Extracted key-value pairs from scanned documents with high precision",
      "Improved document automation workflows by classifying form fields (QUESTION, ANSWER, HEADER, OTHER)",
    ],
    tech: ["LayoutLMv3", "Transformers", "NER", "Computer Vision", "Document AI"],
    github: "https://github.com/amaan-1234/FUNSD_OCR",
    demo: "#",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" ref={sectionRef} className="py-12 px-4 section-fade-in relative overflow-hidden">
      <SectionBackgroundAnimation />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-4">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">
            {currentIndex + 1} of {projects.length}
          </p>
        </div>

        <div className="relative h-[500px] flex items-center justify-center perspective-[2000px]">
          {projects.map((project, index) => {
            const offset = index - currentIndex
            const isActive = offset === 0
            const isPrev = offset === -1 || offset === projects.length - 1
            const isNext = offset === 1 || offset === -projects.length + 1
            const cardColor = projectColors[index % projectColors.length]

            return (
              <Card
                key={project.title}
                className={`absolute w-full max-w-3xl transition-all duration-700 ease-out transform-gpu ${
                  isActive
                    ? "z-30 opacity-100 scale-100 translate-y-0 rotate-0"
                    : isNext
                      ? "z-20 opacity-60 scale-95 translate-y-8 translate-x-12 rotate-2 pointer-events-none"
                      : isPrev
                        ? "z-20 opacity-60 scale-95 translate-y-8 -translate-x-12 -rotate-2 pointer-events-none"
                        : "z-10 opacity-0 scale-90 translate-y-16 pointer-events-none"
                } backdrop-blur-sm shadow-2xl border-primary/20 hover:shadow-primary/20`}
                style={{
                  backfaceVisibility: "hidden",
                  backgroundColor: cardColor,
                }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl font-serif font-bold text-foreground">{project.title}</CardTitle>
                    <span className="text-sm text-foreground font-bold whitespace-nowrap ml-2">
                      {project.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground font-bold leading-relaxed">{project.description}</p>

                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-foreground font-bold flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2.5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-primary/10 text-foreground text-sm rounded-md font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="default" size="sm" asChild className="bg-primary/90 hover:bg-primary">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 rounded-full w-12 h-12 bg-background/95 backdrop-blur-sm shadow-lg hover:scale-110 hover:bg-primary/10 transition-all duration-300"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 rounded-full w-12 h-12 bg-background/95 backdrop-blur-sm shadow-lg hover:scale-110 hover:bg-primary/10 transition-all duration-300"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
