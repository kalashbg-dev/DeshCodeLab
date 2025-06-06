"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const { language } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    {
      icon: Github,
      href: process.env.NEXT_PUBLIC_GITHUB,
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: process.env.NEXT_PUBLIC_LINKEDIN,
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
      label: "Email",
    },
  ]

  const quickLinks = [
    { href: "#about", label: { en: "About", es: "Acerca" } },
    { href: "#skills", label: { en: "Skills", es: "Habilidades" } },
    { href: "#portfolio", label: { en: "Portfolio", es: "Portafolio" } },
    { href: "#services", label: { en: "Services", es: "Servicios" } },
    { href: "#contact", label: { en: "Contact", es: "Contacto" } },
  ]

  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Kalashnikov Bello
              </h3>
              <p className="text-muted-foreground">
                {language === "es"
                  ? "Analista de Datos & Desarrollador FullStack"
                  : "Data Analyst & FullStack Developer"}
              </p>
            </div>

            <p className="text-muted-foreground mb-6 max-w-md">
              {language === "es"
                ? "Transformando datos en insights accionables y construyendo aplicaciones web robustas que impulsan el crecimiento empresarial."
                : "Transforming data into actionable insights and building robust web applications that drive business growth."}
            </p>

            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 hover:scale-110"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">{language === "es" ? "Enlaces Rápidos" : "Quick Links"}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href)
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {language === "es" ? link.label.es : link.label.en}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">{language === "es" ? "Contacto" : "Contact"}</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Email:</strong>
                <br />
                kalashbg.dev@gmail.com
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">{language === "es" ? "Ubicación:" : "Location:"}</strong>
                <br />
                Barahona, DR
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-muted-foreground text-sm flex items-center">
            © 2025 Kalashnikov Bello.
            <span className="mx-2 flex items-center">
              {language === "es" ? "Hecho con" : "Made with"}
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              {language === "es" ? "en República Dominicana" : "in Dominican Republic"}
            </span>
          </p>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <ArrowUp className="h-4 w-4" />
            {language === "es" ? "Volver arriba" : "Back to top"}
          </Button>
        </motion.div>
      </div>
    </footer>
  )
}
