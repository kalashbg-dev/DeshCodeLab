"use client"

import { useEffect, useState } from "react"
import {
  Search,
  PlaneTakeoffIcon as LayoutPlaneTakeoff,
  Paintbrush,
  Code2,
  TestTube,
  Rocket,
  Database,
  BarChart2,
  LineChart,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function WorkProcess() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"development" | "analysis">("development")

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

    const section = document.getElementById("work-process")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const developmentSteps = [
    {
      icon: <Search className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Investigación" : "Research",
      description: language === "es" ? "Comprendo las necesidades del cliente." : "Understand the client's needs.",
    },
    {
      icon: <LayoutPlaneTakeoff className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Planificación" : "Planning",
      description: language === "es" ? "Desarrollo un plan detallado." : "Develop a detailed plan.",
    },
    {
      icon: <Paintbrush className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Diseño" : "Design",
      description: language === "es" ? "Creo diseños atractivos." : "Create attractive designs.",
    },
    {
      icon: <Code2 className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Desarrollo" : "Development",
      description: language === "es" ? "Desarrollo el producto o servicio." : "Develop the product or service.",
    },
    {
      icon: <TestTube className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Pruebas" : "Testing",
      description: language === "es" ? "Realizo pruebas exhaustivas." : "Conduct thorough testing.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Lanzamiento" : "Launch",
      description: language === "es" ? "Lanzo el producto o servicio." : "Launch the product or service.",
    },
  ]

  const analysisSteps = [
    {
      icon: <Search className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Investigación" : "Research",
      description: language === "es" ? "Comprendo las necesidades del cliente." : "Understand the client's needs.",
    },
    {
      icon: <Database className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Recopilación de datos" : "Data Collection",
      description: language === "es" ? "Recopilo y analizo datos relevantes." : "Collect and analyze relevant data.",
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Análisis de datos" : "Data Analysis",
      description:
        language === "es" ? "Interpreto los datos para obtener insights." : "Interpret data to gain insights.",
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Visualización de datos" : "Data Visualization",
      description: language === "es" ? "Presento los datos de manera visual." : "Present data in a visual format.",
    },
    {
      icon: <TestTube className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Pruebas" : "Testing",
      description: language === "es" ? "Realizo pruebas exhaustivas." : "Conduct thorough testing.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-primary-foreground" />,
      title: language === "es" ? "Lanzamiento" : "Launch",
      description: language === "es" ? "Lanzo el producto o servicio." : "Launch the product or service.",
    },
  ]

  return (
    <section id="work-process" className="section-padding bg-muted relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">{language === "es" ? "Proceso de Trabajo" : "Work Process"}</h2>
          <p className="section-description">
            {language === "es"
              ? "Mi metodología para entregar resultados excepcionales."
              : "My methodology for delivering exceptional results."}
          </p>

          {/* Tabs for switching between processes */}
          <div className="flex justify-center mb-12">
            <div className="bg-muted p-1 rounded-lg flex">
              <button
                onClick={() => setActiveTab("development")}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === "development"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted-foreground/10"
                }`}
                aria-label="Development process tab"
              >
                <span className="flex items-center">
                  <Code2 className="h-4 w-4 mr-2" />
                  {language === "es" ? "Desarrollo" : "Development"}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("analysis")}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === "analysis"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted-foreground/10"
                }`}
                aria-label="Analysis process tab"
              >
                <span className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  {language === "es" ? "Análisis" : "Analysis"}
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 mt-8 max-w-3xl mx-auto">
            {(activeTab === "development" ? developmentSteps : analysisSteps).map((step, index) => (
              <div
                key={index}
                className={`flex items-start process-step ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="bg-primary p-3 rounded-full mr-4 flex-shrink-0 z-10">{step.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
