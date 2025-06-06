"use client" 

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import TypingAnimation from "@/components/ui/typing-animation"
import ParticleField from "@/components/ui/particle-field"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Particle Background */}
      <ParticleField />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
                <div className="space-y-4 hidden md:block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-primary font-medium text-lg"
                >
                  {language === "es" ? "¡Hola! Soy" : "Hello! I'm"}
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Kalashnikov
                  <br />
                  <span className="text-primary">Bello</span>
                </h1>

                <div className="text-2xl md:text-3xl text-muted-foreground">
                  <TypingAnimation
                    texts={
                      language === "es"
                        ? ["Analista de Datos", "Desarrollador FullStack", "Especialista en BI"]
                        : ["Data Analyst", "FullStack Developer", "BI Specialist"]
                    }
                  />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-lg"
              >
                {language === "es"
                  ? "Transformo datos complejos en insights accionables y construyo aplicaciones web robustas que impulsan el crecimiento empresarial."
                  : "I transform complex data into actionable insights and build robust web applications that drive business growth."}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  {language === "es" ? "Contactar" : "Get In Touch"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("portfolio")}
                  className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  {language === "es" ? "Ver Portafolio" : "View Portfolio"}
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex gap-4"
              >
                <a
                  href={process.env.NEXT_PUBLIC_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-72 h-96 md:w-80 md:h-[450px] mx-auto">
                <div className="w-full h-full rounded-xl overflow-hidden border-4 border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl hover:border-white/30">
                  <Image
                    src="/profile.JPEG"
                    alt="Kalashnikov Bello"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                    loading="eager"
                  />
                  <div className="absolute inset-0 border-4 border-transparent bg-clip-padding p-[1px] pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent opacity-20"></div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
              >
                <Download className="h-6 w-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm">{language === "es" ? "Desplazar" : "Scroll"}</span>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  )
}
