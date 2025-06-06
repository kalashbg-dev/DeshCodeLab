"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import GlassCard from "@/components/ui/glass-card"

const testimonials = [
  {
    id: 1,
    name: "Albert Cuevas",
    role: { en: "Ingeniero Químico", es: "BS-Chemistry"},
    company: " ",
    image: "/albert.jpg?height=80&width=80",
    rating: 4,
    link: "https://x.com/albertcuevas",
    content: {
      en: "Kalashnikov has been a great help to me as a financial and business advisor, and designed the logo and graphic line for our company for my wife.",
      es: "Kalashnikov ha sido de gran ayuda para mi como asesor  y asistente de finanzas y negocios y diseñó para mi esposa el logo y linea gráfica de nuestra empresa.",
    },
  },
  {
    id: 2,
    name: "Yesrael Rodriguez",
    role: { en: "CEO", es: "CEO" },
    company: "Kairos Experience",
    image: "/yes_profile.jpeg?height=80&width=80",
    rating: 5,
    link: "https://www.linkedin.com/in/yesrael-rodriguez/",
    content: {
      en: "Working with Kalashnikov was an excellent experience. His technical knowledge and results-oriented approach enabled me to earn over $200k in my personal investments. He is redesigning my website and has been a great help to me and my business.",
      es: "Trabajar con Kalashnikov fue una excelente experiencia. Su conocimiento técnico y enfoque orientado a resultados me permitió ganar más de $200k en mis inversiones personales. Está rediseñando mi sitio web y ha sido de gran ayuda para mí y mi negocio.",
    },
  },
  {
    id: 3,
    name: "Nayeline Medina",
    role: { en: "Medical Doctor & Consultant ", es: "Médico & Consultora" },
    company: "Health Equity | Diversity and Inclusion",
    image: "/nay_profile.jpeg?height=80&width=80",
    rating: 4,
    link: "https://www.linkedin.com/in/nayelinemedina/",
    content: {
      en: "I am very happy with the service Kalash provides me, he is responsible, clear, and efficient. He has helped me optimize my consulting service with an interactive query management dashboard and is currently creating my website. Excellent professional.",
      es: "Estoy muy contenta con el servivio que me brinda Kalash, es responsable, claro y eficiente. Me ha ayudado a optimizar mi servicio de consultoría con un dashboard interactivo de gestion de consultas y recientemente esta creando mi pagina web. Excelente profesional.",
    },
  },
]

export default function Testimonials() {
  const { language } = useLanguage()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref} id="testimonials" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {language === "es" ? "Lo Que Dicen Mis Clientes" : "What My Clients Say"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "es"
              ? "Descubre cómo mis servicios han ayudado a empresas y profesionales a alcanzar sus objetivos"
              : "Discover how my services have helped businesses and professionals achieve their goals"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
             <a href={testimonial.link}> 
              <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300 group">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                    "{language === "es" ? testimonial.content.es : testimonial.content.en}"
                  </p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === "es" ? testimonial.role.es : testimonial.role.en}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
