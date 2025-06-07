"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import GlassCard from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function Contact() {
  const { language } = useLanguage()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = language === "es" ? "El nombre es requerido" : "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = language === "es" ? "El email es requerido" : "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === "es" ? "Email inválido" : "Invalid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = language === "es" ? "El asunto es requerido" : "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = language === "es" ? "El mensaje es requerido" : "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Send email using EmailJS or similar service
      const formElement = e.target as HTMLFormElement
      const formAction = `https://formsubmit.co/${process.env.NEXT_PUBLIC_EMAIL}`

      // Create a hidden form to submit
      const hiddenForm = document.createElement("form")
      hiddenForm.method = "POST"
      hiddenForm.action = formAction
      hiddenForm.style.display = "none"

      // Add form data
      for (const key in formData) {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = key
        input.value = formData[key as keyof FormData]
        hiddenForm.appendChild(input)
      }

      // Add redirect
      const redirectInput = document.createElement("input")
      redirectInput.type = "hidden"
      redirectInput.name = "_next"
      redirectInput.value = window.location.href
      hiddenForm.appendChild(redirectInput)

      // Add captcha
      const captchaInput = document.createElement("input")
      captchaInput.type = "hidden"
      captchaInput.name = "_captcha"
      captchaInput.value = "true"
      hiddenForm.appendChild(captchaInput)

      // Add subject
      const subjectInput = document.createElement("input")
      subjectInput.type = "hidden"
      subjectInput.name = "_subject"
      subjectInput.value = `Nuevo mensaje de ${formData.name}: ${formData.subject}`
      hiddenForm.appendChild(subjectInput)

      // Append to body and submit
      document.body.appendChild(hiddenForm)
      hiddenForm.submit()

      toast({
        title: language === "es" ? "¡Mensaje enviado!" : "Message sent!",
        description:
          language === "es"
            ? "Gracias por contactarme. Te responderé pronto."
            : "Thank you for contacting me. I'll get back to you soon.",
      })

      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast({
        title: language === "es" ? "Error" : "Error",
        description:
          language === "es" ? "Hubo un problema al enviar el mensaje." : "There was a problem sending the message.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: process.env.NEXT_PUBLIC_EMAIL,
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
    },
    {
      icon: Phone,
      label: language === "es" ? "Teléfono" : "Phone",
      value: process.env.NEXT_PUBLIC_PHONE,
      href: `tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/\s/g, "") }`,
    },
    {
      icon: MapPin,
      label: language === "es" ? "Ubicación" : "Location",
      value: "Barahona, DR",
      href: "#",
    },
  ]

  return (
    <section ref={ref} id="contact" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {language === "es" ? "Contacto" : "Contact Me"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "es"
              ? "¿Tienes un proyecto en mente? Me encantaría escuchar sobre él y discutir cómo puedo ayudarte."
              : "Have a project in mind? I'd love to hear about it and discuss how I can help you."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                {language === "es" ? "Información de Contacto" : "Contact Information"}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold mb-4 text-primary">
                {language === "es" ? "¿Por qué trabajar conmigo?" : "Why work with me?"}
              </h4>
              <ul className="space-y-3">
                {[
                  language === "es" ? "Respuesta rápida en 24 horas" : "Quick response within 24 hours",
                  language === "es" ? "Comunicación clara y constante" : "Clear and constant communication",
                  language === "es" ? "Soluciones personalizadas" : "Customized solutions",
                  language === "es" ? "Soporte post-entrega" : "Post-delivery support",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlassCard className="p-6">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_EMAIL}`}
                method="POST"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {language === "es" ? "Nombre" : "Name"} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === "es" ? "Tu nombre" : "Your name"}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={
                        language === "es" ? "tu@email.com" : "Your@email"
                      }
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {language === "es" ? "Asunto" : "Subject"} *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={language === "es" ? "¿En qué puedo ayudarte?" : "How can I help you?"}
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {language === "es" ? "Mensaje" : "Message"} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={language === "es" ? "Cuéntame sobre tu proyecto..." : "Tell me about your project..."}
                    rows={5}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Hidden FormSubmit.co fields */}
                <input type="hidden" name="_next" value={window.location.href} />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_subject" value={`Nuevo mensaje de ${formData.name}: ${formData.subject}`} />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {language === "es" ? "Enviando..." : "Sending..."}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      {language === "es" ? "Enviar Mensaje" : "Send Message"}
                    </div>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
