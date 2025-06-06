"use client"

import { useLanguage } from "@/context/language-context"

export default function Benefits() {
  const { language } = useLanguage()

  return (
    <section id="benefits" className="section-padding bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">{language === "es" ? "Beneficios" : "Benefits"}</h2>
          <p className="section-description">
            {language === "es" ? "Por qué elegir trabajar conmigo." : "Why choose to work with me."}
          </p>
        </div>
      </div>
    </section>
  )
}
