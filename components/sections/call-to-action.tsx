"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  const { language } = useLanguage()

  return (
    <section id="cta" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "es" ? "¿Listo para comenzar?" : "Ready to get started?"}
          </h2>
          <p className="text-lg mb-8">
            {language === "es"
              ? "Trabajemos juntos en tu próximo proyecto."
              : "Let's work together on your next project."}
          </p>
          <Button variant="secondary" size="lg">
            {language === "es" ? "Contactar Ahora" : "Contact Now"}
          </Button>
        </div>
      </div>
    </section>
  )
}
