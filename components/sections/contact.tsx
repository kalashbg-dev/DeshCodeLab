"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import GlassCard from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "@/app/actions/contact"

export default function Contact() {
  const { language } = useLanguage()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  type FormError = { path: string; message: string }
  const [state, setState] = useState<{ success: boolean; message: string; errors: FormError[] }>({ success: false, message: '', errors: [] })
  const [pending, setPending] = useState(false)

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    setState({ success: false, message: '', errors: [] })
    
    // Store the form element reference before the async operation
    const form = e.currentTarget
    const formData = new FormData(form)
    
    try {
      // Use the stored form data
      const result = await submitContactForm(state, formData)
      setState({ success: true, message: language === 'es' ? '¡Mensaje enviado!' : 'Message sent!', errors: [] })
      // Reset the form using the stored reference
      form.reset()
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        const err = error as { message: string; errors?: FormError[] }
        setState({ success: false, message: err.message, errors: err.errors || [] })
      } else {
        setState({ success: false, message: language === 'es' ? 'Error al enviar el mensaje' : 'Error sending message', errors: [] })
      }
    } finally {
      setPending(false)
    }
  }

  // Helper function to get error message for a field
  const getFieldError = (fieldName: string) => {
    if (!state.errors) return null
    const error = state.errors.find((err) => err.path === fieldName)
    return error ? error.message : null
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

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? (language === "es" ? "¡Mensaje enviado!" : "Message sent!") : (language === "es" ? "Error" : "Error"),
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state, toast, language])

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
                id="contact-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {language === "es" ? "Nombre" : "Name"} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={language === "es" ? "Tu nombre" : "Your name"}
                      value={formData.name}
                      onChange={handleChange}
                      className={getFieldError('name') ? "border-red-500" : ""}
                      aria-describedby="name-error"
                    />
                    {getFieldError('name') && (
                      <p className="text-red-500 text-xs mt-1 flex items-center" id="name-error">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {getFieldError('name')}
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
                      placeholder={language === "es" ? "tu@email.com" : "your@email.com"}
                      value={formData.email}
                      onChange={handleChange}
                      className={getFieldError('email') ? "border-red-500" : ""}
                      aria-describedby="email-error"
                    />
                    {getFieldError('email') && (
                      <p className="text-red-500 text-xs mt-1 flex items-center" id="email-error">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {getFieldError('email')}
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
                    placeholder={language === "es" ? "¿En qué puedo ayudarte?" : "How can I help you?"}
                    value={formData.subject}
                    onChange={handleChange}
                    className={getFieldError('subject') ? "border-red-500" : ""}
                    aria-describedby="subject-error"
                  />
                  {getFieldError('subject') && (
                    <p className="text-red-500 text-xs mt-1 flex items-center" id="subject-error">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {getFieldError('subject')}
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
                    placeholder={language === "es" ? "Cuéntame sobre tu proyecto..." : "Tell me about your project..."}
                    value={formData.message}
                    onChange={handleChange}
                    className={getFieldError('message') ? "border-red-500" : ""}
                    aria-describedby="message-error"
                  />
                  {getFieldError('message') && (
                    <p className="text-red-500 text-xs mt-1 flex items-center" id="message-error">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {getFieldError('message')}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {pending ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
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
