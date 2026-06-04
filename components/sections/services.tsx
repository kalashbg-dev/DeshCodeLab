"use client"

import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"
import { Code, BarChart3, Zap, Globe } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import GlassCard from "@/components/ui/glass-card"

const services = [
  {
    icon: Globe,
    title: { en: "WordPress & SEO", es: "WordPress y SEO" },
    description: {
      en: "Fast, optimized WordPress sites ranking high on search engines.",
      es: "Sitios WordPress rápidos y optimizados para posicionar alto en buscadores.",
    },
    features: ["WordPress", "SEO", "WPO", "Speed Optimization"],
  },
  {
    icon: BarChart3,
    title: { en: "Dashboards & Data", es: "Dashboards y Datos" },
    description: {
      en: "Interactive dashboards and data analysis to drive your business.",
      es: "Dashboards interactivos y análisis de datos para impulsar tu negocio.",
    },
    features: ["Python", "Power BI", "Data Analysis", "SQL"],
  },
  {
    icon: Code,
    title: { en: "Web Development", es: "Desarrollo Web" },
    description: {
      en: "Custom web applications focused on extreme performance.",
      es: "Aplicaciones web personalizadas enfocadas en el rendimiento extremo.",
    },
    features: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    icon: Zap,
    title: { en: "Virtual Assistance", es: "Asistencia Virtual" },
    description: {
      en: "Technical virtual assistance for automated and optimized operations.",
      es: "Asistencia virtual técnica para operaciones automatizadas y optimizadas.",
    },
    features: ["Automation", "Process Optimization", "Tech Support", "CRM"],
  },
]

export default function Services() {
  const { language } = useLanguage()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref} id="services" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {language === "es" ? "Servicios" : "Services"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "es"
              ? "Soluciones técnicas precisas y enfocadas en resultados."
              : "Precise, results-focused technical solutions."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{language === "es" ? service.title.es : service.title.en}</h3>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {language === "es" ? service.description.es : service.description.en}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-8">
            {language === "es"
              ? "¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte."
              : "Have a project in mind? Let's talk about how I can help you."}
          </p>
          <Button
            size="lg"
            onClick={() => {
              const element = document.getElementById("contact")
              if (element) element.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
          >
            {language === "es" ? "Iniciar Proyecto" : "Start Project"}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
