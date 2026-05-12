"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Star, TrendingUp } from "lucide-react"

const featuredProjects = [
  {
    title: "Reinforcement Learning for EV Charging Optimization",
    date: "Jun 2025 – Nov 2025",
    description:
      "Created a reinforcement learning system to optimize EV fleet charging schedules at a depot by processing 15,500+ real-world charging sessions and 56,000+ hourly energy price points.",
    metrics: [
      { label: "Peak Demand Reduction", value: "15–25%" },
      { label: "Cost Reduction vs Baseline", value: "10–20%" },
      { label: "Lower Peak Load (PPO)", value: "39%" },
    ],
    features: [
      "Trained 3 RL agents (PPO, SAC, TD3) for 400,000 timesteps each in a custom Gymnasium environment — PPO identified as top performer",
      "Engineered multi-objective environment supporting V2G, dynamic pricing, and stochastic arrivals with hyperparameter tuning for stable convergence",
    ],
    tech: ["Python", "PyTorch", "Stable-Baselines3", "Gymnasium", "PPO/SAC/TD3", "PySpark", "Streamlit"],
    github: "https://github.com/amaan-1234/RL_Project",
    accentColor: "rgba(5, 150, 105, 0.15)",
  },
  {
    title: "Customer Churn Prediction",
    date: "May 2025 – Aug 2025",
    description:
      "Developed a production-grade ML pipeline for telecom churn prediction on the IBM Telco dataset, combining ensemble methods with SHAP-based explainability for actionable business insights.",
    metrics: [
      { label: "Model Accuracy", value: "~80%" },
      { label: "Dataset Size", value: "7K Records" },
      { label: "Features Engineered", value: "21" },
    ],
    features: [
      "Built end-to-end pipeline with Random Forest and Gradient Boosting, streamlining ETL, encoding, and feature selection from raw telecom data",
      "Identified key churn drivers (contract type, tenure, internet service) using EDA and SHAP values — translating explainability into retention strategies",
    ],
    tech: ["Python", "Scikit-learn", "Random Forest", "Gradient Boosting", "SHAP", "EDA", "Feature Engineering", "Pandas"],
    github: "https://github.com/amaan-1234/Churn-Prediction",
    accentColor: "rgba(234, 88, 12, 0.15)",
  },
]

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 },
    )
    const section = sectionRef.current
    if (section) observer.observe(section)
    return () => { if (section) observer.disconnect() }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            <Star className="w-3.5 h-3.5 fill-primary" />
            Featured Work
          </div>
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Pinned Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.title}
              className={`flex flex-col border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                backgroundColor: project.accentColor,
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                      <Star className="w-3 h-3 fill-primary" />
                      Featured
                    </span>
                  </div>
                  <span className="text-xs text-foreground font-semibold whitespace-nowrap">{project.date}</span>
                </div>
                <CardTitle className="text-xl font-serif font-bold text-foreground leading-snug">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 space-y-5 pt-0">
                <p className="text-sm text-foreground/80 leading-relaxed">{project.description}</p>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="text-center p-3 bg-background/60 rounded-lg border border-primary/10">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-primary" />
                      </div>
                      <div className="text-lg font-bold text-primary">{m.value}</div>
                      <div className="text-xs text-muted-foreground leading-tight mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Key features */}
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-background/70 text-foreground text-xs rounded-md font-medium border border-primary/10">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub button */}
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="mt-auto bg-primary/90 hover:bg-primary text-primary-foreground w-full"
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
