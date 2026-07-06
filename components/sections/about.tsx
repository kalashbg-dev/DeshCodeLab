"use client"

import { motion } from "framer-motion"
import { Code, Zap, Users, Award } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import GlassCard from "@/components/ui/glass-card"

const stats = [
  { icon: Code, value: "10+", label: { es: "Proyectos", en: "Projects" } },
  { icon: Users, value: "15+", label: { es: "Clientes", en: "Clients" } },
  { icon: Award, value: "6+", label: { es: "Años", en: "Years" } },
  { icon: Zap, value: "100%", label: { es: "Satisfacción", en: "Satisfaction" } },
]

export default function About() {
  const { language } = useLanguage()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div ref={ref} className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {language === "es" ? "Acerca de Mí" : "About Me"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "es"
              ? "Transformo datos en soluciones web de alto rendimiento."
              : "I transform data into high-performance web solutions."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {language === "es" ? "Enfoque Técnico" : "Technical Focus"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "es"
                  ? "Especializado en análisis de datos y desarrollo web. Construyo soluciones escalables y dashboards orientados a resultados."
                  : "Specialized in data analysis and web development. I build scalable solutions and results-oriented dashboards."}
              </p>
            </GlassCard>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <GlassCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === "es" ? stat.label.es : stat.label.en}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
