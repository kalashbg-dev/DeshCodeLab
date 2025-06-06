"use client"

import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"
import { Code, BarChart3, Database, Zap, Globe, Brain } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import GlassCard from "@/components/ui/glass-card"

const services = [
  {
    icon: Code,
    title: { en: "Web Development", es: "Desarrollo Web" },
    description: {
      en: "Modern, responsive web applications built with the latest technologies",
      es: "Aplicaciones web modernas y responsivas construidas con las últimas tecnologías",
    },
    features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    icon: BarChart3,
    title: { en: "Data Analysis", es: "Análisis de Datos" },
    description: {
      en: "Transform your data into actionable insights with advanced analytics",
      es: "Transforma tus datos en insights accionables con análisis avanzados",
    },
    features: ["Python", "Pandas", "NumPy", "Statistical Analysis"],
  },
  {
    icon: Database,
    title: { en: "Business Intelligence", es: "Inteligencia de Negocios" },
    description: {
      en: "Interactive dashboards and reports for data-driven decision making",
      es: "Dashboards interactivos e informes para toma de decisiones basada en datos",
    },
    features: ["Power BI", "Tableau", "SQL", "Data Visualization"],
  },
  {
    icon: Brain,
    title: { en: "AI Integration", es: "Integración de IA" },
    description: {
      en: "Implement AI solutions to automate and enhance your business processes",
      es: "Implementa soluciones de IA para automatizar y mejorar tus procesos de negocio",
    },
    features: ["OpenAI API", "Machine Learning", "Automation", "Chatbots"],
  },
  {
    icon: Globe,
    title: { en: "Digital Transformation", es: "Transformación Digital" },
    description: {
      en: "Complete digital solutions to modernize your business operations",
      es: "Soluciones digitales completas para modernizar tus operaciones de negocio",
    },
    features: ["Process Automation", "Cloud Migration", "API Integration", "Consulting"],
  },
  {
    icon: Zap,
    title: { en: "Performance Optimization", es: "Optimización de Rendimiento" },
    description: {
      en: "Optimize your applications and databases for maximum performance",
      es: "Optimiza tus aplicaciones y bases de datos para máximo rendimiento",
    },
    features: ["Code Optimization", "Database Tuning", "Caching", "Monitoring"],
  },
]

export default function Services() {
  const { language } = useLanguage()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref} id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {language === "es" ? "Mis Servicios" : "My Services"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "es"
              ? "Ofrezco soluciones completas para transformar tu negocio con tecnología de vanguardia"
              : "I offer comprehensive solutions to transform your business with cutting-edge technology"}
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
