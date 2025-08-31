'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useOnClickOutside } from '@/hooks/use-click-outside';

const navItems = [
  { href: '#about', label: { en: 'About', es: 'Acerca' } },
  { href: '#skills', label: { en: 'Skills', es: 'Habilidades' } },
  { href: '#portfolio', label: { en: 'Portfolio', es: 'Portafolio' } },
  { href: '#services', label: { en: 'Services', es: 'Servicios' } },
  { href: '#contact', label: { en: 'Contact', es: 'Contacto' } },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { language, setLanguage } = useLanguage();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Cerrar menú al hacer clic fuera
  useOnClickOutside(mobileMenuRef, () => setIsOpen(false));
  useOnClickOutside(languageMenuRef, () => setIsLanguageOpen(false));

  // Detectar scroll para navbar transparente
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar sección activa para navegación
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navegar a sección con smooth scroll
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setIsLanguageOpen(false);
    }
  }, []);

  // Manejar navegación por teclado
  const handleKeyDown = useCallback((event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(href);
    }
  }, [scrollToSection]);

  // Cambiar idioma
  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'es' : 'en');
    setIsLanguageOpen(false);
  }, [language, setLanguage]);

  // Cerrar menú móvil con Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsLanguageOpen(false);
      }
    };

    if (isOpen || isLanguageOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isLanguageOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg'
          : 'bg-background/90 backdrop-blur-sm'
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection('#hero')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToSection('#hero')}
            aria-label="Ir al inicio"
          >
            DeshCode by <span className="text-primary">KalashDEV</span>
          </motion.div>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Ir a sección ${language === 'es' ? item.label.es : item.label.en}`}
                >
                  {language === 'es' ? item.label.es : item.label.en}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Controles Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Selector de idioma */}
            <div className="relative" ref={languageMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 min-w-[80px] justify-center"
                aria-expanded={isLanguageOpen}
                aria-haspopup="true"
                aria-label="Cambiar idioma"
              >
                <Globe className="h-4 w-4" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </Button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-32 bg-popover border border-border rounded-lg shadow-lg overflow-hidden"
                    role="menu"
                  >
                    <button
                      onClick={() => {
                        setLanguage('es');
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                        language === 'es' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      }`}
                      role="menuitem"
                    >
                      Español
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                        language === 'en' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      }`}
                      role="menuitem"
                    >
                      English
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />
          </div>

          {/* Botón de menú móvil */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden w-full absolute left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg border-t border-border"
              style={{ top: '100%' }}
              role="menu"
              aria-label="Menú de navegación móvil"
            >
              <div className="p-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {navItems.map((item) => {
                  const sectionId = item.href.substring(1);
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      onKeyDown={(e) => handleKeyDown(e, item.href)}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-primary bg-primary/10 border border-primary/20'
                          : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                      }`}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {language === 'es' ? item.label.es : item.label.en}
                    </button>
                  );
                })}
                
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4"
                    aria-label="Cambiar idioma"
                  >
                    <Globe className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {language === 'en' ? 'English' : 'Español'}
                    </span>
                  </Button>
                  <div className="px-2">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
