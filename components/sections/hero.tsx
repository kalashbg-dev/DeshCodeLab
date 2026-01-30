'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import Image from 'next/image';
import TypingAnimation from '@/components/ui/typing-animation';
import ParticleField from '@/components/ui/particle-field';
import { Button } from '@/components/ui/button';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: Github,
    href: process.env.NEXT_PUBLIC_GITHUB || '#',
    ariaLabel: 'Visitar perfil de GitHub',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: process.env.NEXT_PUBLIC_LINKEDIN || '#',
    ariaLabel: 'Visitar perfil de LinkedIn',
  },
  {
    name: 'Email',
    icon: Mail,
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || 'contact@deshcodelab.com'}`,
    ariaLabel: 'Enviar email',
  },
];

export default function Hero() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [showCvTooltip, setShowCvTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroContent = useMemo(() => ({
    greeting: language === 'es' ? '¡Hola! Soy' : 'Hello! I\'m',
    description: language === 'es'
      ? 'Transformo datos complejos en insights accionables y construyo aplicaciones web robustas que impulsan el crecimiento empresarial.'
      : 'I transform complex data into actionable insights and build robust web applications that drive business growth.',
    ctaPrimary: language === 'es' ? 'Contactar' : 'Get In Touch',
    ctaSecondary: language === 'es' ? 'Ver Portafolio' : 'View Portfolio',
    scrollText: language === 'es' ? 'Desplazar' : 'Scroll',
    typingTexts: language === 'es' 
      ? ['Analista de Datos', 'Desarrollador FullStack', 'Especialista en BI']
      : ['Data Analyst', 'FullStack Developer', 'BI Specialist'],
    cvUrl: language === 'es' ? '/assets/ES_CV_Kalashnikov_Bello_FS.pdf' : '/assets/EN_CV_Kalashnikov_Bello_FS.pdf',
  }), [language]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!mounted) return null;

  return (
    <section 
      id="hero"
      className="relative min-h-[100dvh] md:min-h-0 md:h-auto md:py-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background"
      role="banner"
      aria-label="Sección principal"
    >
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField />
      </div>

      <div className="absolute top-1/4 left-[10%] w-[80vw] h-[80vw] max-w-[24rem] max-h-[24rem] bg-primary/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[80vw] h-[80vw] max-w-[24rem] max-h-[24rem] bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 py-10 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-primary font-medium text-lg"
                >
                  {heroContent.greeting}
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Kalashnikov
                  <br />
                  <span className="text-primary">Bello</span>
                </h1>

                <div className="text-2xl md:text-3xl text-muted-foreground min-h-[2.5rem] flex items-center">
                  <TypingAnimation texts={heroContent.typingTexts} />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-lg"
              >
                {heroContent.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={heroContent.ctaPrimary}
                >
                  {heroContent.ctaPrimary}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('portfolio')}
                  className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={heroContent.ctaSecondary}
                >
                  {heroContent.ctaSecondary}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex gap-4"
                role="group"
                aria-label="Enlaces sociales"
              >
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-72 h-96 md:w-80 md:h-[450px] mx-auto">
                <div className="w-full h-full rounded-xl overflow-hidden border-4 border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl hover:border-white/30 max-w-xs mx-auto">
                  <Image
                    src="/profile.webp"
                    alt="Kalashnikov Bello - Desarrollador FullStack y Analista de Datos"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                    loading="eager"
                    sizes="(max-width: 768px) 288px, 320px"
                  />
                  <div className="absolute inset-0 border-4 border-transparent bg-clip-padding p-[1px] pointer-events-none" />
                </div>
              </div>

              <motion.div
                className="absolute -top-4 -right-4 z-50"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                onMouseEnter={() => setShowCvTooltip(true)}
                onMouseLeave={() => setShowCvTooltip(false)}
              >
                  {showCvTooltip && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-popover text-popover-foreground text-sm font-medium rounded-md shadow-lg whitespace-nowrap pointer-events-none border border-border/50 backdrop-blur-sm"
                    >
                      {language === 'es' ? 'Ver CV' : 'View CV'}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover rotate-45 border-b border-r border-border/50" />
                    </div>
                  )}

                <a
                  href={heroContent.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label="Descargar CV"
                >
                    <motion.div
                        className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-accent transition-colors duration-300 active:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        role="button"
                        tabIndex={0}
                    >
                        <span className="font-bold">CV</span>
                    </motion.div>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
        aria-label={`${heroContent.scrollText} a la siguiente sección`}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm">{heroContent.scrollText}</span>
          <ArrowDown className="h-5 w-5" aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
}
