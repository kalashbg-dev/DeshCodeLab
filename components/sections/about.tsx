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
    <section ref={ref} id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {language === "es" ? "Acerca de Mí" : "About Me"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "es"
              ? "Soy un profesional apasionado por transformar datos en soluciones innovadoras que impulsan el crecimiento empresarial."
              : "I'm a passionate professional focused on transforming data into innovative solutions that drive business growth."}
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
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                {language === "es" ? "Mi Historia" : "My Story"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "es"
                  ? "Con una sólida base en liderazgo empresarial, ahora me enfoco exclusivamente en el análisis de datos y el desarrollo web full-stack. Construyo soluciones eficientes y escalables que transforman datos brutos en insights claros y accionables, generando valor real para las empresas."
                  : "With a strong foundation in business leadership, I now focus exclusively on data analysis and full-stack web development. I build efficient, scalable solutions that transform raw data into clear, actionable insights, driving real value for businesses."}
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                {language === "es" ? "Mi Enfoque" : "My Approach"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "es"
                  ? "Creo en la importancia de entender profundamente las necesidades del negocio antes de proponer soluciones técnicas. Cada proyecto es una oportunidad para crear algo único que genere valor real y duradero."
                  : "I believe in the importance of deeply understanding business needs before proposing technical solutions. Every project is an opportunity to create something unique that generates real and lasting value."}
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
    </section>
  )
}
