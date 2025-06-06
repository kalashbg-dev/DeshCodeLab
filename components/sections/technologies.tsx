"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Code, Database, BarChart2, ArrowRight, BarChart } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Badge } from "@/components/ui/badge"

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: {
    name: string
    percentage: number
  }[]
}

export default function Technologies() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"graph" | "bars">("graph")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("technologies")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const skillCategories: SkillCategory[] = [
    {
      title: t("skills.dataAnalysis"),
      icon: <Code className="h-6 w-6 text-primary-foreground" />,
      skills: [
        { name: t("skills.python"), percentage: 95 },
        { name: t("skills.bash"), percentage: 90 },
        { name: t("skills.postgresql"), percentage: 92 },
        { name: t("skills.sql"), percentage: 95 },
      ],
    },
    {
      title: t("skills.infrastructure"),
      icon: <Database className="h-6 w-6 text-primary-foreground" />,
      skills: [
        { name: t("skills.docker"), percentage: 90 },
        { name: t("skills.git"), percentage: 95 },
        { name: t("skills.linux"), percentage: 92 },
        { name: t("skills.make"), percentage: 88 },
      ],
    },
    {
      title: t("skills.bi"),
      icon: <BarChart2 className="h-6 w-6 text-primary-foreground" />,
      skills: [
        { name: t("skills.powerbi"), percentage: 95 },
        { name: t("skills.tableau"), percentage: 90 },
        { name: t("skills.excel"), percentage: 92 },
      ],
    },
    {
      title: t("skills.fullstack"),
      icon: <Code className="h-6 w-6 text-primary-foreground" />,
      skills: [
        { name: t("skills.mern"), percentage: 90 },
        { name: "TypeScript", percentage: 88 },
        { name: "Next.js", percentage: 92 },
        { name: "Tailwind CSS", percentage: 90 },
      ],
    },
  ]

  const technologies = [
    { name: "React", icon: Code },
    { name: "Python", icon: Code },
    { name: "SQL", icon: Database },
    { name: "Power BI", icon: BarChart },
  ]

  return (
    <section id="technologies" className="section-padding bg-background relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 grid-pattern"></div>

      {/* Background decorative elements */}
      <div className="absolute top-40 left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <Badge variant="outline" className="mb-2 text-primary border-primary">
              {language === "es" ? "HABILIDADES" : "SKILLS"}
            </Badge>
            <h2 className="section-title">
              <span className="text-glow">{t("tech.title")}</span>
            </h2>
            <p className="section-description">{t("tech.desc")}</p>
          </div>

          {/* Technology Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className={`feature-card p-4 sm:p-6 ${isVisible ? "animate-slide-up delay-300" : "opacity-0"}`}>
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2 gradient-text">
                {t("tech.frontend.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <Code className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium text-glow">
                    {t("skills.react")} & {t("skills.nextjs")}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{t("tech.frontend.desc")}</p>
                </div>
              </div>
            </div>

            <div className={`feature-card ${isVisible ? "animate-slide-up delay-400" : "opacity-0"}`}>
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2 gradient-text">
                {t("tech.backend.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <Code className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-muted-foreground mt-1">{t("tech.backend.desc")}</p>
                </div>
              </div>
            </div>

            <div className={`feature-card ${isVisible ? "animate-slide-up delay-500" : "opacity-0"}`}>
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2 gradient-text">
                {t("tech.databases.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <Database className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-muted-foreground mt-1">{t("tech.databases.desc")}</p>
                </div>
              </div>
            </div>

            <div className={`feature-card ${isVisible ? "animate-slide-up delay-600" : "opacity-0"}`}>
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2 gradient-text">
                {t("tech.automation.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <ArrowRight className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-muted-foreground mt-1">{t("tech.automation.desc")}</p>
                </div>
              </div>
            </div>

            <div className={`feature-card ${isVisible ? "animate-slide-up delay-700" : "opacity-0"}`}>
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2 gradient-text">
                {t("tech.devops.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <Code className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-muted-foreground mt-1">{t("tech.devops.desc")}</p>
                </div>
              </div>
            </div>

            <div className={`feature-card ${isVisible ? "animate-slide-up delay-800" : "opacity-0"}`}>
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2 gradient-text">
                {t("tech.bi.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <BarChart2 className="h-6 w-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-muted-foreground mt-1">{t("tech.bi.desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-12 text-center ${isVisible ? "animate-fade-in delay-700" : "opacity-0"}`}>
            <p className="text-muted-foreground mb-6">{t("tech.outro")}</p>

            <a href="#services" className="btn-primary group hover-lift crystal-btn">
              {t("tech.cta")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Updated Technologies Section */}
          <div className="mt-12">
            <h2 className="section-title">{language === "es" ? "Tecnologías" : "Technologies"}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {technologies.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center p-4">
                  <tech.icon className="h-12 w-12 text-primary mb-4" />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
